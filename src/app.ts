import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { apiRouter } from './routes/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

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
