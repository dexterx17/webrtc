<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Teleoperacion</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link type="text/css" rel="stylesheet" href="{{ asset('assets/plugins/materialize/css/materialize.min.css') }}"/>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">    
        <link href="{{ asset('assets/plugins/metrojs/MetroJs.min.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/plugins/weather-icons-master/css/weather-icons.min.css') }}" rel="stylesheet">

            
        <!-- Theme Styles -->
        <link href="{{ asset('assets/css/alpha.min.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('assets/css/custom.css') }}" rel="stylesheet" type="text/css"/>
   
        <!-- Styles -->
        @yield('css')
    </head>
    <body>
        @include('template.loader')
        <div class="mn-content fixed-sidebar">
            @include('template.header')

            @yield('content')
        </div>
        
        <!-- Javascripts -->
        <script src="{{ asset('assets/plugins/jquery/jquery-2.2.0.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/materialize/js/materialize.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/material-preloader/js/materialPreloader.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/jquery-blockui/jquery.blockui.js') }}"></script>
        <script src="{{ asset('assets/plugins/waypoints/jquery.waypoints.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/counter-up-master/jquery.counterup.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/jquery-sparkline/jquery.sparkline.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/chart.js/chart.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/flot/jquery.flot.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/flot/jquery.flot.time.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/flot/jquery.flot.symbol.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/flot/jquery.flot.resize.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/flot/jquery.flot.tooltip.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/curvedlines/curvedLines.js') }}"></script>
        <script src="{{ asset('assets/plugins/peity/jquery.peity.min.js') }}"></script>
        <script src="{{ asset('assets/js/alpha.min.js') }}"></script>
        @yield('js')
    </body>
</html>