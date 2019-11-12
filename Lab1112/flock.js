function Flock(numBoids, radius, velocity){
  this.numBoids = numBoids;
  this.boids = [];
  this.maxVel = velocity;
}

Flock.prototype.loadBoids = function(){
  for(i = 0; i < this.numBoids; i++){
    this.boids.push(new Boid(xxxxxxx));
  }
}
