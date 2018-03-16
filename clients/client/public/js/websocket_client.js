var base_url = window.location.origin;
var app_url = base_url + '/web/clients/client/public/'

var map;
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

//Imagenes para mostrar los clientes en el mapa
var drone_image = app_url + 'img/drone.png';
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

        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            //fillColor: '#FF0000',
            fillOpacity: 0
        });
        bermudaTriangle.setMap(map);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});

function procesarMensaje(msg){

}
function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        Materialize.toast('WebSocket is supported by your Browser and online!', 4000);
        // Let us open a web socket
        var ws = new WebSocket("ws://10.211.159.20:9000/");
        
        ws.onopen = function()
        {
            $('#status_server').html('online').removeClass('red').addClass('green');
            // Web Socket is connected, send data using send()
            ws.send('{"ev":"id","tipo":"visualizador","cliente":"general"}');
            //ws.send(JSON.stringify('{"cliente":"visualizador"}'));
            //ws.send('visualizador');
            Materialize.toast('Visualizador inicializado', 4000);

        };
        
        ws.onmessage = function (evt) 
        { 
            var data = evt.data;

            console.log('- - - - -- - - - - - - -');
            console.log(data);
            console.log('********************');

            var json = JSON.parse(data);

            console.log(json);
            console.log('- - - - -- - - - - - - -');

            //
            switch(json['ev']){
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
                case MSG_DESCONEXION:
                    console.log('desconexion');
                    $item = $('#list-clientes-conectados').children('[id^="cliente'+json.id+'"]').fadeOut('slow');
                break;
                case MSG_ESTADO:
                    var lat = parseFloat(json['lat']);
                    var lng = parseFloat(json['lng']);

                    if( typeof marker !== "undefined" ){
                        marker.setPosition({ lat : lat, lng : lng });
                    }else{
                        marker = new google.maps.Marker({
                            position: { lat : lat, lng : lng },
                            map: map,
                            title: json['client'],
                            icon: drone_image
                          });
                    }
                
                break;
                default:
                    console.log('***************ningun evento************');
                    console.log(json);
                    console.log('****************************************');
                break;
            }
            
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

setTimeout(function(){ WebSocketTest() }, 4000);