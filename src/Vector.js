class Vector {
    constructor(x, y, z, confidence) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.confidence = confidence;
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
      return (this.x * v.x + this.y * v.y + this.z * v.z, 
        (this.confidence + v.confidence) / 2);
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
    projectionOnto(v) {
      return (this.dot(v) / v.norm());
      //this.dot(v) is |this||v|cosTheta
      //this projected onto v has magnitude |this|cosTheta and direction v * sign(cosTheta)
    }
  }