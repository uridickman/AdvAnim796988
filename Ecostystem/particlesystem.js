function ParticleSystem(x, y, radius, numParticles){
  this.origin = new JSVector(x, y);
  this.radius = radius;
  this.numParticles = numParticles;
  this.particles = [];
  this.addParticles(numParticles);
}

ParticleSystem.prototype.addParticles = function(numParticles){
  for(let i = 0; i < this.numParticles; i++){
    this.particles.push(new Particle(this.origin.x, this.origin.y, 10, Math.random()*3 - 1.5, Math.random()*3 - 1.5, 0, .1, Math.random()*2));
  }
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
  for(let i = this.particles.length - 1; i >= 0; i--){
    if(!this.particles[i].dead()){
      this.particles[i].run();
    } else {
      this.particles.splice(i, 1);
      for(let i = 0; i < 1; i++){
        this.particles.push(new Particle(this.origin.x, this.origin.y, 10, Math.random()*3 - 1.5, Math.random()*3 - 1.5, 0, .1, Math.random()*2));
      }
    }
  }
}

ParticleSystem.prototype.run = function(){
  this.draw();
  this.update();
}
