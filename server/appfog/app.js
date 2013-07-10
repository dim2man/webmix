var http = require('http');
var ws = require('websocket');

var wsPort = 8080;

var wsHttpServer = http.createServer(function(request, response) {
  response.writeHead(404, {"X-WebSocket-Port": wsPort});
  response.end();
});
wsHttpServer.listen(wsPort, null);

var wsServer = new (ws.server)({
    httpServer: wsHttpServer,
    autoAcceptConnections: true
});

wsServer.on('connect', function(connection) {
    var id = connection.socket.remoteAddress + ':' + connection.socket.remotePort;
    wsServer.broadcastUTF(id + ' connected');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            wsServer.broadcastUTF(id + ': ' + message.utf8Data);
        }
    });
    connection.on('close', function(reasonCode, description) {
        wsServer.broadcastUTF(id + ' disconnected');
    });
});

var httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('wsServer is '+wsServer);
}).listen(8081, null);

