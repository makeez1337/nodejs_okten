import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { HEADER } from '../constants';
import { tokenRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { authValidator } from '../validators';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const accessToken = req.get(HEADER.Authorization);

            if (!accessToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(accessToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ accessToken });
            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            if (!userFromToken) {
                next(new ErrorHandler('Wrong token', 404));
                return;
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

    public async checkRefreshToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const refreshToken = req.get(HEADER.Authorization);

            if (!refreshToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await userService.getUserByEmail(userEmail);

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ refreshToken });
            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            if (!userFromToken) {
                next(new ErrorHandler('Wrong token', 404));
                return;
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

    public async checkActionToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const actionToken = req.get(HEADER.Authorization);

            if (!actionToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');

            const userFromToken = await userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler('Wrong token', 401));
                return;
            }

            const actionTokenFromDb = await tokenRepository.findActionTokenByParam({ actionToken });
            if (!actionTokenFromDb) {
                next(new ErrorHandler('Wrong token', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }

    // JOI VALIDATORS
    public isLoginValid(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isRegistrationValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.registration.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isPasswordValid(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error } = authValidator.password.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isEmailValid(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error } = authValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            const user = await userService.getUserByEmail(req.body.email);

            if (!user) {
                next(new ErrorHandler('Such user doesnt exists', 404));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
