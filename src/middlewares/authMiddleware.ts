import { NextFunction, Response } from 'express';

import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';
import { IRequestExtended } from '../interfaces/requestExtended.interface';
import { HEADER } from '../constants/header';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const accessToken = req.get(HEADER.Authorization);

            if (!accessToken) {
                throw new Error('Token is not valid');
            }

            const { userEmail } = await tokenService.verifyToken(accessToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ accessToken });
            if (!tokenPairFromDB) {
                res.status(400).json('Token is not valid');
            }

            if (!userFromToken) {
                throw new Error('Wrong token');
            }

            req.user = userFromToken;
            next();
        } catch (e:any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
