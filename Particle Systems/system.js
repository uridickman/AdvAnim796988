function System(){
  this.particleSystems = [];
}

System.prototype.run = function(){
  for(let i = this.particleSystems.length - 1; i >= 0; i--){
    if(this.particleSystems[i].alive()){
      this.particleSystems[i].run();
    } else {
      this.particleSystems.splice(i, 1);
    }
  }
}
