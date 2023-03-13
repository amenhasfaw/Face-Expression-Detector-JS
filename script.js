const video = document.getElementById("video")
const body = document.getElementById("body")


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


video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        console.log(detections)
    },100)
    
    
})