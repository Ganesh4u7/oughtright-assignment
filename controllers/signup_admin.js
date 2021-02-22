const mongoose = require("mongoose");

const adminSchema = require("../models/adminSchema");
const adminData = mongoose.model('admins',adminSchema);

const encryptDecrypt = require('../utils/encrypt_decrypt');


const signup_admin = async(req,res,next) =>{

    try{
     const saltHash = encryptDecrypt.genPassword(req.body.password);
   
     const salt = saltHash.salt;
     const hash = saltHash.hash;
     const username = req.body.username.toLowerCase();
     const email = req.body.email.toLowerCase();
     const role = "admin";

     let adminDetails = new adminData ({
         username,
         email,
         salt,
         hash,
         role
     });

     adminDetails.save((err,data)=>{
        if(err){
            console.log(err);
            res.send({status:false,payload:"Error Occurred"});  
        }
        else{
            res.send({status:true,payload:data}); 
        }
    });

    }
    catch(error){
        console.log('Error occurred');
        res.send({status:false,payload:"Error while signing up user"});
    }
}

module.exports = signup_admin;

