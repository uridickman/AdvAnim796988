function Flock(numBoids, velocity, force, color){
  this.numBoids = numBoids;
  this.maxVel = velocity;
  this.maxForce = force;
  this.color = color;
  this.loadBoids();
}

Flock.prototype.loadBoids = function(){
  if(this.color === "red"){
    for(i = 0; i < this.numBoids; i++){
      boidsRed.push(new Boid(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1, this.maxVel, this.maxForce, 50, this.color));
    }
  }
  if(this.color === "blue"){
    for(i = 0; i < this.numBoids; i++){
      boidsBlue.push(new Boid(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1, this.maxVel, this.maxForce, 50, this.color));
    }
  }
}

Flock.prototype.run = function(){
  if(boidsRed.length > 0){
    for(i = 0; i < boidsRed.length; i++){
      boidsRed[i].run();
    }
  }
  // if(boidsBlue.length > 0){
  //   for(i = 0; i < boidsBlue.length; i++){
  //     boidsBlue[i].run();
  //   }
  // }
}
