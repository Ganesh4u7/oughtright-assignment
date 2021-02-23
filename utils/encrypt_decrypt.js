const bcrypt = require('bcrypt');



function validPassword(password, hash) {

  return bcrypt.compareSync(password, hash);
}


function genPassword(password){
  let saltRounds = 10;
  // console.log(password);
  return bcrypt.hashSync(password,saltRounds);
}


module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;