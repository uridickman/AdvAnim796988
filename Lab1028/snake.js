// creates snake with parameters
function Snake(numSnakes, length, color, x, y, vx, vy, radius){
  this.numSnakes = numSnakes;
  this.length = length;
  this.color = color;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = radius;
}

// idk what this does
Snake.prototype.draw = function(){

}

//creates a tail? tentative
Snake.prototype.addTail = function(){

}

// ensures that snake does not exit the canvas
Snake.prototype.checkEdges = function(){

}

// updates snake's location
Snake.prototype.update = function(){

}

// runs all of Snake class methods
Snake.prototype.run = function(){

}
