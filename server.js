var express = require("express");

var app = express();
	app.use(express.static(__dirname + "/example/public/"));
	app.listen(8080);

console.log("Server listening on Port 8080")