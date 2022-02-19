let users = require("../dataStorage/users");

class UserController {

    getUsersJSON(req,res) {
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
    }

    getUserById(req, res) {
        const {id} = req.params;
        const user = users.filter(user => user.id === +id);

        if (user.length) {
            res.render('user', {user});
        } else {
            res.json('No such user');
        }
    }

    deleteUserById(req, res) {
        const {id} = req.params;
        users = users.filter(user => user.id !== +id);
        res.redirect('/users');
    }

}

module.exports = new UserController();