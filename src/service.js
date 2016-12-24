var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});  //首先双方需要使用http协议建立连接

server.listen(9898, function() {
  console.log((new Date()) + ' Server is listening on port 9898');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
  //这个参数如果为true，就是说服务器能答应所有请求连接的客户端，这样是不对的，服务器应该检查请求链接的客户端（origin）是谁再做决定
});

function originIsAllowed(origin) {
  console.log(origin+"请求来源");
  // 你应该在这里编写你对哪些客户端允许访问然后返回true，不允许访问的返回false
  return true; //这样只是先假装所有客户端都可以连接
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  } //如果这个客户端不能连接那么执行这个函数

  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      // connection.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      // connection.sendBytes(message.binaryData);
    }  //一旦受到客户端消息触发
  });

  function sendMsg() {
    setInterval(function() {
      connection.sendUTF("zhangpei");
    },10000);
  }

  sendMsg();  //服务器端也可以主动向客户端发送数据当连接成功的时候

  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});
