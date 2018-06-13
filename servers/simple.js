//libreria de servidor websocket
var ws = require("nodejs-websocket");

//Info de servidor
var ipServer = "0.0.0.0";
var puertoServer = 9000;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion) {
    console.log('Nuevo alias conectado');

    conexion.on("text", function(msg) {

    });

    //Arrancamos el servidor WebSocket en la ip y puerto configurado al inicio
}).listen(puertoServer, ipServer);