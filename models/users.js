const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type : String , unique : true} ,
  firstname: String,
  lastname: String,
  email: {type : String , unique : true},
  password: Date,
  isActived:Boolean,
  
},{timestamps:true});

// Compile model from schema
const User = mongoose.model("User", UserSchema);
module.exports = User;