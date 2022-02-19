const {Router} = require('express');

const loginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLoginPage);
loginRouter.post('/', loginController.createUser);

module.exports = loginRouter;