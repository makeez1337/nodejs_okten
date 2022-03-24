"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.userController.getUsers);
router.post('/', controllers_1.userController.createUser);
router.patch('/:id', controllers_1.userController.updateUser);
router.delete('/:id', controllers_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map