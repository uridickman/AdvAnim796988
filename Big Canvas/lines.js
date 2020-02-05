function Line(x1, y1, x2, y2, context, scale){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.ctx = context;
    this.scale = scale;
  }
  
  Line.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.lineWidth = 6/this.scale;
    this.ctx.strokeStyle = "rgb(221, 65, 36)";
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
  }
  
  Line.prototype.run = function(){
    this.draw();
  }
  