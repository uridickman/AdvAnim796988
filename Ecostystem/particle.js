function Particle(x, y, radius, vx, vy, ax, ay, life){
  this.loc = new JSVector(x, y);
  this.radius = radius;
  this.vel = new JSVector(vx, vy);
  this.accel = new JSVector(ax, ay);
  this.lifeSpan = life;
}

Particle.prototype.update = function(){
  // this.vel.add(this.accel);
  this.loc.add(this.vel);
  this.lifeSpan -= .03;
}

Particle.prototype.draw = function(){
  context.strokeStyle = 'rgba(255, 255, 255, ' + this.lifeSpan + ')';
  context.fillStyle = 'rgba(255, 255, 255, ' + this.lifeSpan + ')';
  context.beginPath();
  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  context.fill();
  context.stroke();
}

Particle.prototype.dead = function(){
  if(this.lifeSpan < 0){
    return true;
  }
  return false;
}

Particle.prototype.run = function(){
  this.update();
  this.draw();
}
