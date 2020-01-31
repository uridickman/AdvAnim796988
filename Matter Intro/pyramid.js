function Pyramid(xPos, yPos, width, height, rows, cols){
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;

    this.pyramid = Composites.pyramid(this.xPos, this.yPos, this.rows, this.cols, 0, 0, function(x, y) {
        var n = new Rectangle(x, y, 25, 40);
        return n.newRect;
    });
}

Pyramid.prototype.run = function(){
    var pArray = this.pyramid.bodies;
    for(let i = 0; i < pArray.length; i++){
        context.save();
        context.translate(pArray[i].position.x, pArray[i].position.y);
        var direction = pArray[i].angle;
        context.rotate(direction);
        context.fillStyle = colors[Math.floor(Math.random()*(colors.length-1))];
        // context.fillStyle = "white";
        context.fillRect(-.5*this.width, -.5*this.height, this.width, this.height);
        context.restore();
    }
}