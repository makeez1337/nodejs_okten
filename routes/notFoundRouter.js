const {Router} = require('express');

const notFoundRouter = Router();

notFoundRouter.get('/', (req, res) => {
    res.render('notFound');
})

module.exports = notFoundRouter;