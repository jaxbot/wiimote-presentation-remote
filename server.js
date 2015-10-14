var osc = require('node-osc');
var fs = require('fs');


// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var servers = require('https').createServer(credentials, app);
servers.listen(3000);
// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(servers);

io.on('connection', function (socket) {
  var addedUser = false;
});
var oscServer = new osc.Server(5600, '0.0.0.0');
oscServer.on("message", function (msg, rinfo) {
      if (msg[0] == "/wii/button/b") {
              io.sockets.emit("data", msg);
      }
      if (msg[0] == "/wii/acc") {
              io.sockets.emit("data", msg);
      }
});
