"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const apiRouter_1 = require("./routes/apiRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
app.get('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const posts = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getMany();
    res.json(posts);
});
app.get('/comment/:userId', async (req, res) => {
    const { userId } = req.params;
    const comments = await (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :userId', { userId })
        .innerJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(comments);
});
app.patch('/posts/:postId', async (req, res) => {
    const { text } = req.body;
    const updatedPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .update({ id: Number(req.params.postId) }, { text });
    res.json(updatedPost);
});
app.patch('/comments/action', async (req, res) => {
    const { actionId, action } = req.body;
    if (action === 'dislike') {
        const updatedComment = await (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
            .increment({ id: Number(actionId) }, 'dislikes', '1');
        res.json(updatedComment);
    }
    if (action === 'like') {
        const updatedComment = await (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
            .increment({ id: Number(actionId) }, 'likes', '1');
        res.json(updatedComment);
    }
});
app.listen(5200, async () => {
    console.log('Server on PORT 5200 has started');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database is connected');
        }
    }
    catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
//# sourceMappingURL=app.js.map