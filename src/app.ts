import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import 'reflect-metadata';
import { Post } from './entity/post';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .innerJoin('Posts', 'posts', 'posts.userId = user.id')
    //     .getMany();

    res.json(users);
});

app.get('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const posts = await getManager()
        .getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getMany();
    res.json(posts);
});

app.post('/users', async (req:Request, res:Response) => {
    const newUser = await getManager().getRepository(User).save(req.body);
    res.json(newUser);
});

app.patch('/users/:id', async (req:Request, res:Response) => {
    const { password, email } = req.body;

    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password, email,
        });
    res.json(updatedUser);
});

app.delete('/users/:id', async (req:Request, res:Response) => {
    const deletedUser = getManager().getRepository(User).softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

app.listen(5000, async () => {
    console.log('Server on PORT 5000 has started');
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
