const mongoose = require("mongoose");

const userSchema = require("../models/userSchema");
const userData = mongoose.model('users',userSchema);

const encryptDecrypt = require('../utils/encrypt_decrypt');


const signup_user = async(req,res,next) =>{

    try{
     const saltHash = encryptDecrypt.genPassword(req.body.password);
   
     const salt = saltHash.salt;
     const hash = saltHash.hash;
     const username = req.body.username.toLowerCase();
     const email = req.body.email.toLowerCase();
     const role = "user";

     let userDetails = new userData ({
         username,
         email,
         salt,
         hash,
         role
     });

     userDetails.save((err,data)=>{
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

module.exports = signup_user;

