const {superAdminData} = require('../utils/mongoose_models');

const encryptDecrypt = require('../utils/encrypt_decrypt');


const signup_super_admin = async(req,res,next) =>{

    try{
        const super_admin_exists = await superAdminData.findOne({username:req.body.username});
      
       if(super_admin_exists){
           res.send({status:false,payload:"super admin exists"});
           return;
         } 
          
            const saltHash = encryptDecrypt.genPassword(req.body.password);
    
    
            const hash = saltHash;
            const username = req.body.username.toLowerCase();
            const email = req.body.email.toLowerCase();
            const role = "super_admin";

            let super_admin_details = new superAdminData ({
                username,
                email,
                hash,
                role
            });

        super_admin_details.save((err,data)=>{
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
        res.send({status:false,payload:"Error while signing up super admin"});
    }
}

module.exports = signup_super_admin;
