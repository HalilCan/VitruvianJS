/** GLOBALS AND CONSTANTS **/
let preview;
let recording;
let startButton;
let stopButton;
let downloadButton;
let uploadedVideo;
let uploadButton;
let logElement;
let recordingTimeMS = 5000;
/////////////////////////////

function log(msg) {
    logElement.innerHTML += msg + "\n";
}

function wait(delayInMS) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
}

function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();
    log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...");

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
        () => recorder.state == "recording" && recorder.stop()
    );

    return Promise.all([
        stopped,
        recorded
    ])
        .then(() => data);
}

function stop(stream) {
    stream.getTracks().forEach(track => track.stop());
}

function setStartButtonAsRecorder() {
    startButton.addEventListener("click", function () {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(stream => {
            preview.srcObject = stream;
            downloadButton.href = stream;
            preview.captureStream = preview.captureStream || preview.mozCaptureStream;
            return new Promise(resolve => preview.onplaying = resolve);
        }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
            .then(recordedChunks => {
                let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                recording.src = URL.createObjectURL(recordedBlob);
                downloadButton.href = recording.src;
                downloadButton.download = "RecordedVideo.webm";

                log("Successfully recorded " + recordedBlob.size + " bytes of " +
                    recordedBlob.type + " media.");
            })
            .catch(log);
    }, false);
}

function setStopButton() {
    stopButton.addEventListener("click", function () {
        stop(preview.srcObject);
    }, false);
}

function setUploadButton() {
    
}

window.addEventListener('load',
    () => {
        preview = document.getElementById("preview");
        recording = document.getElementById("recording");
        startButton = document.getElementById("startButton");
        stopButton = document.getElementById("stopButton");
        uploadButton = document.getElementById("uploadButton");
        uploadedVideo = document.getElementById("uploaded");
        downloadButton = document.getElementById("downloadButton");
        logElement = document.getElementById("log");

        setStartButtonAsRecorder();
        setStopButton();
        setUploadButton();

    }, false);
