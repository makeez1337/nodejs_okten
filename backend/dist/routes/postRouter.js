"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/:userId', controllers_1.postController.getPostById);
router.patch('/:postId', controllers_1.postController.updatePostById);
exports.postRouter = router;
//# sourceMappingURL=postRouter.js.map