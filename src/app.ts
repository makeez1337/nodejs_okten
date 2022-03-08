import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import 'reflect-metadata';

import { Post } from './entity/post';
import { Comment } from './entity/comment';
import { apiRouter } from './routes/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.get('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const posts = await getManager()
        .getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getMany();
    res.json(posts);
});

app.get('/comment/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const comments = await getManager().getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :userId', { userId })
        .innerJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(comments);
});

app.patch('/posts/:postId', async (req:Request, res:Response) => {
    const { text } = req.body;

    const updatedPost = await getManager()
        .getRepository(Post)
        .update({ id: Number(req.params.postId) }, { text });
    res.json(updatedPost);
});

app.patch('/comments/action', async (req:Request, res:Response) => {
    const { actionId, action } = req.body;

    if (action === 'dislike') {
        const updatedComment = await getManager().getRepository(Comment)
            .increment({ id: Number(actionId) }, 'dislikes', '1');
        res.json(updatedComment);
    }

    if (action === 'like') {
        const updatedComment = await getManager().getRepository(Comment)
            .increment({ id: Number(actionId) }, 'likes', '1');
        res.json(updatedComment);
    }
});

app.listen(5200, async () => {
    console.log('Server on PORT 5200 has started');
    try {
        const connection = await createConnection();

        if (connection) {
            console.log('Database is connected');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
