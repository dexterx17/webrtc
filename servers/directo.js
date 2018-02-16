/**
 *
 *	Servidor Websocket simple
 *
 *  espera la conexion de 1 controlador y 1 plataforma, y cada vez que un dato
 *  es enviado por cualquiera es reenviado al otro cliente
 *
 *  npm install nodejs-websocket
**/

//libreria de servidor websocket
var ws = require("nodejs-websocket");

//Info de servidor
var ipServer = "0.0.0.0";
var puertoServer = 9000;


//Instancias para clientes del websocket
var plataforma;
var controlador;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion){
	console.log('Nuevo cliente conectado');

//Arrancamos el servidor WebSocket en la ip y puerto configurado al incio
}).listen(puertoServer,ipServer);

