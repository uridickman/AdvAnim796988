function Boid(x, y, vx, vy, maxVelocity, maxForce, sep){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0,0);
  this.maxVel = maxVelocity;
  this.maxForce = 2*maxForce;
  this.distFromWall = 50;
  this.separation = sep;
  this.sum = new JSVector(0,0);
  this.vel.normalize();
  this.vel.multiply(this.maxVel);
}

Boid.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.acc.multiply(0);
}

Boid.prototype.applyForce = function(vector){
  this.acc.add(vector);
}

Boid.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width - this.distFromWall){
    let desired = new JSVector(-1*this.maxVel, this.vel.y);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  if(this.loc.x < this.distFromWall){
    let desired = new JSVector(this.maxVel, this.vel.y);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  if(this.loc.y > canvas.height - this.distFromWall){
    let desired = new JSVector(this.vel.x, -1*this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  if(this.loc.y < this.distFromWall){
    let desired = new JSVector(this.vel.x, this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
}

Boid.prototype.separate = function(){
  let count = 0;
  for(let i = 0; i < boids.length; i++){
    var dist = this.loc.distance(boids[i].loc);

     if ((dist > 0) && (dist < this.separation)){
       let diff = JSVector.subGetNew(boids[i].loc, this.loc);
       diff.normalize();
       this.sum.add(diff);
       count++;
     }
     if(count > 0){
       this.sum.divide(count);
       this.sum.setMag(this.maxVel);
       let steer = JSVector.subGetNew(this.sum, this.vel);
       steer.limit(this.maxForce);
       this.applyForce(steer);
     }
  }
}

Boid.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x,this.loc.y);
  var direction = this.vel.getDirection() + Math.PI/2;
  if(this.planet){
    direction = this.rotator.getDirection() + Math.PI;
  }
  context.rotate(direction);

  context.beginPath();
  context.moveTo(-5, 5);
  context.lineTo(0, -5/.7);
  context.lineTo(5, 5);
  context.closePath();

  context.lineWidth = 2;
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.stroke();


  context.restore();
}

Boid.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
