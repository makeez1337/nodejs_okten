"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const repositories_1 = require("../repositories");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: config_1.config.EXPIRES_IN_ACCESS });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_REFRESH_KEY, { expiresIn: config_1.config.EXPIRES_IN_REFRESH });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(refreshToken, userId, accessToken) {
        const tokenFromDb = await repositories_1.tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return repositories_1.tokenRepository.createToken(tokenFromDb);
        }
        return repositories_1.tokenRepository.createToken({ refreshToken, userId, accessToken });
    }
    async deleteUserTokenPair(userId) {
        return repositories_1.tokenRepository.deleteUserTokenPair(Number(userId));
    }
    async deleteTokenPairByParam(params) {
        return repositories_1.tokenRepository.deleteTokenPairByParam(params);
    }
    async verifyToken(authToken, tokenType = 'access') {
        let secretWord = config_1.config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config_1.config.SECRET_REFRESH_KEY;
        }
        return jsonwebtoken_1.default.verify(authToken, secretWord);
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map