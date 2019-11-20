function Boid(x, y, vx, vy, maxVelocity, maxForce, sep){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0,0);
  this.maxVel = maxVelocity;
  this.maxForce = 2*maxForce;
  this.distFromWall = 50;
  this.sepDist = sep;
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
  for(let i = 0; i < boids.length; i++){
    var dist = this.loc.distance(boids[i].loc);

    if ((dist > 0) && (dist < this.sepDist)){
       let desired = JSVector.subGetNew(this.loc, boids[i].loc);
       desired.normalize();

       let steer = JSVector.subGetNew(desired, this.vel);
       steer.limit(separation.value*this.maxForce);
       this.applyForce(steer);
     }
     boids[i].vel.setMagnitude(this.maxVel);
  }
}

// Boid.prototype.cohesion = function(){
//   let sum = new JSVector();
//   for(let i = 0; i < boids.length; i++){
//     var dist = this.loc.distance(boids[i].loc);
//
//     if((dist > 0) && (dist < 40))
//     sum.add(boids[i].vel);
//   }
//   sum.divide(boids.length);
//   sum.setMagnitude(this.maxVel);
//
//   let steer = JSVector.subGetNew(sum, this.vel);
//   steer.limit(alignment.value*this.maxForce);
//   this.applyForce(steer);
// }

Boid.prototype.align = function(){
  let sum = new JSVector();
  for(let i = 0; i < boids.length; i++){
    var dist = this.loc.distance(boids[i].loc);

    if((dist > 0) && (dist < 40))
    sum.add(boids[i].vel);
  }
  sum.divide(boids.length);
  sum.setMagnitude(this.maxVel);

  let steer = JSVector.subGetNew(sum, this.vel);
  steer.limit(alignment.value*this.maxForce);
  this.applyForce(steer);
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
  this.separate();
  this.align();
  this.draw();
}
