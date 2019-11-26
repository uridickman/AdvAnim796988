function Boid(x, y, vx, vy, maxVelocity, maxForce, sep){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0,0);
  this.maxVel = maxVelocity;
  this.maxForce = maxForce;
  this.distFromWall = 50;
  this.sepDist = sep;
  this.sum = new JSVector(0,0);
  this.vel.setMagnitude(this.maxVel);
}

Boid.prototype.update = function(){
  this.acc.limit(this.maxForce);

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

Boid.prototype.seek = function(target, multiplier){
    let desired = JSVector.subGetNew(target, this.loc);
    desired.normalize();
    desired.multiply(this.maxVel);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.setMagnitude(multiplier);
    this.applyForce(steer);
}

Boid.prototype.separate = function(){
  for(let i = 0; i < boids.length; i++){
    var dist = this.loc.distance(boids[i].loc);

    if ((dist > 0) && (dist < this.sepDist)){
       let desired = JSVector.subGetNew(this.loc, boids[i].loc);
       desired.normalize();

       let steer = JSVector.subGetNew(desired, this.vel);
       steer.setMagnitude(15);
       this.applyForce(steer);
     }
     boids[i].vel.setMagnitude(this.maxVel);
  }
}

Boid.prototype.cohesion = function(){
  var neighborhoodDist = 100;
  let sum = new JSVector();
  var count = 0;
  for(let i = 0; i < boids.length; i++){
      var dist = this.loc.distance(boids[i].loc);
      if((dist > 0) && (dist < neighborhoodDist)){
      sum.add(boids[i].loc);
      count++;
    }
  }
  if(count > 0){
    sum.divide(count);
    this.seek(sum, 10);
  }
}

Boid.prototype.align = function(){
  let sum = new JSVector();
  var neighborhoodDist = 100;
  var count = 0;
  for(let i = 0; i < boids.length; i++){
      var dist = this.loc.distance(boids[i].loc);
      if((dist > 0) && (dist < neighborhoodDist)){
      sum.add(boids[i].vel);
      count++;
    }
  }
  if(count > 0){
    sum.divide(count);
    sum.setMagnitude(this.maxVel);
    let steer = JSVector.subGetNew(sum, this.vel);
    steer.normalize();

    steer.setMagnitude(10);
    this.applyForce(steer);
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
  context.moveTo(-3.5, 3.5);
  context.lineTo(0, -5);
  context.lineTo(3.5, 3.5);
  context.closePath();

  context.lineWidth = 2;
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.stroke();


  context.restore();
}

Boid.prototype.run = function(){
  this.separate();
  this.align();
  this.cohesion();
  this.checkEdges();
  this.update();
  this.draw();
}
