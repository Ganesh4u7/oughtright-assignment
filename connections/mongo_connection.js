const mongoose = require("mongoose");
const config = require("../config");



module.exports.connect = () =>
        new Promise((resolve, reject) => {

            const uri = config.mongo_url;
            mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error"));
            db.once("open", function(callback) {
              console.log("Connection succeeded.");
              resolve();
            });
  });


