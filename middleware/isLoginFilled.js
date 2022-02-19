const isLoginFilled = (req, res, next) => {
    const {email, password, firstName, lastName, age, city} = req.body;

    try {
        if (!email) {
            throw new Error('You have to fill email');
        }
        if (!password) {
            throw new Error('You have to fill password');
        }
        if (!firstName) {
            throw new Error('You have to fill firstName');
        }
        if (!lastName) {
            throw new Error('You have to fill lastName');
        }
        if (!age) {
            throw new Error('You have to fill age');
        }
        if (!city) {
            throw new Error('You have to fill city');
        }
        next();
    } catch (e) {
        res.status(400).send(e.message);
    }

}

module.exports = isLoginFilled;