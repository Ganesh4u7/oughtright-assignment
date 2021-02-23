
const mongoose = require("mongoose");

const postSchema = require("../models/postSchema");
const postData = mongoose.model('posts',postSchema);

const auditLogsSchema = require("../models/audit_logs");
const auditLogs = mongoose.model('audit_logs',auditLogsSchema);

const adminSchema = require("../models/adminSchema");
const adminData = mongoose.model('admins',adminSchema);

const superAdminSchema = require("../models/superAdminSchema");
const superAdminData = mongoose.model('super_admins',superAdminSchema);

const userSchema = require("../models/userSchema");
const userData = mongoose.model('users',userSchema);

module.exports = {
    postData,
    auditLogs,
    adminData,
    userData,
    superAdminData
};