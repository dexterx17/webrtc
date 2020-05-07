var base_url = window.location.origin;
var app_url = base_url + '/web/clients/client/public/'

var map;
var trayectoria;
var route;
var marker;
var markers = [];

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

//Imagenes para mostrar los clientes en el mapa
var drone_image = app_url + 'img/dron.png';
var kunka_image = app_url + 'img/kunka.png';
var android_image = app_url + 'img/android.png';
var kunka_image = app_url + 'img/kunka.png';

var triangleCoords = [
    { lat: -0.935049, lng: -78.611000 },
    { lat: -0.935131, lng: -78.611500 },
    { lat: -0.935914, lng: -78.611374 },
    { lat: -0.935816, lng: -78.610865 }
];

$(document).ready(function() {
    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(-0.9357917, -78.6124162, 12),
            zoom: 18,
            mapTypeId: 'satellite',

        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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

function procesarMensaje(msg) {

}

function graficarRuta(puntos) {
    var coords = [];
    console.log('creando ruta');
    for (var i = 0; i < puntos.length; i++) {
        //var p = { lat: puntos[i].lat, lng: puntos[i].lng };
        var pos = new google.maps.LatLng({ lat: puntos[i].lat, lng: puntos[i].lng });
        coords.push(pos);
    }

    if (typeof route === "undefined") {
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
    } else {
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

function graficarTrayectoria() {
    // Define a symbol using SVG path notation, with an opacity of 1.
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
    };


}

function WebSocketTest() {
    if ("WebSocket" in window) {
        Materialize.toast('WebSocket is supported by your Browser and online!', 4000);
        // Let us open a web socket
        var ws = new WebSocket("ws://201.159.223.139:9001/");

        ws.onopen = function() {
            $('#status_server').html('online').removeClass('red').addClass('green');
            // Web Socket is connected, send data using send()
            console.log('envaiando...');
            console.log('{"ev":"id","tipo":"viewer","cliente":"general"}');
            ws.send('{"ev":"id","tipo":"viewer","cliente":"general"}');
            //ws.send(JSON.stringify('{"cliente":"viewer"}'));
            //ws.send('viewer');
            Materialize.toast('viewer inicializado', 4000);

        };

        ws.onmessage = function(evt) {
            var data = evt.data;

            console.log(evt);
            console.log('- - - - -- - - - - - - -');
            console.log(data);
            console.log('********************');

            var json = JSON.parse(data);

            console.log(json);
            console.log('- - - - -- - - - - - - -');

            //
            switch (json['ev']) {
                case MSG_IDENTIFICACION:
                    console.log('identificacion!!!');
                    $('#list-clientes-conectados').append(section_cliente(json));
                    break;
                case MSG_ESTADO_SERVIDOR:
                    console.log('stats server!!!');
                    $('#numero_clientes').html(json['n_clientes']);
                    $('#total_mensajes').html(json['n_mensajes']);
                    $('.numero_controladores').html(json['n_controladores']);
                    $('.numero_plataformas').html(json['n_plataformas']);
                    break;
                case MSG_LISTADO_CLIENTES:
                    console.log('list clients!!!');
                    var items = json['data']
                    break;
                case MSG_RUTA:
                    console.log('init RUTA');
                    graficarRuta(json['data']);
                    break;
                case MSG_DESCONEXION:
                    console.log('desconexion');
                    $item = $('#list-clientes-conectados').children('[id^="cliente' + json.id + '"]').fadeOut('slow');
                    break;
                case MSG_ESTADO:
                    var lat = parseFloat(json['lat']);
                    var lng = parseFloat(json['lng']);

                    var position = { lat: lat, lng: lng };
                    var pos = new google.maps.LatLng({ lat: lat, lng: lng });

                    console.log('position');
                    console.log(position);
                    if (typeof marker !== "undefined") {
                        marker.setPosition(position);
                        var path = trayectoria.getPath();
                        // Because path is an MVCArray, we can simply append a new coordinate
                        // and it will automatically appear.
                        path.push(pos);
                    } else {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: json['client'],
                            opacity: 0.8,
                            icon: drone_image
                        });
                        trayectoria = new google.maps.Polyline({
                            strokeColor: '#50FE99',
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });
                        trayectoria.setMap(map);
                    }

                    break;
                default:
                    console.log('***************ningun evento************');
                    console.log(json);
                    console.log('****************************************');
                    break;
            }

            $('#total_mensajes').html(parseInt($('#total_mensajes').html()) + 1);

        };

        ws.onclose = function() {
            alert('error');
            $('#status_server').html('offline').removeClass('green').addClass('red');
            // websocket is closed.
            Materialize.toast('viewer desconetado del WebSocket!', 4000);
        };

        window.onbeforeunload = function(event) {
            console.log('onbeforeunload....');
            ws.close();
        };
    } else {
        // The browser doesn't support WebSocket
        Materialize.toast('WebSocket NOT supported by your Browser!', 4000);
        $('#status_server').html('offline').removeClass('green').addClass('red');
    }
}

setTimeout(function() { WebSocketTest() }, 4000);