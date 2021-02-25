

const {auditLogs,adminData,postData} = require('../utils/mongoose_models');


const admin_edit_post = async (req,res,next) => {

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
                subject:req.body.subject,
                message:req.body.message,
                createdAt:post_details.createdAt,
                createdBy:post_details.createdBy,
                version:post_details.version + 1,
                updatedBy:admin_name,
                updatedAt:Date.now(),
                status:'pending',
                role:'admin',
                postDetails:post_details,
                type:'edit',
                id:req.body._id,
                updateDescription: req.body.updateDescription,
                logReport:`admin : ${admin_name} requested a update on post with Object Id: ${_id}`,
                logTime:Date.now()
            });

            auditLogsData.save((err,data)=>{
                if(err){
                    console.log(err);
                    res.send({status:false,payload:"Error occurred"});
                }
                else{
                    res.send({status:true,payload:"Post update request sent"})
                }
            })


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = admin_edit_post;