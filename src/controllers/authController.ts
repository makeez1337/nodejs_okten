import { NextFunction, Request, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import {
    authService, emailService, tokenService, userService,
} from '../services';
import { EmailActionEnum, HEADER } from '../constants';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { s3Service } from '../services/s3Service';

class AuthController {
    public async registration(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getUserByEmail(email);

            if (userFromDb) {
                next(new ErrorHandler(`User with email ${email} already exists`));
            }

            const createdUser = await userService.createUser(req.body);

            // await emailService.sendMail(EmailActionEnum.SUCCESS_REGISTERED, email);

            if (avatar) {
                // const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);
                await s3Service.uploadFile(avatar, 'user', createdUser.id);

                // console.log('+++++++++++++++++++++++++');
                // console.log(sendData.Location);
                // console.log('+++++++++++++++++++++++++');
            }

            const createdUserData = await authService.registration(createdUser);

            res.json(createdUserData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req:IRequestExtended, res:Response) {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);
        res.json('OK');
    }

    public async login(req:IRequestExtended, res:Response) {
        try {
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPaswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair(
                { userId: id, userEmail: email },
            );
            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });
            await emailService.sendMail(EmailActionEnum.WELCOME, email, { userName: firstName });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async refreshToken(req:IRequestExtended, res:Response) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(HEADER.Authorization);

            await tokenService.deleteTokenPairByParam({ refreshToken: refreshTokenToDelete });

            // eslint-disable-next-line max-len
            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async resetPassword(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { firstName, email, id } = req.user as IUser;

            const actionToken = await tokenService.generateActionToken({ userId: id, userEmail: email });
            await tokenService.saveActionToken(actionToken, id);
            await emailService.sendMail(
                EmailActionEnum.FORGOT_PASS,
                email,
                {
                    firstName,
                    resetPass: `https://localhost:3000/${actionToken}`,
                },
            );
            res.json({
                actionToken,
            });
        } catch (e) {
            next(e);
        }
    }

    public async setNewPassword(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<Response<string> | undefined> {
        try {
            const actionToken = req.get(HEADER.Authorization);
            const { id } = req.user as IUser;

            const { password } = req.body;
            const hashedPassword = await userService.hashedPassword(password);
            await userService.updateUserPassword(id, hashedPassword);
            await tokenService.deleteActionTokenByParam({ actionToken });

            return res.json(`Your new password ${password}`);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
