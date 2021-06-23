const WIDTH = 1000;
const HEIGHT = 1000;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;
let analizer;

function handleError(err) {
    console.log('You must give access to your mic in order to proceed.')
}

async function getAudio() {
    const stream = await navigator.mediaDevices
        .getUserMedia({ audio: true})
        .catch(handleError);
    const audioCtx = new AudioContext();
    analizer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analizer);

    // How much data do we want to collect?
    analizer.fftSize = 2 ** 10;

    // pull the data off the audio
    const timeData = new Uint8Array(analizer.frequencyBinCount);
    const frequencyData = new Uint8Array(analizer.frequencyBinCount)

    drawTimeData(timeData);
    // console.log(timeData);
};

function drawTimeData(timeData) {
    console.log(timeData);
    // call itself as soon as possible
    requestAnimationFrame(() => drawTimeData(timeData));
};

getAudio();