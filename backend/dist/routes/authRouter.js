"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.post('/registration', (0, celebrate_1.celebrate)(validators_1.authValidator.registration), controllers_1.authController.registration);
router.post('/login', (0, celebrate_1.celebrate)(validators_1.authValidator.login), middlewares_1.userMiddleware.checkIsUserExists, controllers_1.authController.login);
router.post('/logout', middlewares_1.authMiddleware.checkAccessToken, controllers_1.authController.logout);
router.post('/refresh', middlewares_1.authMiddleware.checkRefreshToken, controllers_1.authController.refreshToken);
exports.authRouter = router;
//# sourceMappingURL=authRouter.js.map