const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const UserDetail=require('../models/User')

const router=express.Router()
router.use(bodyParser.json());
router.use(cors());

router.post('/signup',async (req,res)=>{
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
router.get('/signup',async(req,res)=>{
    console.log( "hhhh");
    const data={
        'data' : 'rrr'
    };
    res.json(data)
})
module.exports=router