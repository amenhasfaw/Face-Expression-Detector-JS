const video = document.getElementById("video")


Promise.all([
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(playVideo)


function playVideo(){
   navigator.getUserMedia(
    {video:{}, audio: false},
    stream => video.srcObject = stream,
    err => document.body.innerHTML = `
        <h3> ERROR! VIDEO PERMISSION DENIED. </h3>    
    `
   )
}