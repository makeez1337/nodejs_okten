const {Router} = require('express');

let users = require("../dataStorage/users");

const loginRouter = Router();

loginRouter.get('/', ((req, res) => {
    res.render('login');
}))

loginRouter.post('/', ((req, res) => {
        if (!users.length) {
            users.push({...req.body, id: 1});
            res.redirect('/users');
        } else {
            const lastUserId = users[users.length - 1].id;
            const isEmailExist = users.some(user => user.email === req.body.email);

            if (isEmailExist) {
                res.redirect('/error');
            } else {
                users.push({...req.body, id: lastUserId + 1});
                res.redirect('/users');
            }
        }
    }
))

module.exports = loginRouter;