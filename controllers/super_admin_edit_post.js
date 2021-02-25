

const {superAdminData,auditLogs,postData} = require('../utils/mongoose_models');

const super_admin_edit_post = async(req,res,next) => {

    try{
        let username = req.headers.username;
        let _id = req.body._id;


        let super_admin_exists = await superAdminData.findOne({username});
        
        if(!super_admin_exists){
            res.send({status:false,payload:"unauthorized"});
            return;
        }
           
            let post_exists = await postData.findById({_id});

        if(post_exists){
            res.send({status:false,payload:"No Posts exist with this ID"});
            return;
        }

        let body = {
                subject:req.body.subject,
                message:req.body.message,
                createdAt:post_exists.createdAt,
                createdBy:post_exists.createdBy,
                version:post_exists.version + 1
        }

        postData.findByIdAndUpdate({_id},body,(err) => {
            if(err){
                console.log(err);
                res.send({status:false,payload:"Error occurred"});
                return;
            }
            let auditLog = new auditLogs({
                subject:req.body.subject,
                message:req.body.message,
                createdAt:post_exists.createdAt,
                createdBy:post_exists.createdBy,
                version:post_exists.version + 1,
                updatedBy:username,
                updatedAt:Date.now(),
                role:'super_admin',
                postDetails:post_exists,
                type:'edit',
                id:_id,
                updateDescription: req.body.updateDescription,
                logReport:`super_admin : ${username} edited a post with Object Id: ${_id}`,
                logTime:Date.now()
            });

            auditLog.save((err1)=>{
                if(err1){
                    console.log(err1);
                    res.send({status:true,payload:"Post updated,error occurred while creating log"});
                    return;
                }
                res.send({status:true,payload:"post edited successfully"});
            });
        });

        
    }    
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = super_admin_edit_post;