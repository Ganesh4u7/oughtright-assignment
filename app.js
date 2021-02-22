const express = require('express');
const bodyparser = require("body-parser");
const { validate } = require("./utils/body_checker");
const cors = require("cors");

const mongo_db = require("./connections/mongo_connection");

const port = normalizePort(process.env.PORT || '3000');


let app_init = async () => {

  await mongo_db.connect();

  const routes = require("./routes"); 

    const app = express();
    app.use(cors());
    app.use(bodyparser.json());
    app.use(validate);
    app.use(routes);

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`)
    });

}

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }

}   

app_init();