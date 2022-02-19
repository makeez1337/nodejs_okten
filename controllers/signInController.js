let users = require("../dataStorage/users");

class SignInController {

    renderSignInPage(req, res) {
        res.render('signIn');
    }

    checkCredentials(req, res) {
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
    }

}

module.exports = new SignInController();