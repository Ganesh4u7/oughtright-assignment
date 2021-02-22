const { body_schemas } = require("./body_schema");

let validate = (req, res, next) => {
  let route_name = req.url.replace("/", "");
  route_name= route_name.substr(0, route_name.indexOf('?'));
  console.log(route_name.length);
  console.log(route_name);
   console.log(req.body);
  if (route_name.length !== 0) {
    const schema = body_schemas[`${route_name}`];
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.send({
        status: false,
        payload:
          error.details[0].message.replace(/['"]+/g, "") + " in request body",
      });
      return;
    } else {
      next();
    }
  } else {
    next();
  }
};
module.exports = {
  validate,
};
