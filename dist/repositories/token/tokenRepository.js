"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
class TokenRepository {
    async createToken(token) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Token).save(token);
    }
    async findTokenByUserId(userId) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Token).findOne({ userId });
    }
    async deleteUserTokenPair(userId) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Token).delete({ userId });
    }
    async findTokenByParams(params) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Token).findOne({ ...params });
    }
    async deleteTokenPairByParam(params) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Token).delete(params);
    }
}
exports.tokenRepository = new TokenRepository();
//# sourceMappingURL=tokenRepository.js.map