// function Pyramid(xPos, yPos, width, height, rows, cols) {
//     this.xPos = xPos;
//     this.yPos = yPos;
//     this.width = width;
//     this.height = height;
//     this.rows = rows;
//     this.cols = cols;
//     this.fillStyle = [];

//     this.pyramid = Composites.pyramid(this.xPos, this.yPos, this.rows, this.cols, 0, 0, function (x, y) {
//         var n = new Rectangle(x, y, 25, 40);
//         return n.newRect;
//     });
// }

// Pyramid.prototype.run = function () {
//     var pArray = this.pyramid.bodies;
//     for (let i = 0; i < pArray.length; i++) {
//         context.save();
//         context.translate(pArray[i].position.x, pArray[i].position.y);
//         var direction = pArray[i].angle;
//         context.rotate(direction);
//         context.fillStyle = this.fillStyle[i];
//         context.fillRect(-.5 * this.width, -.5 * this.height, this.width, this.height);
//         context.restore();
//     }
// }

class Pyramid {
    constructor(x, y, n, w, h) {
        this.x = x;
        this.y = y;
        this.rectW = w;
        this.rectH = h;
        this.rows = n;
        this.rects = [];

        this.create();
    }

    create() {
        for (let r = 0; r < this.rows; r++) {
            for (let b = 0; b < this.rows - r; b++) {
                var addRect = new Rectangle(this.x + b * this.rectW + r * this.rectW, this.y - r * this.rectH, this.rectW, this.rectH);
                this.rects.push(addRect);
                World.add(engine.world, [addRect.newRect]);
            }
        }
    }

    run() {
        // call run from Rectangle
        for (let i = 0; i < this.rects.length; i++) {
            this.rects[i].run();
        }
    }
}