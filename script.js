const video = document.getElementById("video")

Promise.all([
    faceapi.nets.faceExpressionNet.loadFromUri('Face-Expression-Detector-JS/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('Face-Expression-Detector-JS/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('Face-Expression-Detector-JS/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('Face-Expression-Detector-JS/models'),
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
    document.body.append(canvas)
    const displaySize = {width: video.width, height:video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections,displaySize)
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)


             // Overlaying the Information on the video

        faceapi.draw.drawDetections(canvas,resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas,resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas,resizedDetections)
    },100)
    
    
})
