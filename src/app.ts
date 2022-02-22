import express from 'express';

const app = express();

app.listen('5200', () => {
    console.log('Server on PORT 5200 has started');
});
