const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, 'config.env')});

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    //check token exist and if it is verified
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
        next();
    }
}

module.exports = requireAuth;