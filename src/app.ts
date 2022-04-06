import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import fileUpload from 'express-fileupload';

import { apiRouter } from './routes';
import { config } from './config';
import { cronRun } from './cron';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
global.rootDir = __dirname;

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server on PORT ${PORT} has started`);
    try {
        const connection = await createConnection();

        if (connection) {
            console.log('Database is connected');
            cronRun();
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
