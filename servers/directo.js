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
var controladores = [];
var plataformas = [];

var n_clientes = 0;
var n_mensajes = 0;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion){
	console.log('Nuevo cliente conectado');
	//console.log(server);
	//console.log(server.socket);
	//aumento un 1 el contador de clientes
	n_clientes++;

	console.log('-------------------------------------');
	/*console.log(conexion.socket.remoteAddress);
	console.log('----');
	console.log('----');
	console.log(conexion.socket);
	console.log('----');
	console.log(conexion.socket.asyncId);
	console.log('----');
	console.log(conexion.asyncId);
	console.log('-------------------------------------');*/

	conexion.on("connected", function (e) {
	    console.log("un connected ahi:");
	});
	conexion.on("connect", function (e) {
	    console.log("un connect ahi:");
	});
	conexion.on("open", function (e) {
	    console.log("un open ahi:");
	});
	conexion.on("connection", function () {
	    console.log("un connection ahi sin parametro:");
	});

	conexion.on('connection', function(e) {
		console.log("un connection ahi:");
	});	
	conexion.on('connection', function(e, evt) {
		console.log("un connection ahi ws:");
	});

	conexion.on("text", function (msg) {
		n_mensajes++;
	    /*console.log("on mensaje:");
	    console.log(msg);
	    console.log(msg.cliente);
	    console.log(msg['cliente']);
	    console.log('* * * * * * ');*/
	    console.log('--------------------------');
	    var str = JSON.parse(msg);
	    console.log(str);
	    //console.log(str['cliente']);
	    //console.log(str.cliente);
	    console.log('--------------------------');
	    if (conexion.cliente === null || ( typeof conexion.cliente === "undefined") ) {
			conexion.cliente = str.cliente
			conexion.tipo = str.cliente
			//broadcast(str+" entered");
			//broadcast(JSON.stringify('{"n_clientes":'+ n_clientes +'}'));
			broadcast('{"n_clientes":'+ n_clientes +',"n_mensajes":' + n_mensajes + '}');

			if(conexion.cliente === "visualizador"){
				conexion.cliente = conexion.cliente+((visualizadores.length)+1);
				visualizadores.push(conexion);
			}else if( conexion.cliente === "controlador"){
				conexion.cliente = conexion.cliente+((controladores.length)+1);
				controladores.push(conexion);
			}else if( conexion.cliente === "plataforma"){
				conexion.cliente = conexion.cliente+((plataformas.length)+1);
				plataformas.push(conexion);
			}
			
			broadcast('{"connected":"'+ conexion.tipo +'","ip":"'+ conexion.socket.remoteAddress + '","id":"'+ conexion.cliente +'"}');
			
			console.log(conexion.cliente);

		} else {
			str.client = conexion.tipo;
			broadcast(JSON.stringify(str));
		}
	});

	conexion.on("close", function (code, reason) {
		var index_cliente = (conexion.cliente.substring(conexion.cliente.length-1, conexion.cliente.length))-1;
		console.log('=============================');
		console.log('desconectado');
		console.log('tipo: ' + conexion.tipo);
		console.log('ip: ' + conexion.socket.remoteAddress);
		console.log('cliente: ' + conexion.cliente);
		console.log('index: ' + index_cliente);
		console.log('============================================');
		if(conexion.tipo === "visualizador"){
			visualizadores.splice(index_cliente, 1);
		}else if( conexion.tipo === "controlador"){
			controladores.splice(index_cliente, 1);
		}else if( conexion.tipo === "plataforma"){
			plataformas.splice(index_cliente, 1);
		}
		//disminuyo en 1 el contador de clientes
		n_clientes--;
		broadcast('{"n_clientes":'+ n_clientes +',"n_mensajes":' + n_mensajes + '}');
		broadcast('{"disconnected":"'+ conexion.tipo  +'","ip":"'+ conexion.socket.remoteAddress + '","id":"' + conexion.cliente + '"}');
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
