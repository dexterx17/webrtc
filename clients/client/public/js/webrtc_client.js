
var base_url = window.location.origin;
var app_url = base_url + '/web/clients/client/public/'

var ws;
var map;
var trayectoria;
var route;
var marker;
var markers = [];

//Constantes que identifican el tipo de mensaje recibido a traves del websocket
MSG_IDENTIFICACION = "id";
MSG_INSTRUCCION= "inst";
MSG_ESTADO = "stat";
MSG_EMPAREJAMIENTO = "emp";
MSG_CONEXION  = "conn";
MSG_LISTADO_CLIENTES = "list";
MSG_ESTADO_SERVIDOR = "stats";
MSG_DESCONEXION = "disc";
MSG_RUTA = "ruta";

//Imagenes para mostrar los clientes en el mapa
var drone_image = app_url + 'img/dron.png';
var kunka_image = app_url + 'img/kunka.png';
var android_image = app_url + 'img/android.png';
var kunka_image = app_url + 'img/kunka.png';

var triangleCoords = [
    {lat: -0.935049, lng: -78.611000},
    {lat: -0.935131, lng: -78.611500},
    {lat: -0.935914, lng: -78.611374},
    {lat: -0.935816, lng: -78.610865}
];

$( document ).ready(function() {
    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(-0.9357917,-78.6124162,12),
            zoom: 18,
            mapTypeId: 'satellite',

        };
        map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions); 

         route = new google.maps.Polyline({
            path: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeWeight: 2,
            //fillColor: '#FF0000',
            fillOpacity: 0,
            map: map
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});

function procesarMensaje(msg){

}

function graficarRuta(puntos){
    var coords = [];
    console.log('creando ruta');
    for (var i = 0; i < puntos.length; i++) {
        //var p = { lat: puntos[i].lat, lng: puntos[i].lng };
        var pos = new google.maps.LatLng({ lat: puntos[i].lat, lng: puntos[i].lng });
        coords.push(pos);
    }

    if(typeof route === "undefined"){
        //var route = new google.maps.Polygon({
        route = new google.maps.Polyline({
            path: coords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            //fillColor: '#FF0000',
            fillOpacity: 0,
            map: map
        });
    }else{
        route.setMap(null);
        route = new google.maps.Polyline({
            path: coords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            //fillColor: '#FF0000',
            fillOpacity: 0,
            map: map
        });
    }
}

function graficarTrayectoria(){
    // Define a symbol using SVG path notation, with an opacity of 1.
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
}


//Codigos de mensajes
//invalido      0  //Invalid
//inicializando 1  //
//congifurando  2
//configurado   3 2 255 255 4 0 0 0 //configured
//
//llamada       6 2 1   0   4 0 0 0 
//server closed 5 0 255 255 

function createHeader(arr){
    var buf = new ArrayBuffer(8);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < arr.length; i++) {
        bufView[i] = String.fromCharCode(arr[i]).charCodeAt(0);
    }
    bufView[4] = String.fromCharCode(4).charCodeAt(0);
    bufView[5] = String.fromCharCode(0).charCodeAt(0);
    bufView[6] = String.fromCharCode(0).charCodeAt(0);
    bufView[7] = String.fromCharCode(0).charCodeAt(0);
    var o = new Uint8Array(buf);
    return o;
}


/**
* Codifica una cadena de texto
*
**/
function stringToBuffer(header,str){
    
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);

    for (var i = 0; i < str.length; i++) {
        bufView[i]= str.charCodeAt(i);
    }

    var o = new Uint8Array(buf);
    var c = new Uint8Array(header.length + o.length);
    c.set(header);
    c.set(o, header.length);
    return c;
}

function msgToString(e){
    var res = "";
    var view = new Uint16Array(e);
    for (var i = 4; i < view.length; i++) {
        var d = view[i];
        console.log(i +  ' :::: ' + d + ' ===== ' + String.fromCharCode(d));
        res += String.fromCharCode(d);
    }
    console.log(res);
    return res;
}

function bufferToString(e){
    console.log('e');
    console.log(e);
    console.log('buffer: ' + e.buffer);
    console.log('byteOffset: ' + e.byteOffset);
    console.log('byteLength: ' + e.byteLength);
    
    var view = new Uint16Array(e);
    console.log(view);
    console.log('length:' +view.length);
    for (var i = 0; i < view.length; i++) {
        var d = view[i];
        console.log(i +  ' :::: ' + d + ' ===== ' + String.fromCharCode(d));
    }
    var t = new Uint16Array(e.buffer,e.byteOffset, e.byteLength / 2);
    console.log('t');
    console.log(t);
    console.log(t.length);
    var res = String.fromCharCode.apply(null,t);
    console.log('res');
    console.log(res);
    return res;
}


function sendCall(str){
    var header = createHeader([6, 2, 1, 0]);
    var d2 = stringToBuffer(header,'arsi');
    ws.send(d2);
}

