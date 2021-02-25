

const {auditLogs,adminData,postData} = require('../utils/mongoose_models');


const admin_delete_post = async (req,res,next) => {

    try{

        let admin_name = req.headers.username;
        let _id = req.body._id;

        let admin_details = await adminData.findOne({username:admin_name});

        if(!admin_details){
       
            res.send({status:false,payload:"Invalid admin"});
            return;
        }

            let post_details = await postData.findOne({_id});

            if(!post_details){
                
                res.send({status:false,payload:"Post with this id doesn't exist"});
                return;
            }
            let auditLogsData = new auditLogs ({
                
                deletedBy:admin_name,
                deletedAt:Date.now(),
                status:'pending',
                role:'admin',
                type:'delete',
                id:_id,
                postDetails:post_details,
                updateDescription: req.body.updateDescription,
                logReport:`admin : ${admin_name} requested a delete on post with Object Id: ${_id}`,
                logTime:Date.now()
            });

            auditLogsData.save((err,data)=>{
                if(err){
                    console.log(err);
                    res.send({status:false,payload:"Error occurred"});
                    return;
                }
                    res.send({status:true,payload:"Post delete request sent"})
                
            });

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = admin_delete_post;