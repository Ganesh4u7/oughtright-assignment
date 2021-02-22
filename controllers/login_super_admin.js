const mongoose = require("mongoose");

const super_adminSchema = require("../models/superAdminSchema");
const super_adminData = mongoose.model('super_admins',super_adminSchema);

const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_super_admin = async( req,res,next) => {

    try{

        const super_admin = req.body;
        let super_adminDetails = await super_adminData.findOne({email: super_admin.email});
        if(super_adminDetails){
            let passwordCheck = encryptDecrypt.validPassword(super_admin.password,super_adminDetails.hash,super_adminDetails.salt);
        console.log(passwordCheck);
            if(passwordCheck){
                const jwt =  jwt_token_issue.issueJWT(super_admin);

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


module.exports = login_super_admin;