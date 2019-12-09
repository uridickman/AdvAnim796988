function Predator(x, y, vx, vy, color){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0,0);
  this.maxVel = 5;
  this.maxForce = .17;
  this.distFromWall = 50;
  this.color = color;
  this.vel.setMagnitude(this.maxVel);
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
    this.vel.setMagnitude(this.maxVel);
}

Predator.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x, this.loc.y);
  var direction = this.vel.getDirection() + Math.PI/2;
  if(this.planet){
    direction = this.rotator.getDirection() + Math.PI;
  }
  context.rotate(direction);

  context.drawImage(image, -30, -30, 60, 60);


  context.restore();
}

Predator.prototype.checkKilled = function(){
  for(let i = 0; i < planets.length; i++){
    if(this.loc.distance(planets[i].loc) < 300){
      return i;
    }
  }
  return -1;
}

Predator.prototype.run = function(){
  this.checkEdges();
  for(let i = 0; i < planets.length; i++){
    if(this.loc.distance(planets[i].loc) < 300){
      this.seek(planets[i].loc, 1);
    }
  }
  // var tempPlanet = this.checkKilled();
  // if(tempPlanet > 0){
  //   planets.splice(tempPlanet, 1);
  //   planets.push(new Planet(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*1.6-.8, Math.random()*1.6-.8, 20, 'white', Math.floor(Math.random()*10+4)));
  //   for(let i = 0; i < orbiters.length; i++){
  //     orbiters.splice(i, 1);
  //   }
  //   planets[tempPlanet].createOrbiters();
  // }

  this.update();
  this.draw();
}
