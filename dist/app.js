"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
require("reflect-metadata");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .innerJoin('Posts', 'posts', 'posts.userId = user.id')
    //     .getMany();
    res.json(users);
});
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
app.post('/users', async (req, res) => {
    const newUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(newUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password, email,
    });
    res.json(updatedUser);
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
app.delete('/users/:id', async (req, res) => {
    const deletedUser = (0, typeorm_1.getManager)().getRepository(user_1.User).softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
app.listen(5000, async () => {
    console.log('Server on PORT 5000 has started');
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