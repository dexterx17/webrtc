@extends('template.base')


@section('css')
    <style type="text/css" media="screen">
        /*video {
            max-width: 100%;
            width: 320px;
        }*/
        /*video {
            filter: blur(4px) invert(1) opacity(0.5);
            }
        video {
            filter: hue-rotate(180deg) saturate(200%);
        }*/
    </style>
@endsection

@section('content')

<main class="mn-inner ">
    <div class="">
        <div class="row no-m-t no-m-b">
            <div class="col s12 m12 l6">
                <video autoplay id="localVideo"></video>
            </div>
        </div>
    </div>
</main>

@endsection

@section('js')
<script src="{{ asset('js/webrtc_utils.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/webrtc_server.js') }}" type="text/javascript"></script>
@endsection