const User = require('../models/User.js');

//handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


function authController() {

    function signup_get(req, res) {
        res.render('signup');
    }
    function login_get(req, res) {
        res.render('login');
    }
    function signup_post(req, res) {
        const { email, password } = req.body;

        (async function createUser() {
            try {
                const user = await User.create({ email, password });
                res.status(201).json(user);
            } catch (err) {
                const error = handleErrors(err);
                res.status(400).json({ errors });
            }
        }());
    }
    function login_post(req, res) {
        res.send('login');
    }
    return ({
        signup_get,
        signup_post,
        login_get,
        login_post
    });
}

module.exports = authController();