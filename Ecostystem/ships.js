function Ship(xCenter, yCenter, vx, vy, side, oR, color){
  this.loc = new JSVector(xCenter, yCenter);
  this.vel = new JSVector(vx, vy);
  this.sideLength = side;
  this.orbRadius = oR;
  this.color = color;
  this.angle = 0;
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
  for(let i = 0; i < planets.length; i++){
    if(this.loc.distance(planets[i].loc) < 100){
      return i;
    }
  }
  return -1;
}

Ship.prototype.orbit = function(p){
    var h = this.orbRadius + p.radius;
    this.loc.x = p.loc.x + h*Math.cos(this.angle);
    this.loc.y = p.loc.y + h*Math.sin(this.angle);
    this.angle += 0.02;
}

Ship.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x,this.loc.y);
  context.rotate(this.vel.getDirection()+Math.PI/2);

  context.beginPath();
  context.moveTo(-3.5, 3.5);
  context.lineTo(0, -5);
  context.lineTo(3.5, 3.5);
  context.closePath();

  context.lineWidth = 1;
  context.strokeStyle = 'transparent';
  context.stroke();

  context.fillStyle = this.color;
  context.fill();

  context.restore();
}

Ship.prototype.run = function(){
  this.checkEdges();
  this.draw();
  this.update();
}
