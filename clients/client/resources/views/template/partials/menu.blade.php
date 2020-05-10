<aside id="slide-out" class="side-nav white fixed">
    <div class="side-nav-wrapper">
        <div class="sidebar-profile">
            <div class="sidebar-profile-image">
                <img src="assets/images/profile-image.png" class="circle" alt="">
            </div>
            <div class="sidebar-profile-info">
                <a href="javascript:void(0);" class="account-settings-link">
                    <p>Visualizador</p>
                </a>
            </div>
        </div>
        <ul class="sidebar-menu collapsible collapsible-accordion" data-collapsible="accordion">
            <li class="no-padding @if(@$active_page=='home') active @endif"><a class="waves-effect waves-grey active" href="{{ route('home') }}"><i class="material-icons">settings_input_svideo</i>Dashboard</a></li>
            <li class="no-padding @if(@$active_page=='plataforma_kunka') active @endif" >
                <a class="collapsible-header waves-effect waves-grey"><i class="material-icons">my_location</i>Plataformas<i class="nav-drop-icon material-icons">keyboard_arrow_right</i></a>
                <div class="collapsible-body">
                    <ul>
                        <li class="@if(@$active_page=='plataforma_drone') active @endif"><a href="#">Drone</a></li>
                        <li class="@if(@$active_page=='plataforma_kunka') active @endif"><a href="#">Kunka</a></li>
                    </ul>
                </div>
            </li>
            <li class="no-padding @if(@$active_page=='control_drone') active @endif">
                <a class="collapsible-header waves-effect waves-grey"><i class="material-icons">settings_remote</i>Controladores<i class="nav-drop-icon material-icons">keyboard_arrow_right</i></a>
                <div class="collapsible-body">
                    <ul>
                        <li class="@if(@$active_page=='control_drone') active @endif"><a href="{{ route('control-drone') }}">Drone</a></li>
                        <li><a class="@if(@$active_page=='control_kunka') active @endif" href="{{ route('control-kunka') }}">Kunka</a></li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="footer">
            <p class="copyright">© <a href="http://www.giarsi.com">ARSI</a> -  <a href="#!">ESPE</a>  <small>Automatización, Robótica y Sistemas Inteligentes</small> </p>
        </div>
    </div>
</aside>