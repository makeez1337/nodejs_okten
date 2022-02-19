const {Router} = require('express');

const loginController = require('../controllers/loginController');
const isLoginFilled = require('../middleware/isLoginFilled');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLoginPage);
loginRouter.post('/', isLoginFilled, loginController.createUser);

module.exports = loginRouter;