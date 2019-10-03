function Ship(xCenter, yCenter, vx, vy, side, oR, color){
  this.loc = new JSVector(xCenter, yCenter);
  this.vel = new JSVector(vx, vy);
  this.sideLength = side;
  this.orbRadius = oR;
  this.color = 'white';
}

Ship.prototype.draw(){
  context.beginPath();
  context.moveTo(this.loc.x + .5*sideLength, this.loc.y + 2*Math.tan(Math.PI/3)/sideLength);
  context.lineTo(this.loc.x - .5*sideLength, this.loc.y + 2*Math.tan(Math.PI/3)/sideLength);
  context.lineTo(this.loc.x, this.loc.y + sideLength/(2*Math.cos(Math.PI/3)));
  context.closePath();

  context.lineWidth = 10;
  context.strokeStyle = 'transparent';
  context.stroke();

  context.fillStyle = this.color;
  context.fill();
}
