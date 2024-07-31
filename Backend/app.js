const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const logger = require('morgan');
const https = require('http');
const cors = require('cors');
require("dotenv").config();
var fs = require('fs');
const agent = require("agentkeepalive");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));
app.use("/upload", express.static(process.env.FILE_UPLOAD_PATH));

require("./models/index");

require("./routes/routes")(app);

const keepaliveAgent = new agent({
	maxSockets: 100,
	maxFreeSockets: 10,
	timeout: 60000,
	freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

var options = {
	agent: keepaliveAgent
};

const port = parseInt(process.env.PORT, 10) || 8800;
app.set('port', port);
const server = https.createServer(options, app);
server.listen(port, () => console.log(`Server listening on ${port}` +' '+ new Date()));

module.exports = app;