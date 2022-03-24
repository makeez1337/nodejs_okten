"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const services_1 = require("../services");
class CommentController {
    async getCommentByUserId(req, res) {
        const { userId } = req.params;
        const comments = await services_1.commentService.getCommentByUserId(Number(userId));
        return res.json(comments);
    }
    async updateByAction(req, res) {
        const { actionId, action } = req.body;
        const updatedComment = await services_1.commentService.updateByAction(action, actionId);
        return res.json(updatedComment);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map