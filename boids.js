function Boid(radius, x, y, vx, vy){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.steerVector = new JSVector();
  this.directionAtEdge = new JSVector();
}

Boid.prototype.steer = function(direction){
  this.steerVector = JSVector.subGetNew(direction, this.vel);
}

Boid.prototype.applyForce = function(vector){
  this.vel.add(vector);
}

Boid.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.directionAtEdge.x = -this.vel.x;
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.directionAtEdge.y = -this.vel.y;
  }
}

Boid.prototype.draw = function(){
  context.strokeStyle = 'rgb(255, 255, 255)';
  context.fillStyle = 'rgb(255, 255, 255)';

  context.beginPath();
  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  context.stroke();
  context.fill();
}

Boid.prototype.run = function(){
  this.steer(this.directionAtEdge);
  this.applyForce(this.steerVector);
  this.draw();
}
