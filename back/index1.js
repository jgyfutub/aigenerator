const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const cors = require("cors");
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set("strictQuery", false);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/shopDB',{useNewURLParser:true,useUnifiedTopology: true, family: 4}).then(()=>{console.log('connected mongoose')})
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const UserDetail=new mongoose.model('Userofimage', UserSchema);
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
    const doc = await newuser.save();
    res.json(doc);
   }else{
    res.json(null)
   } 
})
app.get('/signup',async(req,res)=>{
    console.log( "hhhh");
    const data={
        'data' : 'rrr'
    };
    res.json(data)
})
app.post('/login',async(req,res)=>{
    let data= await UserDetail.findOne({email:req.body.email}).exec()
    const userObject = {
        status: "",
   };
    if(data==null){
        userObject.status="nahi mila "
    }else{
        let pass=bcrypt.compare(req.body.password,data.password)
        if(pass){
            userObject.status="mil gaya"
        }else{
            userObject.status=" password sahi likh"
        }
    }
    res.json(userObject)
})
app.listen(8080,()=>{
    console.log('server running on 8080');
})