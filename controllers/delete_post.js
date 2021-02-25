

const {auditLogs,userData,postData} = require('../utils/mongoose_models');

const delete_post = async (req,res,next) => {

    try{
        let username = req.headers.username;
        let user_exists = userData.findOne({username});

        if(!user_exists){
            
            res.send("User doesn't exist");
            return;
        }
            let _id = req.query._id;

          let post_exists =  await postData.findById({_id});

            if(!post_exists){
            
                res.send({status:false,payload:"Invalid post id"});
                return;
            }
             if(!post_exists.createdBy == username){
                
                 res.send({status:false,payload:"unauthorized"});
                 return;
              }

                postData.findByIdAndDelete({_id},(err,data) => {
                if(err){
                    console.log(err);
                    res.send({status:false,payload:"Error occurred"});
                    return;
                }
                    let audit_body = new auditLogs({
                        deletedBy:username,
                        deletedAt:Date.now(),
                        role:"user",
                        type:"delete",
                        id:_id,
                        postDetails:post_exists,
                        logReport:`user : ${username} deleted the post with Object Id: ${_id}`,
                        logTime:Date.now()
                    });

                audit_body.save((err1)=>{
                    if(err1){
                        console.log(err1);
                        res.send({status:true,payload:"post deleted,error while updating audit log"})
                        return;
                    }
                        res.send({status:true,payload:"post deleted successfully"});
                    
                });
                          
                    })
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = delete_post;