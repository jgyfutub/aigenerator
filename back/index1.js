const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const cors = require("cors");
const LOGIN = require("./controlllers/Login");
const SIGNUP = require("./controlllers/SignUp");
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set("strictQuery", false);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/shopDB',{useNewURLParser:true,useUnifiedTopology: true, family: 4}).then(()=>{console.log('connected mongoose')}).catch((err)=>{console.log(err)})

app.use('/login',LOGIN)
app.use('/signup',SIGNUP)

app.listen(8080,()=>{
    console.log('server running on 8080');
})