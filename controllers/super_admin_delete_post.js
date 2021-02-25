

const {auditLogs,superAdminData,postData} = require('../utils/mongoose_models');


const super_admin_delete_post = async(req,res,next) => {

    try{
        let username = req.headers.username;
        let _id = req.query._id;
        let super_admin_exists = await superAdminData.findOne({username});
        
        if(!super_admin_exists){
        
            res.send({status:false,payload:"unauthorized"});
            return;
        }
           
        let post_exists = await postData.findById({_id});

        if(!post_exists){
            res.send({status:false,payload:"No Posts exist with this ID"});
            return;
        }
            postData.findByIdAndDelete({_id},(err)=>{
                if(err){
                    console.log(err)
                    res.send({status:false,payload:"Error occurred while deleting"});
                    return;
                }
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
                        return;
                    }
                    res.send({status:true,payload:"post deleted successfully"});
                    
                })

            })
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = super_admin_delete_post;