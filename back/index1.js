//importing all necessary modules 
const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const cors = require("cors");
const fs= require('fs')

//doing all necessary settings for server

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set("strictQuery", false);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/shopDB',{useNewURLParser:true,useUnifiedTopology: true, family: 4}).then(()=>{console.log('connected mongoose')})

//making the schema of User

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const UserDetail=new mongoose.model('Userofimage', UserSchema);

//making POST for signup

app.post('/signup',async (req,res)=>{
    console.log("signup req recieved , ", req.body)
   let data= await UserDetail.findOne({email:req.body.email}).exec()
   if (data==null){
    const salt=bcrypt.genSaltSync(16)
    const hashedPassword=bcrypt.hashSync(req.body.password,salt)
    const newuser=await new UserDetail({
        email:req.body.email,
        password:hashedPassword
    })
    const doc = await newuser.save()

    res.json(doc)
   }else{
    res.json(null)
   } 
})

//GET for post

app.get('/signup',async(req,res)=>{
    const data={
        'data' : 'signup api '
    };
    res.json(data)
})

//POST for login

app.post('/login',async(req,res)=>{
    let data= await UserDetail.findOne({email:req.body.email}).exec()
    const userObject = {
        status: "",
        id:"",
        email:"",
        password:"",
        _v:""
   };
    if(data==null){
        userObject.status="Account doesn't exists!!!"
    }else{
        let pass=await bcrypt.compare(req.body.password,data.password)
        console.log(data)
        if(pass){
            userObject.status="Logged in!!!!"
            userObject.id=data._id
            userObject.email=data.email
            userObject.password=data.password
            userObject.v=data._v
        }else{
            userObject.status="Account exists but wrong password!!"
        }
    }
    console.log(userObject)
    res.json(userObject)
})

//GET for login

app.get('/login',async(req,res)=>{
    const data={
        'data' : 'login api'
    };
    res.json(data)
})

//starting the 8080 server

app.listen(8080,()=>{
    console.log('server running on 8080');
})