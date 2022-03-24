"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        res.cookie(constants_1.COOKIE.nameRefreshToken, data.refreshToken, { maxAge: constants_1.COOKIE.maxAgeRefreshToken, httpOnly: true });
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        await services_1.tokenService.deleteUserTokenPair(id);
        res.json('OK');
    }
    async login(req, res) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.userService.compareUserPaswords(password, hashPassword);
            const { refreshToken, accessToken } = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await repositories_1.tokenRepository.createToken({ accessToken, refreshToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
    async refreshToken(req, res) {
        try {
            const { id, email } = req.user;
            const refreshTokenToDelete = req.get(constants_1.HEADER.Authorization);
            await services_1.tokenService.deleteTokenPairByParam({ refreshToken: refreshTokenToDelete });
            const { refreshToken, accessToken } = await services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map