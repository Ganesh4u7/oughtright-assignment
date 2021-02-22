const mongoose = require("mongoose");

const superAdminSchema = require("../models/superAdminSchema");
const superAdminData = mongoose.model('super_admins',superAdminSchema);

const auditLogsSchema = require("../models/audit_logs");
const auditLogs = mongoose.model('audit_logs',auditLogsSchema);

const postSchema = require("../models/postSchema");
const super_admin_delete_post = require("./super_admin_delete_post");
const postData = mongoose.model('posts',postSchema);

const super_admin_edit_post = async(req,res,next) => {

    try{
        let username = req.headers.username;
        let _id = req.body._id;


        let super_admin_exists = await superAdminData.findOne({username});
        
        if(super_admin_exists){
           
            let post_exists = await postData.findById({_id});

            if(post_exists){

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
                    }
                    else{
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
                            }
                            else{
                                res.send({status:true,payload:"post edited successfully"});
                            }
                        });
                    }
                });

            }
        
            else{
                res.send({status:false,payload:"No Posts exist with this ID"});
            }
        }
        else{
            res.send({status:false,payload:"unauthorized"});
        }
    }    
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = super_admin_edit_post;