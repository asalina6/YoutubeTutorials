const express = require('express');
const expressLayouts = require('express-layouts');
const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const { Mongoclient} = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

//connec to database
const url = 'mongodb://localhost:27017';
let client;
(async function connectMDB(){
    try{
        //mongoose way:
        client = await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });
        //mongo client way:
        //client = await Mongoclient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
        
       const db = client.db('traversynodepassport');
    }catch(err){
        console.log(err);
    }

}());


//EJS
app.use(
    expressLayouts,
    express.urlencoded({extended: false}),
    express.json() );

app.set('view engine', 'ejs');



//Routes
app.use('/', indexRouter);
app.use('/users', userRouter)

app.listen(PORT, console.log(`Server started on port ${PORT}`));