function Planet(x, y, vx, vy, r, c, numOrbiters, life){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.color = c;
  this.numOrbs = numOrbiters;
  this.numShips = 0;
  this.orbiters = [];
  this.life = 100;
}

Planet.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

Planet.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

Planet.prototype.createOrbiters = function(){
  for(let i = 0; i < this.numOrbs; i++){
    //(x, y, vx, vy, radius, orbitRadius, angle, planet#)
    this.orbiters.push(new Orbiter(this.loc.x + (this.orbRadius + this.radius)*Math.cos(this.angle), this.loc.y + (this.orbRadius + this.radius)*Math.sin(this.angle), 8, 8, 5, Math.random()*50+5 + this.radius, i*2*Math.PI/this.numOrbs, this));
  }
}

Planet.prototype.runOrbiter = function(){
  for(j = 0; j < this.orbiters.length; j++){
    this.orbiters[j].run();

    context.lineWidth = 1;
    context.strokeStyle = 'hsl(' + this.orbiters[j].hue + ', ' + 100 + '%, ' + 50 + '%)';
    context.moveTo(this.orbiters[j].planet.loc.x, this.orbiters[j].planet.loc.y);
    context.lineTo(this.orbiters[j].loc.x, this.orbiters[j].loc.y);
    context.stroke();
  }
}

Planet.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x, this.loc.y);
  var direction = this.vel.getDirection() + Math.PI/2;
  context.rotate(direction);

  context.drawImage(image4, -30, -30, 60, 60);


  context.restore();
}


Planet.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.runOrbiter();
  this.draw();
}
