const mongoose = require("mongoose");
const schema = mongoose.Schema;

let adminSchema = new schema({

   
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

module.exports = adminSchema;