function Flock(numBoids, velocity, force){
  this.numBoids = numBoids;
  this.maxVel = velocity;
  this.maxForce = force;
  this.loadBoids();
}

Flock.prototype.loadBoids = function(){
  for(i = 0; i < this.numBoids; i++){
    boids.push(new Boid(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2-1, Math.random()*2-1, this.maxVel, this.maxForce, 15));
  }
}

Flock.prototype.run = function(){
  for(i = 0; i < boids.length; i++){
    boids[i].run();
  }
}
