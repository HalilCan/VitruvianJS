let video;
let poseNet;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
    let torsoVec = torsoVector(pose);
    let shoulderVec = shoulderVector(pose);
    let upperArmVecs = upperArmVectors(pose);

    if (upperArmVecs[0] != undefined) {
        let rightAngle = upperArmToTorsoAngle(upperArmVecs[0], torsoVec);
        let leftAngle = upperArmToTorsoAngle(upperArmVecs[1], torsoVec);

        let rightAngle2 = upperArmToShoulderAngle(upperArmVecs[0], shoulderVec);
        /* if (relativePointOrientation(upperArmVecs[0], pose.rightShoulder)[1] == 2) {
            rightAngle2 = rightAngle2 + .5;
        } else {
            rightAngle2 = rightAngle2; 
        } */
        let leftAngle2 = upperArmToShoulderAngle(upperArmVecs[1], shoulderVec);

        
        updateAngleReporter(
            [rightAngle * 180 / Math.PI, leftAngle * 180 / Math.PI,
            (rightAngle2 + 0) * 180 / Math.PI, (leftAngle2 - 0) * 180 / Math.PI]
        );
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

