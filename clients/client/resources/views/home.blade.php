@extends('template.base')

@section('content')

<main class="mn-inner ">
    <div class="">
        <div class="row no-m-t no-m-b">
            <div class="col s12 m12 l6">
                <div class="card stats-card">
                    <div class="card-content">
                        <div class="card-options">
                            <ul>
                                <li><a href="javascript:void(0)"><i class="material-icons">more_vert</i></a></li>
                            </ul>
                        </div>
                        <span class="card-title">Plataformas
                        </span>
                        <span class="stats-counter"><span class="counter" id="numero_plataformas">0</span><small>conectados</small></span>
                    </div>
                    <div id="sparkline-bar"></div>
                </div>
            </div>
            <div class="col s12 m12 l6">
                <div class="card stats-card">
                    <div class="card-content">
                        <div class="card-options">
                            <ul>
                                <li><a href="javascript:void(0)"><i class="material-icons">more_vert</i></a></li>
                            </ul>
                        </div>
                        <span class="card-title">Controladores</span>
                        <span class="stats-counter"><span class="counter" id="numero_controladores">0</span><small>conectados</small></span>
                    </div>
                    <div id="sparkline-line"></div>
                </div>
            </div>
        </div>
        <div class="row no-m-t no-m-b">
            <div class="col s12 m12 l8">
                <div class="card visitors-card">
                    <div class="card-content">
                        <div class="card-options">
                            <ul>
                                <li><a href="javascript:void(0)" class="card-refresh"><i class="material-icons">refresh</i></a></li>
                            </ul>
                        </div>
                        <span class="card-title">Datos transmitidos<span class="secondary-title">Mensajes de estado vs Mensajes de control</span></span>
                        <div id="flotchart1"></div>
                    </div>
                </div>
            </div>
            <div class="col s12 m12 l4">
                <div class="card server-card">
                    <div class="card-content">
                    <div class="card-options">
                        <ul>
                            <li class="red-text"><span class="badge red lighten-3" id="status_server">offline</span></li>
                        </ul>
                    </div>
                        <span class="card-title">Servidor</span>
                        <div class="server-load row">
                            <div class="server-stat col s6">
                                <p id="numero_clientes">0</p>
                                <span>Clientes</span>
                            </div>
                            <div class="server-stat col s6">
                                <p id="total_mensajes">0</p>
                                <span>Mensajes</span>
                            </div>
                        </div>
                        <div id="flotchart2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</main>

@endsection

@section('js')

<script type="text/javascript">


    function WebSocketTest()
    {
        if ("WebSocket" in window)
        {
            Materialize.toast('WebSocket is supported by your Browser and online!', 4000);
            // Let us open a web socket
            var ws = new WebSocket("ws://10.211.159.62:9000/");
            
            ws.onopen = function()
            {
                $('#status_server').html('online').removeClass('red').addClass('green');
                // Web Socket is connected, send data using send()
                ws.send('{"cliente":"visualizador"}');
                //ws.send(JSON.stringify('{"cliente":"visualizador"}'));
                //ws.send('visualizador');
                Materialize.toast('Visualizador inicializado', 4000);
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

    setTimeout(function(){ WebSocketTest() }, 4000);
</script>
@endsection