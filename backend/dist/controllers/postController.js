"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async getPostById(req, res) {
        const { userId } = req.params;
        const posts = await services_1.postService.getPostById(Number(userId));
        return res.json(posts);
    }
    async updatePostById(req, res) {
        const { text } = req.body;
        const updatedPost = await services_1.postService.updatePostById(Number(req.params.postId), text);
        return res.json(updatedPost);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map