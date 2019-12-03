function ParticleSystem(x, y, vx, vy, ay, radius, numParticle){
  this.origin = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.accel = new JSVector(0, ay);
  this.radius = radius;
  this.numParticles = numParticle;
  this.particles = [];
  this.addParticles(numParticle);
}

ParticleSystem.prototype.addParticles = function(numParticles){
  for(let i = 0; i < this.numParticles; i++){
    this.particles.push(new Particle(this.origin.x, this.origin.y, 7, Math.random()*3 - 1.5, Math.random()*3 - 1.5, 0, .1, Math.random()*2.5));
  }
}

ParticleSystem.prototype.alive = function(){
  if(this.origin.y < canvas.height*2){
    return true;
  }
  return false;
}

ParticleSystem.prototype.draw = function(){
  context.strokeStyle = 'white';
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(this.origin.x, this.origin.y, this.radius, 0, Math.PI*2, false);
  context.fill();
  context.stroke();
}

ParticleSystem.prototype.update = function(){
  this.origin.add(this.vel);
  this.vel.add(this.accel);
  for(let i = this.particles.length - 1; i >= 0; i--){
    if(!this.particles[i].dead()){
      this.particles[i].run();
    }
    // else {
    //   this.particles.splice(i, 1);
    //   for(let i = 0; i < 1; i++){
    //     this.particles.push(new Particle(this.origin.x, this.origin.y, 7, Math.random()*3 - 1.5, Math.random()*3 - 1.5, 0, .1, Math.random()*2));
    //   }
    }
  }

ParticleSystem.prototype.run = function(){
  // this.draw();
  this.update();
}
