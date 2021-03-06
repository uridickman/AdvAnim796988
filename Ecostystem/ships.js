function Ship(xCenter, yCenter, vx, vy, side, oR, color){
  this.loc = new JSVector(xCenter, yCenter);
  this.vel = new JSVector(vx, vy);
  this.sideLength = side;
  this.orbRadius = oR;
  this.color = color;
  this.planet = null;
  this.rotator = 0;
  this.isEaten = false;
}

Ship.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

Ship.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width || this.loc.x < 0){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y > canvas.height || this.loc.y < 0){
    this.vel.y = -this.vel.y;
  }
}

Ship.prototype.checkOrbit = function(){
  if(this.planet){
    return;
  }
  for(let i = 0; i < planets.length; i++){
    if(this.loc.distance(planets[i].loc) < this.orbRadius + planets[i].radius){
      this.planet = planets[i];
      this.rotator = JSVector.subGetNew(this.loc, this.planet.loc);
      this.rotator.setMagnitude(this.orbRadius + planets[i].radius);
      // planets[i].numShips++;
    }
  }
}

Ship.prototype.orbit = function(p){
    var h = this.orbRadius + p.radius;
    this.rotator.rotate(.008);
    this.loc.x = p.loc.x + this.rotator.x;
    this.loc.y = p.loc.y + this.rotator.y;
}

Ship.prototype.eat = function(planet){
  if(this.loc.distance(planet.loc) < this.orbRadius + planet.radius){
    var hunger = JSVector.subGetNew(planet.loc, this.loc);
    hunger.normalize();
    hunger.multiply(.6);
    this.vel.add(hunger);
    this.vel.limit(2);
    // (x, y, vx, vy, ay, radius, numParticle){

  }
}

Ship.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x, this.loc.y);
  var direction = this.vel.getDirection() + Math.PI/2;
  if(this.planet){
    direction = this.rotator.getDirection() + Math.PI;
  }
  context.rotate(direction);

  context.drawImage(image2, -10, -10, 20, 20);


  context.restore();
}

Ship.prototype.run = function(){
  this.checkOrbit();

  if(!this.planet){
    this.checkEdges();
    this.update();
  } else {
    context.lineWidth = 1;
    context.strokeStyle = this.color;
    context.moveTo(this.planet.loc.x, this.planet.loc.y);
    context.lineTo(this.loc.x, this.loc.y);
    context.stroke();

    this.eat(this.planet);
    if(this.loc.distance(this.planet.loc) < 1){
      this.isEaten = true;
    }
    this.update();

  }
  this.draw();
}
