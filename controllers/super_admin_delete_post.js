const mongoose = require("mongoose");

const superAdminSchema = require("../models/superAdminSchema");
const superAdminData = mongoose.model('super_admins',superAdminSchema);

const auditLogsSchema = require("../models/audit_logs");
const auditLogs = mongoose.model('audit_logs',auditLogsSchema);

const postSchema = require("../models/postSchema");
const postData = mongoose.model('posts',postSchema);

const super_admin_delete_post = async(req,res,next) => {

    try{
        let username = req.headers.username;
        let _id = req.query._id;
        let super_admin_exists = await superAdminData.findOne({username});
        
        if(super_admin_exists){
           
            let post_exists = await postData.findById({_id});

            if(post_exists){
                    postData.findByIdAndDelete({_id},(err)=>{
                        if(err){
                            console.log(err)
                            res.send({status:false,payload:"Error occurred while deleting"});
                        }
                        else{
                            let audit_body = new auditLogs({
                                deletedBy:username,
                                deletedAt:Date.now(),
                                role:"super_admin",
                                type:"delete",
                                id:_id,
                                postDetails:post_exists,
                                logReport:`super_admin : ${username} deleted the post with Object Id: ${_id}`,
                                logTime:Date.now()
                            });

                            audit_body.save((err1)=>{
                                if(err1){
                                    console.log(err1);
                                    res.send({status:true,payload:"post deleted,error while updating audit log"})
                                }
                                else{
                                    res.send({status:true,payload:"post deleted successfully"});
                                }
                            })


                        }
                    })
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

module.exports = super_admin_delete_post;