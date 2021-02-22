const mongoose = require("mongoose");

const adminSchema = require("../models/adminSchema");
const adminData = mongoose.model('admins',adminSchema);

const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_admin = async( req,res,next) => {

    try{

        const admin = req.body;
        let adminDetails = await adminData.findOne({email: admin.email});
        if(adminDetails){
            let passwordCheck = encryptDecrypt.validPassword(admin.password,adminDetails.hash,adminDetails.salt);
        console.log(passwordCheck);
            if(passwordCheck){
                const jwt =  jwt_token_issue.issueJWT(admin);

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


module.exports = login_admin;