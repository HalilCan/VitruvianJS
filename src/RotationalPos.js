class RotationalPos {
    constructor(node1, node2, normalVector) {
        this.normalVector = normalVector;
        this.vector1 = new Vector(node1.x, node1.y, node1.z, node1.confidence);
        this.vector2 = new Vector(node2.x, node2.y, node2.z, node2.confidence);
        this.freeVector = this.vector2.subtract(this.vector1);
        this.radAngle = Math.acos((this.freeVector.dot(this.normalVector)) /
            (this.freeVector.norm() * this.normalVector.norm()));
    }

    getAngle() {
        return this.radAngle;
    }
}