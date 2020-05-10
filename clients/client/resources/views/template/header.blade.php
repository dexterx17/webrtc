<header class="mn-header navbar-fixed">
    <nav class="cyan darken-1">
        <div class="nav-wrapper row">
            <section class="material-design-hamburger navigation-toggle">
                <a href="javascript:void(0)" data-activates="slide-out" class="button-collapse show-on-large material-design-hamburger__icon">
                    <span class="material-design-hamburger__layer"></span>
                </a>
            </section>
            <div class="header-title col s3 m3">      
                <span class="chapter-title">ARSI</span>
            </div>
        </div>
    </nav>
</header>


<aside id="slide-out" class="side-nav white fixed">
    <div class="side-nav-wrapper">
        <div class="sidebar-profile">
            <div class="sidebar-profile-image">
                <img src="assets/images/profile-image.png" class="circle" alt="">
            </div>
            <div class="sidebar-profile-info">
                <a href="javascript:void(0);" class="account-settings-link">
                    <p>Web client</p>
                    <span>client@giarsi.com<i class="material-icons right">arrow_drop_down</i></span>
                </a>
            </div>
        </div>
        <div class="sidebar-account-settings">
            <ul>
                <li class="divider"></li>
                <li class="no-padding">
                    <a class="waves-effect waves-grey"><i class="material-icons">exit_to_app</i>Sign Out</a>
                </li>
            </ul>
        </div>
    <ul class="sidebar-menu collapsible collapsible-accordion" data-collapsible="accordion">
        <li class="no-padding active"><a class="waves-effect waves-grey active" href="{{ route('home') }}"><i class="material-icons">settings_input_svideo</i>Dashboard</a></li>
        <li class="no-padding active"><a class="waves-effect waves-grey active" href="{{ route('control-drone') }}"><i class="material-icons">settings_input_svideo</i>Control drone</a></li>
        <li class="no-padding active"><a class="waves-effect waves-grey active" href="{{ route('control-kunka') }}"><i class="material-icons">settings_input_svideo</i>Control kunk</a></li>
        <li class="no-padding active"><a class="waves-effect waves-grey active" href="{{ route('webrtc') }}"><i class="material-icons">settings_input_svideo</i>WebRtc</a></li>
        <li class="no-padding active"><a class="waves-effect waves-grey active" href="{{ route('webrtc_client') }}"><i class="material-icons">settings_input_svideo</i>Webrtc client</a></li>
        
    </ul>
    <div class="footer">
        <p class="copyright">Steelcoders ©</p>
        <a href="#!">Privacy</a> &amp; <a href="#!">Terms</a>
    </div>
    </div>
</aside>