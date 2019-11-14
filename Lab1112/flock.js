function Flock(numBoids, radius, velocity){
  this.numBoids = numBoids;
  this.boids = [];
  this.maxVel = velocity;
}

Flock.prototype.loadBoids = function(){
  for(i = 0; i < this.numBoids; i++){
    this.boids.push(new Boid(20, Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*5-2.5, Math.random()*5-2.5, 4, 1));
  }
}
