function Orbiter(x, y, vx, vy, r, oR, c){
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.angle = Math.random()*Math.PI*2;
  this.orbRadius = oR;
  this.aVel = .05;
  this.mass = 0;
  this.color = c;
}

Orbiter.prototype.update = function(){
  var p = planet1;
  if(this.loc.distance(planet.loc) < 200 && this !== p){
    this.orbit(p);
  } else{
    this.loc.add(this.vel);
    this.vel.limit(15);

  }
     this.angle += this.aVel;

}

Orbiter.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

Orbiter.prototype.orbit = function(p){

  var h = this.orbRadius + p.radius;
  this.loc.x = p.loc.x + h*Math.cos(this.angle);
  this.loc.y = p.loc.y + h*Math.sin(this.angle);

}

Orbiter.prototype.draw = function(){
    context.strokeStyle = 'white';
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
}


Orbiter.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
