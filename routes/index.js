const { required } = require("@hapi/joi");
const mongoose = require("mongoose");
const router = require('express').Router();

const passport = require('passport');


// const authenticationService = require('../utils/jwt_validate_token').intialize();

const auth_middleware = require("../utils/jwt_validate_token");

const login_user = require("../controllers/login_user");
const signup_user = require("../controllers/signup_user");
const signup_admin = require("../controllers/signup_admin");
const create_post = require("../controllers/create_post");
const get_posts = require("../controllers/get_posts");
const delete_post = require("../controllers/delete_post");
const admin_edit_post = require("../controllers/admin_edit_post");
const admin_delete_post = require("../controllers/admin_delete_post");
const signup_super_admin = require("../controllers/signup_super_admin");
const admin_requests = require("../controllers/admin_requests");
const respond_to_request = require("../controllers/respond_to_request");
const get_own_posts = require("../controllers/get_own_posts");
const login_admin = require("../controllers/login_admin");
const login_super_admin = require("../controllers/login_super_admin");
const get_audit_logs = require("../controllers/get_audit_logs");
const super_admin_edit_post = require("../controllers/super_admin_edit_post");
const super_admin_delete_post = require("../controllers/super_admin_delete_post");
const audit_log_analysis = require("../controllers/audit_log_analysis");
const audit_log_requests_by_role = require("../controllers/audit_log_requests_by_role");

router.get('/', (req, res) => {
    res.send('Hello World!')
  })

//User realted apis
router.post('/signup_user',signup_user);
router.post('/login_user',login_user);
router.post('/create_post',auth_middleware,create_post);
router.delete('/delete_post',auth_middleware,delete_post);
router.get('/get_own_posts',auth_middleware,get_own_posts);

//Admin realted apis
router.post('/signup_admin',signup_admin);
router.post('/login_admin',login_admin);
router.post('/admin_edit_post',auth_middleware,admin_edit_post);
router.post('/admin_delete_post',auth_middleware,admin_delete_post);

// Super admin related apis
router.post('/signup_super_admin',signup_super_admin);
router.post('/login_super_admin',login_super_admin);
router.get('/admin_requests',auth_middleware,admin_requests);
router.post('/respond_to_request',auth_middleware,respond_to_request);
router.delete('/super_admin_delete_post',auth_middleware,super_admin_delete_post);
router.post('/super_admin_edit_post',auth_middleware,super_admin_edit_post);



router.get('/get_posts',auth_middleware,get_posts);
router.get('/get_audit_logs',auth_middleware,get_audit_logs);

router.get('/audit_log_requests_by_type',auth_middleware,audit_log_analysis);
router.get('/audit_log_requests_by_role',auth_middleware,audit_log_requests_by_role)












module.exports = router; 