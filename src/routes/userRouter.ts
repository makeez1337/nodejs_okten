import { Router } from 'express';

import { userController } from '../controllers/userController';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
