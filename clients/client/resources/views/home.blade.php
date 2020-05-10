@extends('template.base')


@section('css')
    <style type="text/css" media="screen">
        #map-canvas{
            width: 100%;
            min-height: 350px;
            margin-top: 20px;            
            display: block;
        }
        #posiciones_controladores{
            float: left;
        }
        #posiciones_plataformas{
            float: right;
        }
    </style>
@endsection

@section('content')

<main class="mn-inner ">
    <div class="">
        <div class="row no-m-t no-m-b">
            <div class="col s12 m12 l8">
                <div class="card" style="min-height: 500px;">
                    <div class="card-content">
                        <div class="card-title">
                            <ul id="posiciones_controladores">
                                <li>
                                    <i class="material-icons">settings_remote</i>
                                    Latitud: <em id="lat">0</em> || Longitud: <em id="lng">0</em> || Altura: <em id="alt">0</em>
                                </li>
                            </ul>
                        </div>
                        <div  id="map-canvas">
                            
                        </div>
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
                        <div class="card-title">
                            Servidor<br>
                            <small id="url_websocket"></small>
                        </div>
                        <div class="server-load row">
                            <div class="server-stat col s4">
                                <p id="numero_controllers">0</p>
                                <span>Controllers</span>
                            </div>
                            <div class="server-stat col s4">
                                <p id="numero_plataformas">0</p>
                                <span>Platforms</span>
                            </div>
                            <div class="server-stat col s4">
                                <p id="numero_viewers">0</p>
                                <span>Viewers</span>
                            </div>
                        </div>
                        <div id="flotchart2"></div>
                    </div>
                </div>
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
        </div>
    </div>


</main>

@endsection

@section('js')

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDO40PjEqO8TpZyx1cfi8uS06MNRpAFTik"></script>

<script type="text/javascript" src="{{ asset('js/utils.js') }}"></script>

<!--<script type="text/javascript" src="{{ asset('js/webrtc_client.js') }}"></script>-->
<script type="text/javascript" src="{{ asset('js/websocket_client.js') }}"></script>
@endsection