"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const repositories_1 = require("../repositories");
const errorHandler_1 = require("../error/errorHandler");
class UserMiddleware {
    async checkIsUserExists(req, res, next) {
        try {
            const userFromDB = await repositories_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                next(new errorHandler_1.ErrorHandler('Such user doesnt exists', 404));
                return;
            }
            req.user = userFromDB;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map