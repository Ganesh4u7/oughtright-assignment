

const {adminData} = require('../utils/mongoose_models');

const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_admin = async( req,res,next) => {

    try{

        const admin = req.body;
        let adminDetails = await adminData.findOne({email: admin.email});
        if(!adminDetails){
            res.send({status:false,payload:"Invalid User"});
            return;  
        }
        let passwordCheck = encryptDecrypt.validPassword(admin.password,adminDetails.hash);
            console.log(passwordCheck);
        if(!passwordCheck){
            res.send({status:false,payload:"Invalid Credentials"});
            return;
        }
        const jwt =  jwt_token_issue.issueJWT(admin);

        res.send({status:true,token:jwt.token,expires:jwt.expires});
        
    }
    catch(error){
        console.log(error)
        res.send({status:false,payload:"error occurred"});
    }
}


module.exports = login_admin;