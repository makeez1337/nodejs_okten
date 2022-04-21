"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const errorHandler_1 = require("../error/errorHandler");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get(constants_1.HEADER.Authorization);
            if (!accessToken) {
                next(new errorHandler_1.ErrorHandler('Token is not valid', 404));
                return;
            }
            const { userEmail } = await services_1.tokenService.verifyToken(accessToken);
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            const tokenPairFromDB = await repositories_1.tokenRepository.findTokenByParams({ accessToken });
            if (!tokenPairFromDB) {
                next(new errorHandler_1.ErrorHandler('Token is not valid', 404));
                return;
            }
            if (!userFromToken) {
                next(new errorHandler_1.ErrorHandler('Wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get(constants_1.HEADER.Authorization);
            if (!refreshToken) {
                next(new errorHandler_1.ErrorHandler('Token is not valid', 404));
                return;
            }
            const { userEmail } = await services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            const tokenPairFromDB = await repositories_1.tokenRepository.findTokenByParams({ refreshToken });
            if (!tokenPairFromDB) {
                next(new errorHandler_1.ErrorHandler('Token is not valid', 404));
                return;
            }
            if (!userFromToken) {
                next(new errorHandler_1.ErrorHandler('Wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map