function Line(x1, y1, x2, y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  
  Line.prototype.draw = function(){
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.stroke();
  }
  
  Line.prototype.run = function(){
    this.draw();
  }
  