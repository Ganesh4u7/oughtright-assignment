const {auditLogs,adminData,superAdminData} = require('../utils/mongoose_models');



const audit_log_requests_by_role = async (req,res,next) => {

    try{

        let username = req.headers.username;

        let admin_exists = await adminData.findOne({username});
        let super_admin_exists = await superAdminData.findOne({username});

           if(admin_exists || super_admin_exists){

               

                let roles_data= await auditLogs.aggregate([
                    { $group : { _id : "$role", count: { $sum: 1 } } },{$project: {  
                        _id: 0,
                        role: "$_id",
                        count: 1
                     }}
                ]);

               // console.log(data);

                res.send({status:true,requests_by_role:roles_data});
            }
            else{
                res.send({status:false,payload:"Unauthorized"});
            }
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports= audit_log_requests_by_role;