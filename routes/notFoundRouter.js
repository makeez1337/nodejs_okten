const {Router} = require('express');

const notFoundController = require('../controllers/notFoundController');

const notFoundRouter = Router();

notFoundRouter.get('/', notFoundController.renderNotFoundPage);

module.exports = notFoundRouter;