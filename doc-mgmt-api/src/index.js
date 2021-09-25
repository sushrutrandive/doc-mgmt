const express = require('express');
const http = require('http');
const cors = require('cors');

//setup app & its routes
const app = express();
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routes = require('./routes/index');
app.use(routes);


//start http server
const httpServer = http.createServer(app);
httpServer.listen(8080);
console.log("http server listening at port 8080");


module.exports = { app };