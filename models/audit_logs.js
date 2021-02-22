const mongoose = require("mongoose");
const schema = mongoose.Schema;

const auditLogsSchema = new schema ({

    subject:String,
    message:String,
    createdAt:Date,
    createdBy:String,
    version:Number,
    updatedBy:String,
    updatedAt:Date,
    status:String,
    deletedBy:String,
    deletedAt:String,
    role:String,
    type:String,
    id:String,
    updateDescription:String,
    postDetails:Object,
    logReport:String,
    logTime:Date

});

module.exports = auditLogsSchema;