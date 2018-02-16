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
var visualizadores = [];

var n_clientes = 0;
var n_mensajes = 0;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion){
	console.log('Nuevo cliente conectado');
	//console.log(server);
	//console.log(server.socket);
	//aumento un 1 el contador de clientes
	n_clientes++;

	//console.log('-------------------------------------');
	//console.log(conexion.socket.remoteAddress);
	//console.log('----');
	//console.log(conexion.remoteAddress);
	//console.log('-------------------------------------');

	conexion.on("connected", function () {
	    console.log("un connected ahi:");
	});
	conexion.on("connect", function () {
	    console.log("un connect ahi:");
	});
	conexion.on("open", function () {
	    console.log("un open ahi:");
	});
	conexion.on("connection", function () {
	    console.log("un connection ahi sin parametro:");
	});

	conexion.on('connection', function(ws) {
		console.log("un connection ahi:");
	});

	conexion.on("text", function (str) {
		n_mensajes++;
	    console.log("on mensaje:");
	    console.log(str);
	    console.log(conexion.tipo);
	    if (conexion.tipo === null || ( typeof conexion.tipo === "undefined") ) {
			conexion.tipo = str
			//broadcast(str+" entered");
			//broadcast(JSON.stringify('{"n_clientes":'+ n_clientes +'}'));
			broadcast('{"n_clientes":'+ n_clientes +',"n_mensajes":' + n_mensajes + '}');
			broadcast('{"connected":"'+ conexion.tipo +'","ip":"'+ conexion.socket.remoteAddress +'"}');
			if(conexion.tipo==="visualizador"){
				visualizadores.push(conexion);
			}

		} else
			broadcast("["+conexion.tipo+"] "+str)
	});

	conexion.on("close", function (code, reason) {
		console.log('desconectado');
		//disminuyo en 1 el contador de clientes
		n_clientes--;
		broadcast('{"n_clientes":'+ n_clientes +',"n_mensajes":' + n_mensajes + '}');
		broadcast('{"disconnected":"'+ conexion.tipo  +'","ip":"'+ conexion.socket.remoteAddress +'"}');
	});

	 conexion.on('error', function(e){
        console.log('error');
        console.log(e);
    });
	

//Arrancamos el servidor WebSocket en la ip y puerto configurado al incio
}).listen(puertoServer,ipServer);

function broadcast(str) {
	server.connections.forEach(function (connection) {
		if(connection!=null){
			connection.sendText(str)
		}
	})
}
