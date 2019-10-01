function Ball(x, y, vx, vy, r, oR, c){
  this.vel = new JSVector(vx, vy);
  // this.gravity = new JSVector(0, .3);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.angle = Math.random()*Math.PI*2;
  this.orbRadius = oR;
  this.aVel = .05;
  this.mass = 0;
  this.color = c;
}

Ball.prototype.update = function(){
  var p = planet;
  if(this.loc.distance(planet.loc) < 200 && this !== p){
    this.orbit(p);
  }else{
    this.loc.add(this.vel);
    this.vel.limit(15);

  }
     this.angle += this.aVel;

}

Ball.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

// Ball.prototype.repel = function(v2){
//   var dist = this.loc.distance(v2.loc);
//
//   if(dist <= 200){
//     var repelForce = new JSVector.subGetNew(this.loc, v2.loc);
//     repelForce.normalize();
//     repelForce.multiply(.6);
//     this.vel.add(repelForce);
//   }
// }
//
// Ball.prototype.attract = function(v2){
//   var dist = this.loc.distance(v2.loc);
//
//   if(dist <= 200){
//     var attractForce = new JSVector.subGetNew(this.loc, v2.loc);
//     attractForce.normalize();
//     attractForce.multiply(.6);
//     this.vel.sub(attractForce);
//   } else if(dist <= v2.radius + 30){
//     var repelForce = new JSVector.subGetNew(this.loc, v2.loc);
//     repelForce.normalize();
//     repelForce.multiply(.6);
//     this.vel.add(repelForce);
//   }
// }

Ball.prototype.orbit = function(p){

  var h = this.orbRadius + p.radius;
  // this.loc.distance(v2.loc);
  this.loc.x = p.loc.x + h*Math.cos(this.angle);
  this.loc.y = p.loc.y + h*Math.sin(this.angle);

}

Ball.prototype.draw = function(){
    context.strokeStyle = 'white';
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
}


Ball.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
