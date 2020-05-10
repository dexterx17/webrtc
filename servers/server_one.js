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
MSG_INSTRUCCION = "inst";
MSG_ESTADO = "stat";
MSG_EMPAREJAMIENTO = "emp";
MSG_CONEXION = "conn";
MSG_LISTADO_CLIENTES = "list";
MSG_ESTADO_SERVIDOR = "stats";
MSG_DESCONEXION = "disc";
MSG_RUTA = "ruta";

//Instancias para clientis del websocket
var plataforma;
var controlador;
var visualizadores = [];
var controladores = [];
var plataformas = [];

var n_clientes = 0;
var n_mensajes = 0;

//Creamos y configuramos el WebSocket
var server = ws.createServer(function(conexion) {
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

    conexion.on("text", function(msg) {
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
                if (conexion.alias === null || (typeof conexion.alias === "undefined")) {
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
                    broadcastVisualizadores('{"ev":"id","tipo":"' + conexion.tipo + '","ip":"' + conexion.socket.remoteAddress + '","id":"' + conexion.alias + '"}');
                }
                break;
            case MSG_INSTRUCCION:
                //verifico si el controlador esta emparejada con alguna plataforma
                if (conexion.slave) {
                    //envio la instrucción hacia la plataforma
                    conexion.slave.sendText(JSON.stringify(str));
                }
                //seteo al originario del mensaje
                str.alias = conexion.alias;
                //envio la instruccion a todos los visualizadores
                broadcastVisualizadores(JSON.stringify(str));
                break;
            case MSG_ESTADO:
                //verifico si la plataforma esta emparejada con algun controlador
                if (conexion.master) {
                    //envio el mensaje de estado hacia el controlador
                    conexion.master.sendText(JSON.stringify(str));
                }
                //seteo al originario del mensaje
                str.alias = conexion.alias;
                //envio el mensaje de estado a los visualizadores
                broadcastVisualizadores(JSON.stringify(str));
                break;
            case MSG_RUTA:
                broadcastVisualizadores(JSON.stringify(str));
                break;
            default:
                break;
        }

    });

    conexion.on("close", function(code, reason) {
        if (conexion.alias) {
            var index_alias = (conexion.alias.substring(conexion.alias.length - 1, conexion.alias.length)) - 1;
            console.log('=============================');
            console.log('desconectado');
            console.log('tipo: ' + conexion.tipo);
            console.log('ip: ' + conexion.socket.remoteAddress);
            console.log('alias: ' + conexion.alias);
            console.log('index: ' + index_alias);
            console.log('data: ' + conexion.data);
            console.log('============================================');
            if (conexion.tipo === "viewer") {
                visualizadores.splice(index_alias, 1);
                //si el cliente que se desconecto es un controlador
            } else if (conexion.tipo === "controller") {
                //lo retiro del array de controladores
                controladores.splice(index_alias, 1);
                //verifico si esta emparejado con una plataforma
                if (conexion.slave) {
                    console.log('plataforma liberada del controlador');
                    //libero a la plataforma del controlador
                    conexion.slave.master = null;
                }
                //si el cliente que se desconecto es una plataforma
            } else if (conexion.tipo === "platform") {
                //lo retiro del array de plataformas
                plataformas.splice(index_alias, 1);
                //verifico si esta emparejado con algun controlador
                if (conexion.master) {
                    console.log('controlador liberado de la plataforma');
                    //libero al controlador de la plataforma
                    conexion.master.slave = null;
                }
            }
        }
        //disminuyo en 1 el contador de clientis
        n_clientes--;
        //notifico a los visualizadores el estado de los clientes en el servidor
        broadcastVisualizadores(getStats());
        //notifico a todos los clientes que el cliente se desconecto
        broadcast('{"ev":"disc","disconnected":"' + conexion.tipo + '","ip":"' + conexion.socket.remoteAddress + '","id":"' + conexion.alias + '"}');
    });

    conexion.on('error', function(e) {
        console.log('error');
        console.log(e);
    });


    //Arrancamos el servidor WebSocket en la ip y puerto configurado al inicio
}).listen(puertoServer, ipServer);


/**
 * Agrega el cliente a la pila correspondiente,de acuerdo a su tipo
 * adiocionalmente genera un alias unico para cada cliente
 *
 **/
function initClient(conexion) {
    if (conexion.tipo === "viewer") {
        conexion.alias = conexion.tipo + ((visualizadores.length) + 1);
        visualizadores.push(conexion);
        //Si es un cliente de tipo controller
    } else if (conexion.tipo === "controller") {
        conexion.alias = conexion.tipo + ((controladores.length) + 1);
        controladores.push(conexion);
        //verifico si hay plataformas a las que controlar
        if (plataformas.length > 0) {
            //recorro todas las plataformas
            for (let index = 0; index < plataformas.length; index++) {
                const platform = plataformas[index];
                //identifico la plataforma a la que voy a controlar
                if (platform.client === conexion.client) {
                    //seteo como slave del controlador a la plataforma
                    conexion.slave = platform;
                    //seteo como master de la plataformas al controlador
                    platform.master = conexion;
                }
            }
        }
        // si es un cliente de tipo platform
    } else if (conexion.tipo === "platform") {
        conexion.alias = conexion.tipo + ((plataformas.length) + 1);
        plataformas.push(conexion);
        //verifico si hay controladores para la plataforma
        if (controladores.length > 0) {
            //recorro todos los controladores
            for (let index = 0; index < controladores.length; index++) {
                const controller = controladores[index];
                //identifico al controlador de la plataforma
                if (controller.client === conexion.client) {
                    //seteo como master de la plataforma al controlador
                    conexion.master = controller;
                    //seteo como salve del controlador a la plataforma
                    controller.slave = conexion;
                }
            }
        }
    }
}

function emparejar(conexion) {
    if (conexion.tipo === "controller") {

    }
}

function broadcast(str) {
    server.connections.forEach(function(connection) {
        if (connection != null) {
            connection.sendText(str)
        }
    })
}

function getStats() {
    var stats = '{"ev":"stats","n_clients":' + n_clientes + ',"n_platforms":' + plataformas.length + ',"n_viewers":' + visualizadores.length + ',"n_controllers":' + controladores.length + ',"n_messages":' + n_mensajes + '}';
    return stats;
}

function getClientesConectados() {
    var res = {
        "ev": "list",
        clients: []
    };
    var clients = [];
    server.connections.forEach(function(connection) {
        if (connection != null) {
            var client = {};
            client.alias = connection.alias;
            client.tipo = connection.tipo;
            client.cliente = connection.cliente;
            client.ip = connection.socket.remoteAddress;
            client.data = connection.data;
            if (connection.master)
                client.master = connection.master.alias;
            if (connection.slave)
                client.slave = connection.slave.alias;
            clients.push(client);
        }
    });
    res.clients = clients;
    return res;
}

function broadcastControladores(str) {
    server.connections.forEach(function(connection) {
        if (connection != null) {
            if (connection.tipo === "controller" || connection.tipo === "viewer")
                connection.sendText(str)
        }
    })
}

function broadcastPlataformas(str) {
    server.connections.forEach(function(connection) {
        if (connection != null) {
            if (connection.tipo === "platform" || connection.tipo === "viewer")
                connection.sendText(str)
        }
    })
}

function broadcastVisualizadores(str) {
    server.connections.forEach(function(connection) {
        if (connection != null) {
            if (connection.tipo === "viewer")
                connection.sendText(str)
        }
    })
}