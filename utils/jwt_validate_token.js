const mongoose = require("mongoose");
const passport = require('passport');

const path = require('path');
const fs = require('fs');
const passportJWT = require('passport-jwt');
let jwt = require("jsonwebtoken");

const pathTokey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const publicKey = fs.readFileSync(pathTokey, 'utf8');

const userSchema = require("../models/userSchema");
const userData = mongoose.model('users',userSchema);


const authenticate = async (req, res, next) => {
 
    console.log(req.body);
  
    try {
     
      let username_from_req = req.headers.username ? req.headers.username :  req.body.username;
      let token_from_req = req.headers.token ? req.headers.token : req.body.token;
  
     
      if(token_from_req){
       
        jwt.verify(token_from_req, publicKey, function(err, decoded) {
          console.log(decoded);
          if (err) res.send("Auth Failed");
            
         else if (username_from_req.toLowerCase() === decoded.username.toLowerCase()) {
            var exp = decoded.exp;
            if (Date.now() >= exp * 1000) {
              //  console.log('Expired token');
              res.send("Token Expired");
              return;
            } else {
              console.log("Token valid..");
              next();
              return;
            }
        }
  
        else {
            res.send("Token Invalid");
            return;
        }
        });
      }
  
    } catch (e) {
      console.log(e);
      res.send(e);
      return;
    }
  };
  
  module.exports = authenticate;
  
