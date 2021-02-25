

const {userData} = require('../utils/mongoose_models');

const encryptDecrypt = require('../utils/encrypt_decrypt');


const signup_user = async(req,res,next) =>{

    try{

      const user_exists = await userData.findOne({username: req.body.username.toLowerCase()});
      
      console.log(user_exists);

    if(user_exists){
     
        res.send({status:false,payload:"user exists"});
        return;
    }
     const hashedPassword = encryptDecrypt.genPassword(req.body.password);

     console.log(hashedPassword);
   
     const hash = hashedPassword;
     const username = req.body.username.toLowerCase();
     const email = req.body.email.toLowerCase();
     const role = "user";

     let userDetails = new userData ({
         username,
         email,
         hash,
         role
     });

     //console.log(saltHash);

     userDetails.save((err,data)=>{
        if(err){
            console.log(err);
            res.send({status:false,payload:"Error Occurred"}); 
            return; 
        }
            res.send({status:true,payload:data}); 
    });

    }
    catch(error){
        console.log('Error occurred');
        res.send({status:false,payload:"Error while signing up user"});
    }
}

module.exports = signup_user;

