

const {auditLogs,adminData,superAdminData} = require('../utils/mongoose_models');

const get_audit_logs = async(req,res,next) =>{

    try{
        let username = req.headers.username;
        let page = req.query.page -1;
        let admin_exists = await adminData.findOne({username});
        let super_admin_exists = await superAdminData.findOne({username});

        if(admin_exists || super_admin_exists){

            let logs = await auditLogs.find({}).skip(page*10).limit(10);

            console.log(logs.length);

            res.send({status:true,payload:logs});
            
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

module.exports = get_audit_logs;