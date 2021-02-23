

const {adminData} = require('../utils/mongoose_models');

const encryptDecrypt = require('../utils/encrypt_decrypt');


const signup_admin = async(req,res,next) =>{

    try{

        const admin_exists = await adminData.findOne({username:req.body.username});
      
       if(!admin_exists){
            const saltHash = encryptDecrypt.genPassword(req.body.password);
        
        
            const hash = saltHash;
            const username = req.body.username.toLowerCase();
            const email = req.body.email.toLowerCase();
            const role = "admin";

            let adminDetails = new adminData ({
                username,
                email,
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
    else{
        res.send({status:false,payload:"admin exists"});
    }


    }
    catch(error){
        console.log('Error occurred');
        res.send({status:false,payload:"Error while signing up admin"});
    }
}

module.exports = signup_admin;

