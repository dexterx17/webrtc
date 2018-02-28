@extends('template.base')

@section('user_type','Controlador')

@section('css')
    <style type="text/css" media="screen">
        #map-canvas{
            width: 100%;
            height: 300px;
        }
    </style>
@endsection

@section('content')

<main class="mn-inner">
    <div class="">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Controlador DRONE</div>
            </div>
        </div>
        <div class="row no-m-t no-m-b">
            <div class="col s6 m6 l6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Instrucciones de control para drone</span><br>
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="roll" type="text" class="validate" required>
                                        <label for="roll">Roll</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input id="pitch" type="text" class="validate" required>
                                        <label for="pitch">Pitch</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="yaw" type="text" class="validate" required>
                                        <label for="yaw">Yaw</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input id="thruttle" type="text" class="validate" required>
                                        <label for="thruttle">Thruttle</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <a class="waves-effect waves-light btn" id="btn-send-data" disabled>Enviar</a>
                                </div>
                            </form>
                        </div>
                        <div id="flotchart2"></div>
                        <div id="flotchart1"></div>
                    </div>
                </div>
                
            </div>
            <div class="col s6 m6 l6">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="assets/images/card-image2.jpg" alt="">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator">DRONE DATA</span>
                        <div class="card-options">
                            <ul>
                                <li class="red-text"><span class="badge red lighten-3" id="status_server">offline</span></li>
                            </ul>
                        </div>
                        <div class="server-load row">
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>Yaw</span>
                            </div>
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>Pitch</span>
                            </div>
                            <div class="server-stat col s4">
                                <p id="numero_clientes">0</p>
                                <span>Roll</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card server-card">
                    <div class="card-content">
                        <div class="card-options">
                            <ul>
                                <li class="red-text"><span class="badge red lighten-3" id="status_server">offline</span></li>
                            </ul>
                        </div>
                        <span class="card-title">DRONE LOCATION</span>
                        <div class="server-load row">
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>Latitud</span>
                            </div>
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>Longitud</span>
                            </div>
                            <div class="server-stat col s4">
                                <p id="numero_clientes">0</p>
                                <span>Altura</span>
                            </div>
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>X</span>
                            </div>
                            <div class="server-stat col s4">
                                <p>0</p>
                                <span>Y</span>
                            </div>
                            <div class="server-stat col s4">
                                <p id="numero_clientes">0</p>
                                <span>Z</span>
                            </div>
                        </div>
                        <div  id="map-canvas"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</main>

@endsection

@section('js')

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzjeZ1lORVesmjaaFu0EbYeTw84t1_nek"></script>

<script type="text/javascript">

    var ws;

    function WebSocketTest()
    {
        if ("WebSocket" in window)
        {
            Materialize.toast('WebSocket is supported by your Browser!', 4000);
            // Let us open a web socket
            ws = new WebSocket("ws://10.211.159.163:9000/");
            
            ws.onopen = function()
            {
                $('#status_server').html('online').removeClass('red').addClass('green');
                $('#btn-send-data').removeAttr('disabled');
                // Web Socket is connected, send data using send()
                //ws.send('{ "cliente" : "visualizador" }');
                ws.send('{"cliente":"controlador"}');
                Materialize.toast('Online & Visualizador inicializado', 4000);
            };
            
            ws.onmessage = function (evt) 
            { 
                var data = evt.data;

                //console.log('- - - - -- - - - - - - -');
                //console.log(data);
                //console.log('********************');

                var json = JSON.parse(data);

                //console.log(json);
                //console.log('- - - - -- - - - - - - -');

                if( typeof json['n_clientes'] !== "undefined" ){
                    $('#numero_clientes').html(json['n_clientes']);
                    $('#total_mensajes').html(json['n_mensajes']);
                }else if(typeof json['connected'] !== "undefined") {
                    $('#list-clientes-conectados').append(section_cliente(json));
                }else if(typeof json['disconnected'] !== "undefined") {
                    $item = $('#list-clientes-conectados').children('[id^="cliente'+json.ip+'"]').fadeOut('slow');
                }else{
                    console.log(json);
                }
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

    $(document).on('click','#btn-send-data',function(){
        if( typeof ws!== "undefined" ){
            var roll = $('#roll').val();
            var pitch = $('#pitch').val();
            var yaw = $('#yaw').val();
            var thruttle = $('#thruttle').val();

            var instruccion ='{"roll":"' + roll + '","pitch":"' + pitch + '","yaw":"' + yaw + '","thruttle":"' + thruttle +'"}';
            console.log(instruccion);
            ws.send(instruccion);
            //ws.send();
        }
    });

    setTimeout(function(){ WebSocketTest() }, 1000);

    $( document ).ready(function() {
        function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(-0.9357917,-78.6124162,12),
                zoom: 18
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions); 
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        
    });
</script>
@endsection