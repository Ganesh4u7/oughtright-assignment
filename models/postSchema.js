
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema ({

    subject:String,
    message:String,
    createdAt:Date,
    createdBy:String,
    version:Number
});

module.exports = postSchema;