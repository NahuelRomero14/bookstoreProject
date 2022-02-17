const express = require('express');
const mongoose = require('mongoose'); //agrego mongoose
const Book = require('./models/bookModel'); //obtengo el modelo (nombre del modelo comienza con mayúscula)
const User = require('./models/userModel');  
const bodyParser = require('body-parser');
const app = express();
const bookRouter = require('./routes/bookRouter')(Book);
const userRouter = require('./routes/userRouter')(User); //*

mongoose.connect('mongodb://127.0.0.1:27017/API');  //conectamos con la direccion del la db


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api', bookRouter, userRouter); 
app.listen(8080, ()=>{
  console.log('Server is running...');
});