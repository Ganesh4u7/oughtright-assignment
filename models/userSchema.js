const mongoose = require("mongoose");
const schema = mongoose.Schema;

let userSchema = new schema({

   
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    salt: String,
    hash:String,
    role: String

});

module.exports = userSchema