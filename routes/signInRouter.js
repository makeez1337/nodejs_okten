const {Router} = require('express');

const signInController = require('../controllers/signInController');
const isInputValid = require('../middleware/isInputValid');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignInPage);
signInRouter.post('/', isInputValid, signInController.checkCredentials);

module.exports = signInRouter;
