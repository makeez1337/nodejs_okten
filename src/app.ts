import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import fileUpload from 'express-fileupload';
import SocketIO from 'socket.io';
import http from 'http';

import { apiRouter } from './routes';
import { config } from './config';
import { socketController } from './controllers/socketController';
// import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket:any) => {
    // console.log(']]]]]]]]]]]]]]]]]]]]]]]]]');
    // console.log(socket.handshake.query);
    // console.log(']]]]]]]]]]]]]]]]]]]]]]]]]');

    socket.on('message:send', (data:any) => socketController.sendMessage(io, socket, data));

    socket.on('join_room', (data:any) => {
        socket.join(data.id);

        // SEND TO ALL AVOID SENDER (IN ROOM)
        // eslint-disable-next-line max-len
        // socket.broadcast.to(data.id).emit('userJoinedRoom', { message: `${socket.id}, welcome in room ${data.id}` });

        // SEND TO ALL INCLUDE SENDER (IN ROOM)
        // io.to(data.id).emit('userJoinedRoom', { message: `${socket.id}, welcome in room ${data.id}` });
    });
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
global.rootDir = __dirname;

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Server on PORT ${PORT} has started`);
    try {
        const connection = await createConnection();

        if (connection) {
            console.log('Database is connected');
            // cronRun();
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
