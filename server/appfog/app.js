var http = require('http');
var ws = require('websocket');

var wsPort = process.env.VCAP_APP_PORT || 9090;

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
