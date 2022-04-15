import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';
import { studentRouter } from './studentRouter';
import swaggerDocument from '../docs/swagger.json';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;
