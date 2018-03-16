/**
 *
 *	Servidor Websocket simple
 *
 *  espera la conexion de 1 controlador y 1 plataforma, y cada vez que un dato
 *  es enviado por cualquiera es reenviado al otro alias
 *
 *  npm install nodejs-websocket
**/

//libreria de servidor websocket
var ws = require("nodejs-websocket");

//Info de servidor
var ipServer = "0.0.0.0";
var puertoServer = 9000;

//Constantes que identifican el tipo de mensaje recibido a traves del websocket
MSG_IDENTIFICACION = "id";
MSG_INSTRUCCION= "inst";
MSG_ESTADO = "stat";
MSG_EMPAREJAMIENTO = "emp";
MSG_CONEXION  = "conn";
MSG_LISTADO_CLIENTES = "list";
MSG_ESTADO_SERVIDOR = "stats";
MSG_DESCONEXION = "disc";

//Instancias para clientis del websocket
var plataforma;
var controlador;
var visualizadores = [];
var controladores = [];
var plataformas = [];

var n_clientes = 0;
var n_mensajes = 0;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion){
	console.log('Nuevo alias conectado');
	//console.log(server);
	//console.log(server.socket);
	//aumento un 1 el contador de clientis
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
	    console.log('*****');
	    console.log(str.ev);
	    console.log('*****');
	    console.log(str);
	    //console.log(str['cliente']);
	    //console.log(str.cliente);
	    console.log('--------------------------');
	    switch (str.ev) {
	    	case MSG_IDENTIFICACION:
	    		if (conexion.alias === null || ( typeof conexion.alias === "undefined") ) {
					conexion.cliente = str.cliente;
					conexion.tipo = str.tipo;
					//broadcast(str+" entered");
					//broadcast(JSON.stringify('{"n_clientes":'+ n_clientes +'}'));
					
					console.log('tipo: ' + conexion.tipo);
					//agrego el cliente a su array correspondiente y le generamos un alias unico
					initClient(conexion);

					//notifico a los visualizadores el estado de los clientes en el servidor
					broadcastVisualizadores(getStats());
					//envio a los visualizadores los datos de los clientes conectados
					broadcastVisualizadores(JSON.stringify(getClientesConectados()));
					
					//notifico a todos los clientes que un nuevo cliente se conecto
					broadcast('{"ev":"id","tipo":"'+ conexion.tipo +'","ip":"'+ conexion.socket.remoteAddress + '","id":"'+ conexion.alias +'"}');
				}
	    		break;
	    	case MSG_INSTRUCCION:

	    	break;
	    	case MSG_ESTADO:
	    		
				broadcast(JSON.stringify(str));
	    	break;
	    	default:
	    	break;
	    }	    
		
	});

	conexion.on("close", function (code, reason) {
		var index_alias = (conexion.alias.substring(conexion.alias.length-1, conexion.alias.length))-1;
		console.log('=============================');
		console.log('desconectado');
		console.log('tipo: ' + conexion.tipo);
		console.log('ip: ' + conexion.socket.remoteAddress);
		console.log('alias: ' + conexion.alias);
		console.log('index: ' + index_alias);
		console.log('data: ' + conexion.data);
		console.log('============================================');
		if(conexion.tipo === "visualizador"){
			visualizadores.splice(index_alias, 1);
		}else if( conexion.tipo === "controlador"){
			controladores.splice(index_alias, 1);
		}else if( conexion.tipo === "plataforma"){
			plataformas.splice(index_alias, 1);
		}
		//disminuyo en 1 el contador de clientis
		n_clientes--;
		//notifico a los visualizadores el estado de los clientes en el servidor
		broadcastVisualizadores(getStats());
		//notifico a todos los clientes que el cliente se desconecto
		broadcast('{"ev":"disc","disconnected":"'+ conexion.tipo  +'","ip":"'+ conexion.socket.remoteAddress + '","id":"' + conexion.alias + '"}');
	});

	 conexion.on('error', function(e){
        console.log('error');
        console.log(e);
    });
	

//Arrancamos el servidor WebSocket en la ip y puerto configurado al inicio
}).listen(puertoServer,ipServer);


function initClient(conexion){
	if(conexion.tipo === "visualizador"){
		conexion.alias = conexion.tipo+((visualizadores.length)+1);
		visualizadores.push(conexion);
	}else if( conexion.tipo === "controlador"){
		conexion.alias = conexion.tipo+((controladores.length)+1);
		controladores.push(conexion);
	}else if( conexion.tipo === "plataforma"){
		conexion.alias = conexion.tipo+((plataformas.length)+1);
		plataformas.push(conexion);
	}
}

function broadcast(str) {
	server.connections.forEach(function (connection) {
		if(connection!=null){
			connection.sendText(str)
		}
	})
}

function getStats(){
	var stats = '{"ev":"stats","n_clientes":'+ n_clientes +',"n_plataformas":' + plataformas.length +',"n_visualizadores":' + visualizadores.length +',"n_controladores":' + controladores.length +',"n_mensajes":' + n_mensajes + '}';
	return stats;
}

function getClientesConectados() {
	var res = {
		"ev" : "list",
		clients: []
	};
	var clients = [];
	server.connections.forEach(function (connection) {
		if(connection!=null){
			var client = {};
			client.alias = connection.alias;
			client.tipo = connection.tipo;
			client.cliente = connection.cliente;
			client.ip = connection.socket.remoteAddress;
			client.data = connection.data;
			clients.push(client);
		}
	});
	res.clients = clients;
	return res;
}

function broadcastControladores(str) {
	server.connections.forEach(function (connection) {
		if(connection!=null){
			if( connection.tipo === "controlador" || connection.tipo === "visualizador" )
				connection.sendText(str)
		}
	})
}

function broadcastPlataformas(str) {
	server.connections.forEach(function (connection) {
		if(connection!=null){
			if( connection.tipo === "plataforma" || connection.tipo === "visualizador" )
				connection.sendText(str)
		}
	})
}

function broadcastVisualizadores(str) {
	server.connections.forEach(function (connection) {
		if(connection!=null){
			if( connection.tipo === "visualizador" )
				connection.sendText(str)
		}
	})
}
