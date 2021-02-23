

const {postData,auditLogs} = require('../utils/mongoose_models');


const get_posts = async (req,res,next)=>{

    try{
        let role = req.query.role;
        let page =req.query.page -1;
        console.log(page,role);
        let username = req.headers.username;

       if(role =="user" || role =="admin" || role=="super_admin"){
          
        postData.aggregate([{ '$match'    : { } },
                        { '$facet'    : {
                        data: [ { $skip: page *10 }, { $limit: 10 } ] 
                    } }],(err,posts)=>{

            if(err){
                console.log(err);
                res.send({status:false,payload:"Error occurred"});
            }
            else{
                // console.log(posts);
                let audit_log = new auditLogs({
                    role,
                    type:"get_posts",
                    postDetails:posts[0].data,
                    logReport:`${role} : ${username} requested a get posts api call`,
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
      else{
          res.send({status:false,payload:"Invalid role"});
      }  

    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
}

module.exports = get_posts;