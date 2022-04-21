"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const repositories_1 = require("../repositories");
class PostService {
    async getPostById(userId) {
        const posts = await repositories_1.postRepository.getPostById(userId);
        return posts;
    }
    async updatePostById(id, text) {
        const updatedPost = repositories_1.postRepository.updatePostById(id, text);
        return updatedPost;
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map