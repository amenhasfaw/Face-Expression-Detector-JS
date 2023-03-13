const video = document.getElementById("video")


const Play = () => {
   navigator.getUserMedia(
    {video:{}, audio: false},
    stream => video.srcObject = stream,
    err => document.body.innerHTML = `
        <h3> ERROR! VIDEO PERMISSION DENIED. </h3>    
    `
   )
}

Play()
