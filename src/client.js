var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});  //如果连接失败会执行这条函数

client.on('connect', function(connection) {  //连接成功触发函数,一旦连接成功，客户端和服务器端都可以向对方发送请求
  console.log('WebSocket Client Connected');

  connection.on('error', function(error) {
    console.log("Connection Error: " + error.toString());
  });

  connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
  });

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
    }
  });   //一旦收到消息执行函数，只要双方链接成功服务器端可以主动向客户端发送数据

  function sendNumber() {
    if (connection.connected) {
      var number = Math.round(Math.random() * 0xFFFFFF);
      connection.sendUTF(number.toString());
      setTimeout(sendNumber, 10000);
    }
  } //这是一个可以自己定义的发送数据的function，直接调用，就可以直接向和自己建立了连接的服务器发送请求

  sendNumber();   //客户端一旦链接上就发送数据到服务器端
});

client.connect('ws://localhost:9898/', 'echo-protocol');