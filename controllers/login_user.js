const mongoose = require("mongoose");

const userSchema = require("../models/userSchema");
const userData = mongoose.model('users',userSchema);

const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_user = async( req,res,next) => {

    try{

        const user = req.body;
        let userDetails = await userData.findOne({email: user.email});
        if(userDetails){
            let passwordCheck = encryptDecrypt.validPassword(user.password,userDetails.hash,userDetails.salt);
        console.log(passwordCheck);
            if(passwordCheck){
                const jwt =  jwt_token_issue.issueJWT(user);

                res.send({status:true,token:jwt.token,expires:jwt.expires});
            }
            else{
                res.send({status:false,payload:"Invalid Credentials"});
            }

        
        }
        else{
            res.send({status:false,payload:"Invalid User"});  
        }        

        

    }
    catch(error){
        console.log(error)
        res.send({status:false,payload:"error occurred"});
    }
}


module.exports = login_user;