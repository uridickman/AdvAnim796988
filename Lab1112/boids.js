function Boid(radius, x, y, vx, vy, maxVelocity, maxForce){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.steerVector;
  this.desired;
  this.maxVel = maxVelocity;
  this.maxForce = maxForce;
}

Boid.prototype.update = function(){
  this.loc.add(this.vel);
}

Boid.prototype.applyForce = function(vector){
  this.vel.add(vector);
}

Boid.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width - 25){
    this.desired = new JSVector(-1*this.maxSpeed, this.vel.y);
    this.desired.normalize();
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);
    this.steerVector.normalize();
    this.steerVector.multiply(.05);

    // this.steerVector.limit(this.maxForce);
    this.applyForce(this.steerVector);
  }

  if(this.loc.x < 25){
    this.desired = new JSVector(this.vel.x, this.vel.y);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);

    this.steerVector.limit(this.maxForce);
    this.applyForce(this.steerVector);
  }

  if(this.loc.y > canvas.height - 25){
    this.desired = new JSVector(this.vel.x, -1*this.vel.y);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);

    this.steerVector.limit(this.maxForce);
    this.applyForce(this.steerVector);
  }

  if(this.loc.y < 25){
    this.desired = new JSVector(this.vel.x, this.vel.y);
    this.steerVector = JSVector.subGetNew(this.desired, this.vel);

    this.steerVector.limit(this.maxForce);
    this.applyForce(this.steerVector);
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
  this.draw();
}
