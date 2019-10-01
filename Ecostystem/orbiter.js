function Orbiter(x, y, vx, vy, r, oR, a, c){
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.angle = a;
  this.orbRadius = oR;
  this.orbRadVel = .4;
  this.aVel = .01;
  this.mass = 0;
  this.color = c;
}

Orbiter.prototype.update = function(p){
    this.orbit(p);
     this.angle += this.aVel;

}

Orbiter.prototype.orbit = function(p){

  var h = this.orbRadius + p.radius;
  this.loc.x = p.loc.x + h*Math.cos(this.angle);
  this.loc.y = p.loc.y + h*Math.sin(this.angle);

}

Orbiter.prototype.draw = function(){
    context.strokeStyle = 'transparent';
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
}

Orbiter.prototype.changeOrbRadius = function(){
    if(this.orbRadius > 200){
      this.orbRadVel *= -1;
    }else if(this.orbRadius < 120){
      this.orbRadVel *= -1;
    }
    this.orbRadius += this.orbRadVel;
}


Orbiter.prototype.run = function(p){
  this.update(p);
  this.draw();
  this.changeOrbRadius();

}
