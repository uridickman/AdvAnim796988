function Planet(x, y, vx, vy, r, c, numOrbiters){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.color = c;
  this.numOrbs = numOrbiters;
  this.numShips = 0;
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
    orbiters.push(new Orbiter(this.loc.x + (this.orbRadius + this.radius)*Math.cos(this.angle), this.loc.y + (this.orbRadius + this.radius)*Math.sin(this.angle), 8, 8, 10, Math.random()*100+5 + this.radius, i*2*Math.PI/this.numOrbs, this));
  }
}

Planet.prototype.draw = function(){
    context.strokeStyle = 'transparent';
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
}


Planet.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
