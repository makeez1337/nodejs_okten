const {Router} = require('express');

let users = require("../dataStorage/users");

const signInRouter = Router();

signInRouter.get('/', ((req, res) => {
    res.render('signIn');
}))

signInRouter.post('/', ((req, res) => {
    const {email, password} = req.body;

    const filteredUser = users.filter(user => {
        if (user.email.includes(email) && user.password.includes(password)) {
            return true;
        }
    });
    const userId = filteredUser[0]?.id;

    if (userId) {
        res.redirect(`/users/${userId}`);
    } else {
        res.redirect('/error');
    }
}))


module.exports = signInRouter;