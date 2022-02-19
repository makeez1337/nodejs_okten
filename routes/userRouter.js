const {Router} = require('express');

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getUsersJSON);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/:id', userController.deleteUserById);

module.exports = userRouter;
