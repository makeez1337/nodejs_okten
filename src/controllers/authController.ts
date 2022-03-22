import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { COOKIE } from '../constants/cookie';
import { tokenService } from '../services/tokenService';
import { IRequestExtended } from '../interfaces/requestExtended.interface';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { userService } from '../services/userService';
import { HEADER } from '../constants/header';

class AuthController {
    public async registration(req:Request, res:Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req:IRequestExtended, res:Response) {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);
        res.json('OK');
    }

    public async login(req:IRequestExtended, res:Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPaswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair(
                { userId: id, userEmail: email },
            );
            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

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

            const { refreshToken, accessToken } = await
            tokenService.generateTokenPair({ userId: id, userEmail: email });

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
}

export const authController = new AuthController();
