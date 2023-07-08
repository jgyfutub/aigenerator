const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
module.exports=new mongoose.model('Userofimage', UserSchema);