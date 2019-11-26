function Snake(length, x, y, vx, vy, r, c){
  this.loc = new JSVector(x, y);
  this.initVel = new JSVector(vx, vy);
  this.length = length;
  this.radius = r;
  this.color = c;
  this.tail = [];
  this.velocities = [];
  this.mag = this.initVel.getMagnitude();
  this.newVector = new JSVector();
  this.lWidth;
  this.alpha;
  this.createTail();
}

// updates each tail piece in the direction of the head, which has velocity initVel.
// each tail piece has velocity vel
Snake.prototype.update = function(){
  this.tail[0].add(this.velocities[0]);
  for(let i = 1; i < this.tail.length; i++){
    if(this.tail[i].distance(this.tail[i-1]) > this.radius){
      this.newVector = JSVector.subGetNew(this.tail[i], this.tail[i-1]);
      this.newVector.setMagnitude(this.mag);
      this.tail[i] = this.tail[i].sub(this.newVector);
    }
  }
}

Snake.prototype.checkForSnakes = function(){
  for(let i = 0; i < snakeSystem.snakeList.length; i++){
    var newSnakeHead = snakeSystem.snakeList[i].tail[0];
    if(newSnakeHead != this.tail[0]){
      if(this.tail[0].distance(newSnakeHead) <= 20){
        snakeSystem.snakeList.push(new Snake(30, this.tail[0].x, this.tail[0].y, 2, 1.7, 10, "white"));
        break;
      }
    }
  }
}

// pushes location of each tail part to tail[]
Snake.prototype.createTail = function(){
  for(let i = 0; i < this.length; i++){
    this.tail.push(new JSVector(this.loc.x, this.loc.y));
  }
  for(let i = 0; i < this.length; i++){
    this.velocities.push(new JSVector(this.initVel.x, this.initVel.y))
  }
}

Snake.prototype.checkEdges = function(){
  if(this.tail[0].x + this.radius > canvas.width || this.tail[0].x - this.radius < 0){
    this.velocities[0].x = -this.velocities[0].x;
  }
  if(this.tail[0].y + this.radius > canvas.height || this.tail[0].y - this.radius < 0){
    this.velocities[0].y = -this.velocities[0].y;
  }
}

Snake.prototype.draw = function(){
  this.lWidth = 30;
  this.alpha = 50;
    for(let i = 1; i < this.tail.length; i++){
      context.strokeStyle = "white";
      //'hsl(' + 100 + ', ' + 100 + '%, ' + this.alpha + '%)'
      context.lineWidth = this.lWidth - i*.6;

      // this.lWidth -= this.lWidth/this.tail.length;
      this.alpha -= this.alpha/this.tail.length;
      context.lineCap = 'round';

      context.beginPath();
      context.moveTo(this.tail[i-1].x, this.tail[i-1].y);
      context.lineTo(this.tail[i].x, this.tail[i].y);
      context.stroke();
    }
}


Snake.prototype.run = function(){
  this.checkEdges();
  this.checkForSnakes();
  this.update();
  this.draw();
}
