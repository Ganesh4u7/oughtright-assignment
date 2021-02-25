

const {auditLogs,postData,superAdminData} = require('../utils/mongoose_models');



const respond_to_request = async(req,res,next) => {

    try{

        let super_admin = req.headers.username;
        let _id = req.body._id;
        let response = req.body.response.toLowerCase();
        
        let super_admin_exists = await superAdminData.findOne({username: super_admin});

        if(!super_admin_exists){
            res.send({status:false,payload:"Invalid super admin"});
            return;
        }

            let request_details = await auditLogs.findById({_id});
            console.log(request_details);

            if(request_details){ 
                res.send({status:false,payload:"No request found with this Id"});
                return;
            }

            if(response == "accept"){
                if(request_details.type == "edit"){
                    console.log('inside edit');
                    let update= {
                        subject:request_details.subject,
                        message:request_details.message,
                        version:request_details.version
                    }

                    postData.findByIdAndUpdate({_id:request_details.id},update,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.send({status:false,payload:"Error occurred ,please try again"});
                            return;
                        }

                        auditLogs.findByIdAndUpdate({_id},{status:"accept"},(err1)=>{
                            if(err1){
                                console.log(err1)
                                res.send({status:true,payload:"post updated ,request in audit pending"});
                                return;
                            }
                            res.send({status:true,payload:"request approved successfully"});
                        });
                    });
                    }
                    else if(request_details.type == "delete"){
                        postData.findByIdAndDelete({_id:request_details.id},(err,data)=>{
                            if(err){
                                console.log(err);
                                res.send({status:false,payload:"Error occurred ,please try again"});
                                return;
                            }
                        auditLogs.findByIdAndUpdate({_id},{status:"accept"},(err1)=>{
                            if(err1){
                                console.log(err1)
                                res.send({status:true,payload:"post updated ,request in audit pending"});
                                return;
                            }
                                res.send({status:true,payload:"request approved successfully"});
                        });
                       });
                    }
                }
                else if (response == "decline"){
                    auditLogs.findByIdAndUpdate({_id},{status:"decline"},(err,data)=>{
                        if(err){
                            console.log(err);
                            res.send({status:false,payload:"Error occurred ,please try again"});
                            return;
                        }
                            res.send({status:true,payload:"request declined successfully"});
                            return;
                        
                    })

                }
                else{
                    res.send({status:false,payload:"Invalid response type ,either accept or decline"})
                }  

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};

module.exports = respond_to_request;