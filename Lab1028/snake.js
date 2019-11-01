// creates snake with parameters
function Snake(length, color, x, y, vx, vy, radius){
  this.length = length;
  this.color = color;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = radius;
  this.tail = [];
  this.loadTailPts();
}

// loads tail[] with this.length JSVector points for the lines to be drawn at
Snake.prototype.loadTailPts = function(){
  this.tail.push(this.loc);
  for(i = 0; i < this.length; i++){
    this.tail.push(new JSVector(this.loc.x, this.loc.y));
  }
}

Snake.prototype.checkUpdateDistance = function(){
  for(let i = 0; i < this.tail.length - 1; i++){
    if(this.tail[i+1].distance(this.tail[i]) > 10){
      var newVel = this.vel;
      newVel.setDirection(this.tail[i].getDirection(this.tail[i+1]));
      newVel.normalize();
      newVel.setMagnitude(this.vel.getMagnitude());
      this.tail[i] += this.newVel;
    }
  }
}

// ensures that snake does not exit the canvas
Snake.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

// draws snake
Snake.prototype.draw = function(){
  for(let i = 1; i < this.tail.length; i++){
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.tail[i].x, this.tail[i].y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
  }
}

// updates snake's location
Snake.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

// runs all of Snake class methods
Snake.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.checkUpdateDistance();
  this.draw();

}
