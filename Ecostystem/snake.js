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
  this.acc = new JSVector(0,0);
  this.giveBirth = false;
  this.createTail();
  this.initVel.setMagnitude(2);
  this.velocities[0].limit(2);
}

// updates each tail piece in the direction of the head, which has velocity initVel.
// each tail piece has velocity vel
Snake.prototype.update = function(){
  this.tail[0].add(this.velocities[0]);
  this.velocities[0].add(this.acc);
  for(let i = 1; i < this.tail.length; i++){
    if(this.tail[i].distance(this.tail[i-1]) > this.radius){
      this.newVector = JSVector.subGetNew(this.tail[i], this.tail[i-1]);
      this.newVector.setMagnitude(this.mag);
      this.tail[i] = this.tail[i].sub(this.newVector);
    }
  }
  this.acc.multiply(0);
}

Snake.prototype.applyForce = function(vector){
  this.acc.add(vector);
}

Snake.prototype.seek = function(target, multiplier){
    let desired = JSVector.subGetNew(target, this.tail[0]);
    desired.normalize();
    desired.multiply(2);
    let steer = JSVector.subGetNew(desired, this.velocities[0]);
    steer.setMagnitude(multiplier);
    this.applyForce(steer);
    this.velocities[0].setMagnitude(2);
}

Snake.prototype.checkForSnakes = function(){
  this.giveBirth = false;
  for(let i = 0; i < snakeSystem.snakeList.length; i++){
    if(snakeSystem.snakeList[i] != this){
      if(snakeSystem.snakeList[i].tail[0].distance(this.tail[0]) <= 10){
        this.giveBirth = true;
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


  for(let i = 0; i < this.tail.length; i++){
    // context.strokeStyle = "rgba(155,89,182" + this.alpha + ")";
    // //'hsl(' + 100 + ', ' + 100 + '%, ' + this.alpha + '%)'
    // context.lineWidth = this.lWidth - i*.6;
    //
    // // this.lWidth -= this.lWidth/this.tail.length;
    // this.alpha -= this.alpha/this.tail.length;
    // context.lineCap = 'round';

    context.beginPath();
    context.drawImage(image6, this.tail[i].x, this.tail[i].y, 20, 20);
  }
}


Snake.prototype.run = function(){
  this.checkEdges();
  this.update();
  for(let i = 0; i < ships.length; i++){
    var dist = this.tail[0].distance(ships[i].loc);
    if(dist < 10){
      ships.splice(i, 1);
      ships.push(new Ship(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*2-1, Math.random()*2-1, 10, 100, 'hsl(310, 90%, 50%)'));
      i--;
    }else if(dist < 100){
      this.seek(ships[i].loc, 1);
    }
  }

  // this.checkForSnakes();
  this.draw();
}
