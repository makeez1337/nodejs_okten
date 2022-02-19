const {Router} = require('express');

let users = require("../dataStorage/users");

const userRouter = Router();

userRouter.get('/', ((req, res) => {
    const {city, age} = req.query;
    let filteredUsers = [...users];

    if (city && age) {
        filteredUsers = users.filter(user => user.city === city && user.age === +age);
    } else if (city) {
        filteredUsers = users.filter(user => user.city === city);
    } else if (age) {
        filteredUsers = users.filter(user => user.age === +age);
    }

    res.json(filteredUsers);
}))

userRouter.get('/:id', ((req, res) => {
    const {id} = req.params;
    const user = users.filter(user => user.id === +id);

    if (user.length) {
        res.render('user', {user});
    } else {
        res.json('No such user');
    }
}))

userRouter.post('/:id', ((req, res) => {
    const {id} = req.params;
    users = users.filter(user => user.id !== +id);
    res.redirect('/users');
}))

module.exports = userRouter;
