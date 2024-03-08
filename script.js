const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCall = document.getElementById('startCall');
const hangup = document.getElementById('hangup');

let localStream;
let pc1;

// Function to start the call
function startCallFunction() {
    // Add the local stream to the RTCPeerConnection
    localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
    // Create an offer and set it as the local description
    pc1.createOffer()
    .then(offer => {
        return pc1.setLocalDescription(offer);
    })
    .then(() => {
        // Send the local description to the remote peer (not implemented in this code)
    })
    .catch(error => {
        console.log('Error creating offer:', error);
    });
}

// Function to hang up the call
function hangupFunction() {
    pc1.close();
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
}

// Request access to the user's camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    // Set up the RTCPeerConnection
    setupPeerConnection();
})
.catch(error => {
    console.log('Error accessing user media:', error);
});

// Set up the RTCPeerConnection
function setupPeerConnection() {
    pc1 = new RTCPeerConnection();
    // Set up the RTCPeerConnection's onicecandidate event to handle ICE candidates
    pc1.onicecandidate = event => {
        if (event.candidate) {
            // Send the ICE candidate to the remote peer (not implemented in this code)
        }
    };
    // Set up the RTCPeerConnection's ontrack event to handle remote tracks
    pc1.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
}

// Set up the "startCall" button to start a call
startCall.addEventListener('click', startCallFunction);

// Set up the "hangup" button to hang up the call
hangup.addEventListener('click', hangupFunction);
