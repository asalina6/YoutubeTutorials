const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes.js');

const PORT = process.env.PORT || 3000;

dotenv.config({path: path.resolve(__dirname, 'config.env')});
// middleware
app.use(
  express.static('public'),
  express.json());
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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);