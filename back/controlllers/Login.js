const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const UserDetail=require('../models/User')
const router=express.Router()
router.use(bodyParser.json());
router.use(cors());

router.post('/login',async(req,res)=>{
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
router.get('/login',async(req,res)=>{
    console.log( "hhhh");
    const data={
        'data' : 'rrr'
    };
    res.json(data)
})
module.exports=router