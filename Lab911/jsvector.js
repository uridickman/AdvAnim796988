
// JSVector -- a Javascript 2D vector class

// The class constructor
function JSVector(x = 0, y = 0){
  this.x = x;
  this.y = y;
}

// Set the magnitude of the vector,
// retaining the angle (direction).
JSVector.prototype.setMagnitude = function(mag){
  var angle = this.getDirection();

  this.x = Math.cos(angle)*mag;
  this.y = Math.sin(angle)*mag;

  return this;
}

// Get the magnitude of the vector using pythagorean theorem
JSVector.prototype.getMagnitude = function(){
  return (Math.sqrt((this.x*this.x)+(this.y*this.y)));
 }

// Set the angle (direction) of the vector,
// retaining the magnitude.
JSVector.prototype.setDirection = function(angle){
  var mag = this.getMagnitude();

  this.x = Math.cos(angle)*mag;
  this.y = Math.sin(angle)*mag;

  return this;
}

// Get the direction (angle) of the vector
JSVector.prototype.getDirection = function(){
  return Math.atan2(this.y, this.x);
}

// Add another vector to this vector
JSVector.prototype.add = function(v2){
  this.x = this.x + v2.x;
  this.y = this.y + v2.y;
}

// Subtract another vector from this vector
JSVector.prototype.sub = function(v2){
  this.x = this.x - v2.x;
  this.y = this.y - v2.y;
}

// Class method to return a new vector that is the sum of two vectors
JSVector.addGetNew = function(v1,v2){
  var newVector = new JSVector(v1.x + v2.x, v1.y + v2.y);
  return newVector;
}

// Class method to return a new vector that is the difference of two vectors
JSVector.subGetNew = function(v1,v2){
  var newVector = new JSVector(v1.x - v2.x, v1.y - v2.y);
  return newVector;
}

// Multiply this vector by a scalar
JSVector.prototype.multiply = function(scalar){
  var s = scalar;
  this.x = s*this.x;
  this.y = s*this.y;
  return this;
}

// Divide this vector by a scalar
JSVector.prototype.divide = function(scalar){
  var s = scalar;
  this.x = this.x/s;
  this.y = this.y/s;
  return this;
}

// Normalize this vector so that it has a magnitude of 1
JSVector.prototype.normalize = function(){
  var mag = this.getMagnitude();
  if(mag!=0){
    this.divide(mag);
  }
  return this;
}

// Limit the magnitude of this vector
JSVector.prototype.limit = function(lim){
  var mag = this.getMagnitude();
  if(mag>lim){
    this.setMagnitude(lim);
  }
  return this;
}

// Get the distance between this vector and another one
JSVector.prototype.distance = function(v2){
  return Math.sqrt((this.x-v2.x)*(this.x-v2.x)+(this.y-v2.y)*(this.y-v2.y));
}

// Get square of the distance between this vector and another one
JSVector.prototype.distanceSquared = function(v2){
  return this.distance(v2)*this.distance(v2);
}

//Get the dot product of this vector and another one
JSVector.prototype.dot = function(v1, v2){
  return v1.x*v2.x + v1.y*v2.y;
}

// Rotate this vector by some number of radians
// using the rotation matrix |  cos   -sin  |
//                           |  sin   +cos  |
JSVector.prototype.rotate = function(angle) {
  var tempX = this.x;
  this.x = Math.cos(angle)*(this.x)-Math.sin(angle)*(this.y);
  this.y = Math.sin(angle)*(tempX)+Math.cos(angle)*(this.y);

  return this;
}

// Get the angle between this vector and another one
JSVector.prototype.angleBetween = function(v1, v2){
  var mag1 = v1.getMagnitude();
  var mag2 = v2.getMagnitude();

  return Math.acos(this.dot(v1, v2)/(mag1*mag2));
}

// Make a copy of this vector
JSVector.prototype.copy = function(){
  var copyVector = new JSVector(this.x, this.y);
  return copyVector;
}

// Override inherited toString() to describe this instance
JSVector.prototype.toString = function() {
  return "[x, y] = [" + this.x + ", " + this.y + "]\n[r, theta] = [" + this.getMagnitude() + ", " + this.getDirection() + "]";
}
