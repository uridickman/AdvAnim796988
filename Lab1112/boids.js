function Boid(radius, x, y, vx, vy, maxVelocity, maxForce){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.steerVector = new JSVector();
  this.directionAtEdge = new JSVector();
  this.desired;
  this.maxVel = maxVelocity;
  this.maxForce = maxForce;
}

Boid.prototype.update = function(){
  this.loc.add(this.vel);
}

Boid.prototype.applyForce = function(vector){
  this.vel.limit(this.maxVel);
  this.vel.add(vector);

}

Boid.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width){
    this.desired = new JSVector(this.maxVel.x, -1*this.loc.y);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);
    this.steerVector.limit(this.maxForce);
    this.steerVector.setMagnitude(1);
  } else if(this.loc.x - this.radius < 0){
    this.desired = new JSVector(this.maxVel.x, this.loc.y);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);
    this.steerVector.limit(this.maxForce);
    this.steerVector.setMagnitude(1);
  }

  if(this.loc.y + this.radius > canvas.height){
    this.desired = new JSVector(this.maxVel.x, -1*this.loc.x);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);
    this.steerVector.limit(this.maxForce);
    this.steerVector.setMagnitude(1);
  } else if(this.loc.y - this.radius < 0){
    this.desired = new JSVector(this.maxVel.x, this.loc.x);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);
    this.steerVector.limit(this.maxForce);
    this.steerVector.setMagnitude(1);
  }
}

Boid.prototype.draw = function(){
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.fillStyle = 'rgb(255, 255, 255)';

  context.beginPath();
  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  context.stroke();
  context.fill();
}

Boid.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.applyForce(this.steerVector);
  this.draw();
}
