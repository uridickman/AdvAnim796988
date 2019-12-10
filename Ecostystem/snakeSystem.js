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

SnakeSystem.prototype.birthSnake = function(){
  for(let i = 0; i < this.snakeList.length; i++){
    if(this.snakeList[i].giveBirth){
      this.snakeList.push(new Snake(30, this.snakeList[i].tail[0], this.snakeList[i].tail[0], -1, 1, 10, "white"));
    }
}
}

SnakeSystem.prototype.run = function(){
  this.birthSnake();
  for(let i = 0; i < this.snakeList.length; i++){
    this.snakeList[i].run();
  }
}
