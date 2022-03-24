"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/:userId', controllers_1.commentController.getCommentByUserId);
router.patch('/action', controllers_1.commentController.updateByAction);
exports.commentRouter = router;
//# sourceMappingURL=commentRouter.js.map