let video;
let poseNet;
let pose;
let skeleton;
let jitterRatio = 30;
let clapCount = 0;
let isClap = 0;

function setup() {
    let newCanvas = createCanvas(640, 480);
    newCanvas.parent("canvas-container");
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function isJitter(oldPose, newPose, ratio) {
    if (!oldPose || !newPose) {
        return false;
    }
    for (let key of Object.keys(oldPose)) {
        if (oldPose.key.x > 0) {
            if ((Math.abs(oldPose[key].x - newPose[key].x) > (oldPose[key].x / ratio)) ||
                (Math.abs(oldPose[key].y - newPose[key].y) > (oldPose[key].y / ratio))) {
                return false;
            }
        }
    }
    console.log(`jitter detected`);
    return true;
}

function correctJitter(oldPose, newPose, ratio) {
    if (!oldPose) {
        return newPose;
    }
    if (!newPose) {
        return oldPose;
    }
    let correctedPose = oldPose;

    for (let key of Object.keys(oldPose)) {
        if (oldPose[key].x > 0) {
            if ((Math.abs(oldPose[key].x - newPose[key].x) > (oldPose[key].x / ratio))) {
                correctedPose[key].x = newPose[key].x;
            }
            if ((Math.abs(oldPose[key].y - newPose[key].y) > (oldPose[key].y / ratio))) {
                correctedPose[key].y = newPose[key].y;
            }
        }
    }

    for (let i = 0; i < correctedPose.keypoints.length; i++) {
        if ((Math.abs(oldPose.keypoints[i].position.x - newPose.keypoints[i].position.x) > (oldPose.keypoints[i].position.x / ratio))) {
            correctedPose.keypoints[i].position.x = newPose.keypoints[i].position.x;
        }
        if ((Math.abs(oldPose.keypoints[i].position.y - newPose.keypoints[i].position.y) > (oldPose.keypoints[i].position.y / ratio))) {
            correctedPose.keypoints[i].position.y = newPose.keypoints[i].position.y;
        }
    }
    return correctedPose;
}

function gotPoses(poses) {
    console.log(poses);
    let tempPose;
    if (poses.length > 0) {
        tempPose = poses[0].pose;
    } else {
        return;
    }
    /*
    if (isJitter(pose, tempPose, jitterRatio) == true) {
        return;
    }*/

    pose = correctJitter(pose, tempPose, jitterRatio);
    skeleton = poses[0].skeleton;

    let angularPose = new AngularPose(pose);
    let jointAnglesString = angularPose.getPrintableJointAngles();
    updateAngleReporter(jointAnglesString);

    let clapResult = angularPose.clapRuleCheck(isClap);
    clapCount += clapResult.change;
    isClap = clapResult.state;
    if (clapResult.isTorsoUpright == 0) {
        updateRuleReporter([0, `X - Keep your torso upright when you bring your hands together. Fly count: ${clapCount}`]);
    } else {
        updateRuleReporter([1, `:) Please fly. Fly count: ${clapCount}`]);
    }

}

function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}

