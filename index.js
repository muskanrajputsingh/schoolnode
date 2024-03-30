const dotenv=require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');
const User = require('./model/userSchema');
const Login = require('./model/loginSchema');

app.use(cors())
app.use(express.json());                           //json data server(postman) se json format me ata hai usko object m convert krne ke liye ye line likhte h
app.use(require('./router/router'));
app.use(require('./router/login'));

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`)
})