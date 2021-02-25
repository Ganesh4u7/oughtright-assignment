

const {superAdminData} = require('../utils/mongoose_models');

const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_super_admin = async( req,res,next) => {

    try{

        const super_admin = req.body;
        let super_adminDetails = await superAdminData.findOne({email: super_admin.email});
        if(!super_adminDetails){
            res.send({status:false,payload:"Invalid User"}); 
            return; 
        } 
            let passwordCheck = encryptDecrypt.validPassword(super_admin.password,super_adminDetails.hash);
             console.log(passwordCheck);
            if(!passwordCheck){
                res.send({status:false,payload:"Invalid Credentials"});
                return;
            }
           const jwt =  jwt_token_issue.issueJWT(super_admin);

           res.send({status:true,token:jwt.token,expires:jwt.expires});
           
    }
    catch(error){
        console.log(error)
        res.send({status:false,payload:"error occurred"});
    }
}


module.exports = login_super_admin;