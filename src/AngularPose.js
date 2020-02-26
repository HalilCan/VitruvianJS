class AngularPose {
    constructor(pose) {
        this.pose = pose;

        this.v_torsoNormal = this.torsoVector();
        this.v_leftUpperArm = upperArmVectorArray[1];
        this.v_leftForeArm = this.getVectorFromPoints(`leftElbow`, `leftWrist`);
        this.v_rightUpperArm = upperArmVectorArray[0];
        this.v_rightForeArm = this.getVectorFromPoints(`rightElbow`, `rightWrist`);
        this.v_rightToLeftShoulder = this.shoulderVector();
        this.v_rightToLeftHips = this.getVectorFromPoints(`rightHip`, `leftHip`);

        console.log(`GVFP comparison: ${upperArmVectorArray[0]} vs ${this.getVectorFromPoints("rightShoulder", "rightElbow")}`);

        this.angles = {
            rightShoulder: -1,
            rightElbow: -1,
            leftShoulder: -1,
            leftElbow: -1,
            torso: -1,
        }
    }

    generateAngles() {
        let pose = this.pose;

    }

    torsoVector() {
        if (this.pose) {
            let xTop = ((this.pose.leftShoulder.x + this.pose.rightShoulder.x) / 2);
            let yTop = ((this.pose.leftShoulder.y + this.pose.rightShoulder.y) / 2);
            let topConf = ((this.pose.rightShoulder.confidence + this.pose.leftShoulder.confidence) / 2);
            let top = new Vector(xTop, yTop, 0, topConf);

            let xBot = ((this.pose.leftHip.x + this.pose.rightHip.x) / 2);
            let yBot = ((this.pose.leftHip.y + this.pose.rightHip.y) / 2);
            let botConf = ((this.pose.rightHip.confidence + this.pose.leftHip.confidence) / 2);
            let bot = new Vector(xBot, yBot, 0, botConf);

            return bot.subtract(top);
        } else {
            return -1;
        }
    }

    shoulderVector() {
        if (this.pose) {
            let rsObj = this.pose.rightShoulder;
            let rShoulder = new Vector(
                rsObj.x, rsObj.y, 0, rsObj.confidence
            )

            let lsObj = this.pose.leftShoulder;
            let lShoulder = new Vector(
                lsObj.x, lsObj.y, 0, lsObj.confidence
            )

            return lShoulder.subtract(rShoulder);
        } else {
            return -1;
        }
    }

    upperArmVectors() {
        if (this.pose) {
            let rsObj = this.pose.rightShoulder;
            let rShoulder = new Vector(
                rsObj.x, rsObj.y, 0, rsObj.confidence
            )
            let relbowObj = this.pose.rightElbow;
            let rElbow = new Vector(
                relbowObj.x, relbowObj.y, 0, relbowObj.confidence
            )
            let rArm = rElbow.subtract(rShoulder);


            let lsObj = this.pose.leftShoulder;
            let lShoulder = new Vector(
                lsObj.x, lsObj.y, 0, lsObj.confidence
            )
            let lelbowObj = this.pose.leftElbow;
            let lElbow = new Vector(
                lelbowObj.x, lelbowObj.y, 0, lelbowObj.confidence
            )
            let lArm = lElbow.subtract(lShoulder);
            return [rArm, lArm];
        } else {
            return [-1, -1];
        }
    }

    getVectorFromPoints(firstPointName, secondPointName) {
        if (this.pose) {
            let firstPointObj = this.pose[firstPointName];
            let firstPointVector = new Vector(
                firstPointObj.x, firstPointObj.y, 0, firstPointObj.confidence
            )
            let secondPointObj = this.pose[secondPointName];
            let secondPointVector = new Vector(
                secondPointObj.x, secondPointObj.y, 0, secondPointObj.confidence
            )
            let finalVector = secondPointVector.subtract(firstPointVector);

            return finalVector;
        } else {
            console.log(`GVFP error`);
            return -1;
        }
    }
}