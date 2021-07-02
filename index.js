const express = require('express');
const app = express();
const port = 3000;

const routeWrapper = require("./helpers/route_wrapper").routeWrapper;
const {auth1, auth2} = require("./helpers/auth.js");
const {parseProjectId} = require("./helpers/params_transformer");

const db = require('./layers/mongoLayer').layer;
//const db = require('./layers/sqlLayer').layer;

app.get('/project/:project_id', routeWrapper([parseProjectId], auth1, db.get_project));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const otherFunc = async (vals) => await new Promise((res) => {
//     console.log(vals)
//     setTimeout(()=> {
//       res(vals)
//     }, 5000)
//   })