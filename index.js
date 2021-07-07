const express = require('express');
const app = express();
const port = 3000;

const routeWrapper = require("./helpers/route_wrapper").routeWrapper;
const {hasApiKey} = require("./Auth/basic_auth");
const {valid_params} = require("./helpers/validate_params");


/*  DB LAYER
    Is the master layer that contains the following functions: 
      get_project
    
    Mongo Layer & SQL Layer are each configured to have identical functions of the db layer
*/

const db = require('./layers/mongoLayer').layer;
//const db = require('./layers/sqlLayer').layer;

app.get('/project/:project_id', routeWrapper([hasApiKey], [valid_params(["project_id"])], db.get_project));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})