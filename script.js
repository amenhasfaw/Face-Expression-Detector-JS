const video = document.getElementById("video")




const Play = () => {
   navigator.getUserMedia(
    {video:{}, audio: false},
    stream => video.srcObject = stream,
    err => console.error(err)
   )
}

Play()