function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        Materialize.toast('WebSocket is supported by your Browser and online!', 4000);
        // Let us open a web socket
        ws = new WebSocket("ws://10.211.159.40:12776/callapp");

        ws.binaryType = 'arraybuffer';

        ws.onopen = function()
        {
            $('#status_server').html('online').removeClass('red').addClass('green');
            // Web Socket is connected, send data using send()
            
            ws.binaryType = 'arraybuffer';
            //var arsi = b64DecodeUnicode('arsi');
            console.log('arsi');
            var arsi = 'arsi';
            console.log(arsi);
            
            var header = createHeader([3, 2, 255, 255]);
            var d2 = stringToBuffer(header,arsi);
            
            ws.send(d2);
            //ws.send('{"ev":"id","tipo":"viewer","cliente":"general"}', {binary: true, mask: true});
            //ws.send(JSON.stringify('{"cliente":"viewer"}'));
            //ws.send('viewer');
            Materialize.toast('Visualizador inicializado', 4000);

        };
        ws.onerror = function( err){
            console.log('err');
            console.log(err);
        }
        ws.onmessage = function (evt) 
        { 
            console.log('- - - - -- - - - - - - -');
            console.log(evt);
            var data = evt.data;
            console.log('=====================');
            console.log(data);
            console.log('********************');

            var datos = bufferToString(evt);
            //var json = JSON.parse(data);

            console.log(datos);
            console.log(datos.length);
            console.log(datos.buffer);

            console.log('- - - - -- - - - - - - -');
            
            $('#total_mensajes').html(parseInt($('#total_mensajes').html())+1);

        };
        
        ws.onclose = function()
        {
            $('#status_server').html('offline').removeClass('green').addClass('red');
          // websocket is closed.
          Materialize.toast('Visualizador desconetado del WebSocket!', 4000);
        };
            
       window.onbeforeunload = function(event) {
          ws.close();
       };
    }
    
    else
    {
       // The browser doesn't support WebSocket
       Materialize.toast('WebSocket NOT supported by your Browser!', 4000);
       $('#status_server').html('offline').removeClass('green').addClass('red');
    }
}

function WebSocketTest2()
{
    if ("WebSocket" in window)
    {
        Materialize.toast('WebSocket is supported by your Browser and online!', 4000);
        // Let us open a web socket
        ws = new WebSocket("ws://10.211.159.40:12776/callapp");

        ws.binaryType = 'arraybuffer';

        ws.onopen = function()
        {
            $('#status_server').html('online').removeClass('red').addClass('green');
            // Web Socket is connected, send data using send()
            
            ws.binaryType = 'arraybuffer';
            //var arsi = b64DecodeUnicode('arsi');
            console.log('arsi');
            var arsi = 'arsi';
            console.log(arsi);
            
            var header = createHeader([6, 2, 1, 0]);
            var d2 = stringToBuffer(header,arsi);
            
            ws.send(d2);
            //ws.send('{"ev":"id","tipo":"viewer","cliente":"general"}', {binary: true, mask: true});
            //ws.send(JSON.stringify('{"cliente":"viewer"}'));
            //ws.send('viewer');
            Materialize.toast('Visualizador inicializado', 4000);

        };
        ws.onerror = function( err){
            console.log('err');
            console.log(err);
        }
        ws.onmessage = function (evt) 
        { 
            console.log('- - - - -- - - - - - - -');
            console.log(evt);
            var data = evt.data;
            console.log('=====================');
            var b = msgToString(data);
            
            console.log('********************');

            //var json = JSON.parse(data);

            //var datos = bufferToString(evt);
            
            console.log('- - - - -- - - - - - - -');


            
            $('#total_mensajes').html(parseInt($('#total_mensajes').html())+1);

        };
        
        ws.onclose = function()
        {
            $('#status_server').html('offline').removeClass('green').addClass('red');
          // websocket is closed.
          Materialize.toast('Visualizador desconetado del WebSocket!', 4000);
        };
            
       window.onbeforeunload = function(event) {
          ws.close();
       };
    }
    
    else
    {
       // The browser doesn't support WebSocket
       Materialize.toast('WebSocket NOT supported by your Browser!', 4000);
       $('#status_server').html('offline').removeClass('green').addClass('red');
    }
}
setTimeout(function(){ 
    WebSocketTest();
}, 4000);
setTimeout(function(){ 
    ws.close();
}, 6000);
setTimeout(function(){
 WebSocketTest2() ;
}, 8000);

// Define peer connections, streams and video elements.
let remoteStream;
const remoteVideo = document.getElementById('remoteVideo');
let remotePeerConnection;


const servers = null; // Allows for RTC server configuration.

// Handles remote MediaStream success by adding it as the remoteVideo src.
function gotRemoteMediaStream(event) {
    const mediaStream = event.stream;
    remoteVideo.srcObject = mediaStream;
    remoteStream = mediaStream;
    trace('Remote peer connection received remote stream.');
}

remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);

remotePeerConnection = new RTCPeerConnection(servers);
trace('Created remote peer connection object remotePeerConnection.');

remotePeerConnection.addEventListener('icecandidate', handleConnection);
remotePeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);
remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);

