import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { apiRouter } from './routes/apiRouter';
import { config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server on PORT ${PORT} has started`);
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
