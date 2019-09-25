function Ball(x, y, vx, vy, r, c){
  this.vel = new JSVector(vx, vy);
  this.gravity = new JSVector(0, .3);
  this.radius = r;
  this.loc = new JSVector(x, y);
  this.mass = 0;
  this.color = c;
}

Ball.prototype.update = function(){
  // if(this.loc.y + this.radius < canvas.height){
  //   this.vel.add(this.gravity);
  // }

  this.loc.add(this.vel);
  this.vel.limit(15);
  // var friction = this.vel.copy().multiply(0.005);
  // this.vel.sub(friction);
}

Ball.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
    // this.vel = this.vel.multiply(.989);
  }
  if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
    // this.vel = this.vel.multiply(.989);
  }
}

Ball.prototype.repel = function(v2){
  var dist = this.loc.distance(v2.loc);

  if(dist <= 200){
    var repelForce = new JSVector.subGetNew(this.loc, v2.loc);
    repelForce.normalize();
    repelForce.multiply(.6);
    this.vel.add(repelForce);
  }
}

Ball.prototype.attract = function(v2){
  var dist = this.loc.distance(v2.loc);

  if(dist <= 200){
    var attractForce = new JSVector.subGetNew(this.loc, v2.loc);
    attractForce.normalize();
    attractForce.multiply(.6);
    this.vel.sub(attractForce);
  } else if(dist <= v2.radius + 30){
    var repelForce = new JSVector.subGetNew(this.loc, v2.loc);
    repelForce.normalize();
    repelForce.multiply(.6);
    this.vel.add(repelForce);
  }
}

// Ball.prototype.connect = function(v2){
//   if(v2 === attractor || v2 === repeller){
//     if(this.loc.distance(v2.loc) <= v2.radius + 30){
//       context.strokeStyle = 'white';
//       context.beginPath();
//       context.moveTo(this.loc.x, this.loc.y);
//       context.lineTo(v2.loc.x, v2.loc.y);
//     }
//   }
// }

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
