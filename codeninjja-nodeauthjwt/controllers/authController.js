const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

const MAX_AGE = 3 * 24 * 60 * 60;

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

//handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password === 'That password is incorrect';
    }

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

const createToken = (id) => {

    const payload = { id };
    const secret = process.env.SECRET;
    const options = { expiresIn: MAX_AGE }

    return jwt.sign(payload, secret, options);
}


function authController() {

    async function signup_get(req, res) {
        res.render('signup');
    }
    async function login_get(req, res) {
        res.render('login');
    }
    async function signup_post(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.create({ email, password });
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
            res.status(201).json({ user: user.id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    async function login_post(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
            res.status(200).json({ user: user._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    async function logout_get(req,res){
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/');
    }

    async function logout_post(req,res){

    }

    return ({
        signup_get,
        signup_post,
        login_get,
        login_post,
        logout_get,
        logout_post
    });
}

module.exports = authController();