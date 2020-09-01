const express = require('express');
const { login_get, login_post, signup_get, signup_post, logout_get} = require('../controllers/authController.js');
const authRouter = express.Router();

function router() {

    authRouter.get('/signup', signup_get)
        .post('/signup', signup_post)
        .get('/login', login_get)
        .post('/login', login_post)
        .get('/logout', logout_get);



    return authRouter;
}


module.exports = router();