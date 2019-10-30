// creates tail at (x,y) with v (vx,vy) with distance pixels away from next point
function Tail(x, y, vx, vy, distance, length, snake, color){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.distFromNextPt = distance;
  this.length = length;
  this.points = [];
  this.snake = snake;
  this.color = color;
  this.createPointArray();
}

Tail.prototype.checkAndUpdateDistance = function(){
  for(let i = 0; i < this.points.length-1; i++){
    if(this.points[i].distance(this.points[i+1]) > this.distFromNextPt){
      var d = this.points[i].getDirection(this.points[i+1]);
      this.points[i].setDirection(d);
      this.points[i].normalize();
  }
}

Tail.prototype.createPointArray = function(){
  this.points.push(this.snake);
  for(let i = 0; i < this.length; i++){
    this.points.push(new JSVector(x, y));
  }
}

Tail.prototype.draw = function(){
  context.strokeStyle = this.color;
  for(let i = 0; i < points.length-1; i++){
    context.beginPath();
    context.moveTo(points[i].x, points[i].y);
    context.lineTo(points[i+1].x, points[i+1].y);
  }
  context.stroke();
}

Tail.prototype.run = function(){
  this.checkAndUpdateDistance();
  this.draw();
}
