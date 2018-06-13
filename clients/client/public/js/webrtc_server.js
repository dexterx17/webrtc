'use strict';

var constraints = {
    video: true
};

// Set up to exchange only video.
const offerOptions = {
    offerToReceiveVideo: 1,
};

// Define peer connections, streams and video elements.
const localVideo = document.getElementById('localVideo');
let localStream;
let localPeerConnection;

let videoTracks;
let audioTracks;

const servers = null; // Allows for RTC server configuration.

// Define RTC peer connection behavior.

// Connects with new peer candidate.
function handleConnection(event) {
    const peerConnection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
        const newIceCandidate = new RTCIceCandidate(iceCandidate);
        const otherPeer = getOtherPeer(peerConnection);

        otherPeer.addIceCandidate(newIceCandidate)
            .then(() => {
                handleConnectionSuccess(peerConnection);
            }).catch((error) => {
                handleConnectionFailure(peerConnection, error);
            });

        trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
            `${event.candidate.candidate}.`);
    }
}

// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
    trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
    trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n` +
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
    const peerConnection = event.target;
    console.log('ICE state change event: ', event);
    trace(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}


// MediaStreams callbacks.

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(stream) {
    localVideo.srcObject = stream;
    localStream = stream;
    trace('Received local stream.');
    // Get local media stream tracks.
    videoTracks = localStream.getVideoTracks();
    audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
        trace(`Using video device: ${videoTracks[0].label}.`);
    }
    if (audioTracks.length > 0) {
        trace(`Using audio device: ${audioTracks[0].label}.`);
    }

    // Create peer connections and add behavior.
    localPeerConnection = new RTCPeerConnection(servers);
    trace('Created local peer connection object localPeerConnection.');

    localPeerConnection.addEventListener('icecandidate', handleConnection);
    localPeerConnection.addEventListener(
        'iceconnectionstatechange', handleConnectionChange);

    // Add local stream to connection and create offer to connect.
    localPeerConnection.addStream(localStream);
    trace('Added local stream to localPeerConnection.');

    trace('localPeerConnection createOffer start.');
    localPeerConnection.createOffer(offerOptions)
        .then(createdOffer).catch(setSessionDescriptionError);
}

// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
    trace(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
    const peerName = getPeerName(peerConnection);
    trace(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
    setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
    setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description) {
    trace(`Offer from localPeerConnection:\n${description.sdp}`);

    trace('localPeerConnection setLocalDescription start.');
    localPeerConnection.setLocalDescription(description)
        .then(() => {
            setLocalDescriptionSuccess(localPeerConnection);
        }).catch(setSessionDescriptionError);

    trace('remotePeerConnection setRemoteDescription start.');
    remotePeerConnection.setRemoteDescription(description)
        .then(() => {
            setRemoteDescriptionSuccess(remotePeerConnection);
        }).catch(setSessionDescriptionError);

    trace('remotePeerConnection createAnswer start.');
    remotePeerConnection.createAnswer()
        .then(createdAnswer)
        .catch(setSessionDescriptionError);
}

function handleLocalMediaStreamError(error) {
    trace(`navigator.getUserMedia error: ${error.toString()}.`);
}

localVideo.addEventListener('loadedmetadata', logVideoLoaded);

navigator.mediaDevices.getUserMedia(constraints).
then(gotLocalMediaStream).catch(handleLocalMediaStreamError);