
const {userData} = require('../utils/mongoose_models');
const encryptDecrypt = require('../utils/encrypt_decrypt');

const jwt_token_issue = require("../utils/jwt_create_token");

const login_user = async( req,res,next) => {

    try{

        const user = req.body;
        let userDetails = await userData.findOne({email: user.email});
        if(!userDetails){
            res.send({status:false,payload:"Invalid User"}); 
            return; 
        } 

            let passwordCheck =encryptDecrypt.validPassword(user.password,userDetails.hash);

             console.log(passwordCheck);
             
            if(passwordCheck){
            
                res.send({status:false,payload:"Invalid Credentials"});
                return;
            }
                const jwt =  jwt_token_issue.issueJWT(user);

                res.send({status:true,token:jwt.token,expires:jwt.expires});
            
    }
    catch(error){
        console.log(error)
        res.send({status:false,payload:"error occurred"});
    }
}


module.exports = login_user;