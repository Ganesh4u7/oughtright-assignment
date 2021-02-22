const Joi = require("@hapi/joi");
const super_admin_edit_post = require("../controllers/super_admin_edit_post");

const body_schemas = {
 
  login_user: Joi.object({
    username: Joi.string().required(),
    email : Joi.string().email().required(),
    password: Joi.string().required()
  }),
  login_admin: Joi.object({
    username: Joi.string().required(),
    email : Joi.string().email().required(),
    password: Joi.string().required()
  }),
  login_super_admin: Joi.object({
    username: Joi.string().required(),
    email : Joi.string().email().required(),
    password: Joi.string().required()
  }),
  signup_user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  signup_admin :Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  signup_super_admin :Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  create_post: Joi.object({
    subject: Joi.string().required(),
    message:Joi.string().required()
  }),
  get_posts: Joi.object({
  }),
  get_own_posts: Joi.object({

  }),
  delete_post: Joi.object({
  }),
  admin_edit_post: Joi.object({
    subject: Joi.string().required(),
    message: Joi.string().required(),
    _id: Joi.string().required(),
    updateDescription: Joi.string().required()
  }),
  admin_delete_post: Joi.object({
    _id: Joi.string().required(),
    updateDescription: Joi.string().required()
  }),
  admin_requests: Joi.object({
  }),
  respond_to_request: Joi.object({
    _id: Joi.string().required(),
    response: Joi.string().required()
  }),
  get_audit_logs: Joi.object({

  }),
  super_admin_delete_post: Joi.object({

  }),
  super_admin_edit_post: Joi.object({
    subject: Joi.string().required(),
    message: Joi.string().required(),
    _id: Joi.string().required(),
    updateDescription: Joi.string().required()
  }),
  audit_log_analysis: Joi.object({

  })
  
  
  
}; 

 

module.exports = { body_schemas };
