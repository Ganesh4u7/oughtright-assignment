

const {auditLogs,adminData,superAdminData,postData} = require('../utils/mongoose_models');



const audit_log_analysis = async (req,res,next) => {

    try{

        let username = req.headers.username;

        let admin_exists = await adminData.findOne({username});
        let super_admin_exists = await superAdminData.findOne({username});

           if(admin_exists || super_admin_exists){

                let data =await auditLogs.aggregate([
                    { $group : { _id : "$type", count: { $sum: 1 } } }, {$project: {  
                        _id: 0,
                        type: "$_id",
                        count: 1
                     }}
                ]);

               

               // console.log(data);

                res.send({status:true,requests_by_type:data});
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

module.exports= audit_log_analysis;