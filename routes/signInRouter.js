const {Router} = require('express');

const signInController = require('../controllers/signInController');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignInPage);
signInRouter.post('/', signInController.checkCredentials);

module.exports = signInRouter;
