const mongoose = require("mongoose");

const superAdminSchema = require("../models/superAdminSchema");
const superAdminData = mongoose.model('super_admins',superAdminSchema);

const auditLogsSchema = require("../models/audit_logs");
const super_admin_edit_post = require("./super_admin_edit_post");
const auditLogs = mongoose.model('audit_logs',auditLogsSchema);


const admin_requests = async(req,res,next) => {

    try{
        let super_admin = req.headers.username;
        let page = req.query.page - 1; 

        let super_admin_exists = await superAdminData.findOne({username: super_admin});

        if(super_admin_exists){
            
            let requests = await auditLogs.find({role:'admin',status:"pending"}).skip(page*10).limit(10);

            if(requests.length > 0) {

                let audit_log = new auditLogs({
                    type:"get_admin_requests",
                    role:"super_admin",
                    postDetails:requests,
                    logReport:`super_admin : ${super_admin} has requested for admin requests`,
                    logTime:Date.now()

                });

                audit_log.save((err)=>{
                    if(err){
                        console.log(err);
                        res.send({status:true,payload:requests});
                    }
                    else{
                        res.send({status:true,payload:requests});
                    }
                });

               
            }
            else{
                res.send({status:true,payload:"no pending requests"});
            }
        }
        else{
            res.send({status:false,payload:"Invalid super admin"});
        }
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = admin_requests;