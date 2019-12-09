function Predator(x, y, vx, vy, color){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = 0;
  this.maxVel = 4;
  this.maxForce = .5;
  this.distFromWall = 50;
  this.vel.setMagnitude(4);
}

Predator.prototype.update = function(){
  this.acc.limit(this.maxForce);

  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.acc.multiply(0);
}

Predator.prototype.applyForce = function(vector){
  this.acc.add(vector);
}

Predator.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width - this.distFromWall){
    let desired = new JSVector(-1*this.maxVel, this.vel.y);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(40);
    this.applyForce(steer);
  }

  if(this.loc.x < this.distFromWall){
    let desired = new JSVector(this.maxVel, this.vel.y);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(40);
    this.applyForce(steer);
  }

  if(this.loc.y > canvas.height - this.distFromWall){
    let desired = new JSVector(this.vel.x, -1*this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(40);
    this.applyForce(steer);
  }

  if(this.loc.y < this.distFromWall){
    let desired = new JSVector(this.vel.x, this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(40);
    this.applyForce(steer);
  }
}

Predator.prototype.seek = function(target, multiplier){
    let desired = JSVector.subGetNew(target, this.loc);
    desired.normalize();
    desired.multiply(this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(multiplier);
    this.applyForce(steer);
}

Predator.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x, this.loc.y);
  var direction = this.vel.getDirection() + Math.PI/2;
  if(this.planet){
    direction = this.rotator.getDirection() + Math.PI;
  }
  context.rotate(direction);

  context.beginPath();
  context.moveTo(-7, 7);
  context.lineTo(0, -10);
  context.lineTo(7, 7);
  context.closePath();

  context.lineWidth = 2;
  context.strokeStyle = this.color;
  context.stroke();


  context.restore();
}

Predator.prototype.run = function(){
  this.checkEdges();
  for(let i = 0; i < planets.length; i++){
    if(this.loc.distance(planets[i].loc) < 150){
      this.seek(planet[i].loc, 10);
    }
  }
  this.update();
  this.draw();
}
