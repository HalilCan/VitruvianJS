let generateSkeleton = (poseObject) => {

};

let generateLimb = (keyPointOne, keyPointTwo) => {
    return {
        x1: keyPointOne.x,
        x2: keyPointTwo.x,
        y1: keyPointOne.y,
        y2: keyPointTwo.y,
        confidence: Math.min([keyPointOne.confidence, keyPointTwo.confidence])
    }
};

let upperArmToTorsoAngle = (upperArmVector, torsoVector) => {
    return Math.acos(upperArmVector.dot(torsoVector) / 
        (upperArmVector.norm() * torsoVector.norm()));
};

let upperArmVectors = (poseObj) => {
    let rsObj = poseObj.rightShoulder;
    let rShoulder = new Vector(
        rsObj.x, rsObj.y, 0, rsObj.confidence
    )
    let relbowObj = poseObj.rightElbow;
    let rElbow = new Vector(
        relbowObj.x, relbowObj.y, 0, relbowObj.confidence
    )
    let rArm = rElbow.subtract(rShoulder);


    let lsObj = poseObj.leftShoulder;
    let lShoulder = new Vector(
        lsObj.x, lsObj.y, 0, lsObj.confidence
    )
    let lelbowObj = poseObj.leftElbow;
    let lElbow = new Vector(
        lelbowObj.x, lelbowObj.y, 0, lelbowObj.confidence
    )
    let lArm = lElbow.subtract(lShoulder);
    return [rArm, lArm];
};

let generateLimbVector = (kpOne, kpTwo) => {

};

let torsoVector = (poseObj) => {
    let xTop = ((poseObj.leftShoulder.x + poseObj.rightShoulder.x) / 2);
    let yTop = ((poseObj.leftShoulder.y + poseObj.rightShoulder.y) / 2);
    let topConf = ((poseObj.rightShoulder.confidence + poseObj.leftShoulder.confidence) / 2);
    let top = new Vector(xTop, yTop, 0, topConf);
    console.log("torso top vector", top);
    let xBot = ((poseObj.leftHip.x + poseObj.rightHip.x) / 2);
    let yBot = ((poseObj.leftHip.y + poseObj.rightHip.y) / 2);
    let botConf = ((poseObj.rightHip.confidence + poseObj.leftHip.confidence) / 2);
    let bot = new Vector(xBot, yBot, 0, botConf);
    console.log("torso bot vector", bot);
    return bot.subtract(top);
};

let shoulderVector = (poseObj) => {
    let rsObj = poseObj.rightShoulder;
    let rShoulder = new Vector(
        rsObj.x, rsObj.y, 0, rsObj.confidence
    )

    let lsObj = poseObj.leftShoulder;
    let lShoulder = new Vector(
        lsObj.x, lsObj.y, 0, lsObj.confidence
    )

    return rShoulder.subtract(lShoulder);
};

let relativePointOrientation = (p1, p2) => {
    let xOrient;
    let yOrient;
    if (p1.x > p2.x) {
        xOrient = 1;
    } else {
        xOrient = 2;
    }
    if (p1.y > p2.y) {
        yOrient = 1;
    } else {
        yOrient = 2;
    }
    return [xOrient, yOrient];
}

let upperArmToShoulderAngle = (upperArmVector, shoulderVector) => {
    return Math.acos(upperArmVector.dot(shoulderVector) / 
        (upperArmVector.norm() * shoulderVector.norm()));
};
