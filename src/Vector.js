class Vector {
    constructor(x, y, z, confidence) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.confidence = confidence;
    }
    equals(some) {
      if (some.x != undefined) {
        return (
          this.x == some.x &&
          this.y == some.y &&
          this.z == some.z &&
          this.confidence == some.confidence
        )
      } else {
        return this.x == undefined;
      }
    }
    add(v) {
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z, 
        (this.confidence + v.confidence) / 2);
    }
    subtract(v){
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z, 
        (this.confidence + v.confidence) / 2);
    }
    scale(scalar) {
      return new Vector(this.x * scalar, this.y * scalar, this.z * scalar, 
        this.confidence);
    }
    norm(){
      return Math.sqrt(this.dot(this));
    }
    unitVec(){
      let norm = this.norm();
      return new Vector(this.x / norm, this.y / norm, this.z / norm,
        this.confidence);
    }
    dot(v){
      return (this.x * v.x + this.y * v.y + this.z * v.z);
      //equivalent to |this||v|cosTheta
    }
    cross(v) {
      return new Vector(
        this.y * v.z - this.z - v.y,
        this.x * v.z - this.z * v.x,
        this.x * v.y - this.y * v.x,
        (this.confidence + v.confidence) / 2
      );
    }
    twoDimensionalOrthoVector() {
      return this.cross(new Vector(0, 0, 1, this.confidence));
    }
    invert() {
      return new Vector(-this.x, -this.y, -this.z, this.confidence);
    }
    projectionOnto(v) {
      return (this.dot(v) / v.norm());
      //this.dot(v) is |this||v|cosTheta
      //this projected onto v has magnitude |this|cosTheta and direction v * sign(cosTheta)
    }
  }