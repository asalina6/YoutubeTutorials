const express = require('express');
const { login_get, login_post, signup_get, signup_post } = require('../controllers/authController.js');
const authRouter = express.Router();

function router() {

    authRouter.get('/signup', signup_get)
        .post('/signup', signup_post)
        .get('/login', login_get)
        .post('/login', login_post);



    return authRouter;
}


module.exports = router();