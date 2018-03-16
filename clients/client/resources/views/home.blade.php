@extends('template.base')


@section('css')
    <style type="text/css" media="screen">
        #map-canvas{
            width: 100%;
            min-height: 400px;
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
                        <span class="stats-counter"><span class="counter numero_plataformas" id="numero_plataformas">0</span><small>conectados</small></span>
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
                        <span class="stats-counter"><span class="counter numero_controladores" id="numero_controladores">0</span><small>conectados</small></span>
                    </div>
                    <div id="sparkline-line"></div>
                </div>
            </div>
        </div>
        <div class="row no-m-t no-m-b">
            <div class="col s12 m12 l8">
                <div class="card" style="min-height: 500px;">
                    <div class="card-content">
                        <div class="card-title">
                            <ul id="posiciones_controladores">
                                <li>
                                    <i class="material-icons">settings_remote</i>
                                    Latitud: <em class="lat">0</em> || Longitud: <em class="lng">0</em> || Altura: <em class="alt">0</em>
                                </li>
                                <li>
                                    <i class="material-icons">settings_remote</i>
                                    Latitud: <em class="lat">0</em> || Longitud: <em class="lng">0</em> || Altura: <em class="alt">0</em></li>
                            </ul>
                            <ul id="posiciones_plataformas">
                                <li>
                                    <i class="material-icons">my_location</i>
                                    Latitud: <em class="lat">0</em> || Longitud: <em class="lng">0</em> || Altura: <em class="alt">0</em>
                                </li>
                                <li>
                                    <i class="material-icons">my_location</i>
                                    Latitud: <em class="lat">0</em> || Longitud: <em class="lng">0</em> || Altura: <em class="alt">0</em></li>
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

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzjeZ1lORVesmjaaFu0EbYeTw84t1_nek"></script>

<script type="text/javascript" src="{{ asset('js/utils.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/websocket_client.js') }}"></script>
@endsection