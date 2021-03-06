function Orbiter(x, y, vx, vy, r, oR, a, planet){
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.angle = a;
  this.orbRadius = oR;
  this.originalOrbRad = oR;
  this.orbRadVel = .4;
  this.aVel = .01;
  this.mass = 0;
  this.hue = Math.random()*360;
  this.planet = planet;
}

Orbiter.prototype.update = function(){
    this.orbit();
    this.angle += this.aVel;

}

Orbiter.prototype.orbit = function(){
  var p = this.planet;
  var h = this.orbRadius + p.radius;
  this.loc.x = p.loc.x + h*Math.cos(this.angle);
  this.loc.y = p.loc.y + h*Math.sin(this.angle);
}

Orbiter.prototype.draw = function(){
  context.save();

  context.translate(this.loc.x, this.loc.y);
  var direction = this.vel.getDirection() - Math.PI/2;
  context.rotate(direction);

  context.drawImage(image5, -20, -20, 40, 40);


  context.restore();
}

Orbiter.prototype.changeOrbRadius = function(){
    if(this.orbRadius > 2*this.originalOrbRad){
      this.orbRadVel *= -1;
    }else if(this.orbRadius < .5*this.originalOrbRad){
      this.orbRadVel *= -1;
    }
    this.orbRadius += this.orbRadVel;
}


Orbiter.prototype.run = function(){
  this.update();
  this.draw();
  this.changeOrbRadius();

}
