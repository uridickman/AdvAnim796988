// creates snake with parameters
function Snake(length, color, x, y, vx, vy, radius){
  this.length = length;
  this.color = color;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = radius;
  // creates a new tail for this snake
  // x, y, vx, vy, distance, length, snake, color
  this.tail = new Tail(this.loc.x, this.loc.y, this.vel.x, this.vel.y, 10, this.length, this, this.color);

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
  context.strokeStyle = this.color;
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  context.fill();
  context.stroke();
}

// updates snake's location
Snake.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

// runs all of Snake class methods
Snake.prototype.run = function(){
  this.tail.run();
  this.checkEdges();
  this.update();
  this.draw();
}
