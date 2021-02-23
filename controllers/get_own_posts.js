

const {postData,auditLogs} = require('../utils/mongoose_models');


const get_own_posts = async (req,res,next)=>{

    try{
        let username = req.headers.username;
        let page = req.query.page - 1;
        console.log(username);
        postData.aggregate([{ '$match'    : {createdBy:username } },
                    { '$facet'    : {
                    data: [ { $skip: page *10 }, { $limit: 10 } ] 
                } }],(err,posts)=>{

            if(err){
                console.log(err);
                res.send({status:false,payload:"Error occurred"});
            }
            else{
                let audit_log = new auditLogs({
                    role:"user",
                    type:"get_posts",
                    postDetails:posts[0].data,
                    logReport:`user : ${username} requested a get posts api call`,
                    logTime:Date.now()
                });
        
                   audit_log.save((err1)=>{
                        if(err){
                            console.log(err1);
                            res.send({status:true,payload:posts[0].data});
                        }
                        else{
                            res.send({status:true,payload:posts[0].data});
                        }
                    });
            }
        });

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_own_posts;