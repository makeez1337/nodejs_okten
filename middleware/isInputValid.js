const users = require("../dataStorage/users");

const isInputValid = (req, res, next) => {

    try {
        if (!req.body.email || !req.body.password) {
            throw new Error('Email or password is not provided');
        }
    } catch (e) {
        res.status(400).send(e.message);
    }


    next();
}

module.exports = isInputValid;