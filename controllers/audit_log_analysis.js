const mongoose = require("mongoose");

const superAdminSchema = require("../models/superAdminSchema");
const superAdminData = mongoose.model('super_admins',superAdminSchema);

const auditLogsSchema = require("../models/audit_logs");
const auditLogs = mongoose.model('audit_logs',auditLogsSchema);

const postSchema = require("../models/postSchema");
const postData = mongoose.model('posts',postSchema);

const adminSchema = require("../models/adminSchema");
const adminData = mongoose.model('admins',adminSchema);


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

                let roles_data= await auditLogs.aggregate([
                    { $group : { _id : "$role", count: { $sum: 1 } } },{$project: {  
                        _id: 0,
                        role: "$_id",
                        count: 1
                     }}
                ]);

               // console.log(data);

                res.send({status:true,payload:{requests_by_type:data,requests_by_role:roles_data}});
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