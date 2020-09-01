const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

dotenv.config({path: path.resolve(__dirname, 'config.env')});
// middleware
app.use(
  express.static('public'),
  express.json(),
  cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection

const dbURI = `mongodb+srv://asalina6:${process.env.DB_PASSWORD}@cluster0.mlu9s.mongodb.net/node-auth`;

(async function connectMDB(){
  try{
    const client = await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    app.listen(PORT, ()=>{console.log(`Connected to port ${PORT}`)});
  }catch(err){
    console.log(err);
  }
}());

/*
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));*/

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

















//cookies
app.get('/set-cookies', (req,res)=>{

  //res.setHeader('Set-Cookie', 'newUser=true'); //stays until we close the browser
  //document.cookie

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {maxAge: 1000* 60 * 60 * 24, secure: true, httpOnly: true});
  res.send('you got the cookies!'); 
});

app.get('/read-cookies', (req,res)=>{
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);

});