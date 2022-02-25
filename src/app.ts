import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import 'reflect-metadata';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User).find();
    console.log(users);
    res.json(users);
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
    const deletedUser = getManager().getRepository(User).delete({ id: Number(req.params.id) });
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
