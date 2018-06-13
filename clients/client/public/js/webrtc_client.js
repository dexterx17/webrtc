// Define peer connections, streams and video elements.
let remoteStream;
const remoteVideo = document.getElementById('remoteVideo');
let remotePeerConnection;


const servers = null; // Allows for RTC server configuration.

// Handles remote MediaStream success by adding it as the remoteVideo src.
function gotRemoteMediaStream(event) {
    const mediaStream = event.stream;
    remoteVideo.srcObject = mediaStream;
    remoteStream = mediaStream;
    trace('Remote peer connection received remote stream.');
}

remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);

remotePeerConnection = new RTCPeerConnection(servers);
trace('Created remote peer connection object remotePeerConnection.');

remotePeerConnection.addEventListener('icecandidate', handleConnection);
remotePeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);
remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);