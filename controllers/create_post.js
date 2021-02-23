

const {auditLogs,userData} = require('../utils/mongoose_models');

const create_post = async (req,res,next) => {

    try{
        
        const username = req.headers.username.toLowerCase();

        let userDetails = await userData.findOne({username});
        console.log(userDetails);

        if(userDetails){
            const post = new postData({
                subject: req.body.subject,
                message: req.body.message,
                createdAt: Date.now(),
                createdBy: username,
                version: 1
            });

            post.save((err,data)=>{
                if(err){
                    console.log(err);
                    res.send({status:false,payload:"Error occurred ,try again"});
                }
                else{
                
                    auditLogs.create(
                        {
                            subject: req.body.subject,
                            message: req.body.message,
                            createdAt: Date.now(),
                            createdBy: username,
                            version: 1,
                            role:"user",
                            type:"create",
                            logReport:`user: ${username} created a new post`,
                            logTime:Date.now()

                        },(err1)=>{
                            if(err1){
                                console.log(err1)
                                res.send({status:true,payload:"post saved ,error occurred while storing log"});
                            }
                            else{
                                res.send({status:true,payload:"Post saved"});
                            }
                        })

                }
            });
        }
        else{
            res.send({status:false,payload:"Username doesn't exist"});
        }


       


        
    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = create_post;