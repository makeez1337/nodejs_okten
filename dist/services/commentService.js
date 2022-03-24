"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const repositories_1 = require("../repositories");
class CommentService {
    async getCommentByUserId(userId) {
        const comments = repositories_1.commentRepository.getCommentByUserId(userId);
        return comments;
    }
    async updateByAction(action, actionId) {
        const updatedComment = await repositories_1.commentRepository.updateByAction(action, actionId);
        return updatedComment;
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map