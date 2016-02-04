var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var httpHelpers = require("./http-helpers")

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var actions = {
  "GET": function(req, res) {
    handler.handleGet(req, res);
  },
  "POST": function(req, res) {
    handler.handlePost(req, res);
  }
};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(function(req, res) {
  console.log('Received ' + req.method + ' request for ' + req.url);
  if(actions[req.method]) {
    actions[req.method](req,res);
  } else {
    httpHelpers.sendResponse(res, "Unknown Method", 404);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

