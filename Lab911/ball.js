function Ball(x, y, vx, vy, g, r){
  this.vel = new JSVector(vx, vy);
  this.gravity = new JSVector(0, g);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.color = 'green';
  this.mass = 0;
}

Ball.prototype.update = function(){
  if(this.loc.y + this.radius < canvas.height){
    this.vel.add(this.gravity);
  }

  this.loc.add(this.vel);
  var friction = this.vel.copy().multiply(0.005);
  this.vel.sub(friction);
}

Ball.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
    this.vel = this.vel.multiply(.989);
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
    this.vel = this.vel.multiply(.989);
  }
}

Ball.prototype.draw = function(){
  context.strokeStyle = 'blue';
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  context.fill();
  context.stroke();
}

Ball.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
