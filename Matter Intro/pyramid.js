function Pyramid(x, y, width, height, rows, cols){
    this.xPos = x;
    this.yPos = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;

    this.pyramid = Composites.pyramid(this.xPos, this.yPos, this.rows, this.cols, 0, 0, function(x, y) {
        var n = Bodies.rectangle(x, y, this.width, this.height);
    });
}

Pyramid.prototype.run = function(){
    var pArray = this.pyramid.bodies;
    for(let i = 0; i < pArray.length; i++){
        context.save();
        context.translate(pArray[i].position.x, pArray[i].position.y);
        var direction = pArray[i].angle;
        context.rotate(direction);
        context.rect(-.5*this.width, -.5*this.height, this.width, this.height);
        context.restore();
    }
}