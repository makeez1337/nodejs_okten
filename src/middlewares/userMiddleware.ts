import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces/requestExtended.interface';
import { userRepository } from '../repositories/users/usersRepository';

class UserMiddleware {
    public async checkIsUserExists(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
