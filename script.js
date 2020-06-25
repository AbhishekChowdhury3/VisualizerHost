var a = "outside";
function playBoth()
{
    playMusic();
    playAudio();
}
//For Microphone
function playMusic()
{
var myanimationClass = document.getElementById("animation-frame2").classList;

 navigator.getUserMedia({ audio: true, video: false }, gotAudio, notGotAudio);


function gotAudio(stream) {
    console.log("voice mic");
    var context = new AudioContext();
    var microphone = context.createMediaStreamSource(stream);
    var analyser = context.createAnalyser();

    microphone.connect(analyser);

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    function draw() {
        if (myanimationClass.contains("show-animation2")) {
            myanimationClass.remove("show-animation2");
        }

        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * 640 / 2;
            // change y value for voice noise/sensitivity
            if (y > 360) {
                if (!myanimationClass.contains("show-animation2")) {
                    myanimationClass.add("show-animation2");
                }
            }
        }
    };
    draw();
}
}

function notGotAudio(stream) {
    console.log("SOme error occured : ", stream)
}


// For Mp3 file
function playAudio()
{
    var myanimationClass = document.getElementById("animation-frame").classList;

    var audio = new Audio();
    audio.src = 'hello_moto.mp3';
    audio.controls = true;
    audio.autoplay = true;
    console.log("audio mp3");
    var context = new AudioContext();
    var analyser = context.createAnalyser();
    var source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);


    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    function draw() {
        if (myanimationClass.contains("show-animation")) {
            myanimationClass.remove("show-animation");
        }

        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        var x = 0;
      
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * 640 / 2;
            if (y > 360) {
                if (!myanimationClass.contains("show-animation")) {
                    myanimationClass.add("show-animation");
                }
            }
        }
    };
    draw();
}
