function SnakeSystem(numSnakes){
  this.numSnakes = numSnakes;
  this.snakeList = [];
  this.createSnakes();
}
//length, x, y, vx, vy, r, c

SnakeSystem.prototype.createSnakes = function(){
  for(let i = 0; i < this.numSnakes; i++){
    this.snakeList.push(new Snake(50, Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*12-6, Math.random()*12-6, 7, 'white'));
  }
}

SnakeSystem.prototype.run = function(){
  for(let i = 0; i < this.snakeList.length; i++){
    this.snakeList[i].run();
  }
}
