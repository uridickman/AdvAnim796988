addEventListener("load", init);
addEventListener('keydown', translateKey);

//++++++++++++Assign global variables for main canvas
var canvas;
var context;
var world = {
    width: 4000,
    height: 3000
};
//set position of origin (x, y)
var x;
var y;

var l1;
var l2;

//++++++++++++Assign global variables for mini canvas
var scale = 4;
var miniContext;
var miniCanvas;
var miniWorld = {
    width: world.width/scale,
    height: world.height/scale
};
//set position of mini origin (miniX, miniY)
var minX;
var miniY;

var miniL1;
var miniL2;

var picture1 = new Image();

//++++++++++++Called onload
function init(){
    //++++++++++++++++++++++++++++++++++++++main canvas setup
    canvas = document.getElementById("cnv");
    canvas.width = 800
    canvas.height = 600;

    context = canvas.getContext("2d");
    canvas.style.backgroundColor = "rgb(135,206,250)";
    picture1.src = "picture1.png";

    //define origin
    x = -canvas.width/2;
    y = -canvas.height/2;

    //draw axes
    l1 = new Line(-world.width/2, 0, world.width/2, 0, context, 1);
    l2 = new Line(0, -world.height/2, 0, world.height/2, context, 1);

    //++++++++++++++++++++++++++++++++++++++++++minimap canvas setup
    miniCanvas = document.getElementById("miniCnv");
    miniCanvas.width = canvas.width/scale;
    miniCanvas.height = canvas.height/scale;

    miniContext = miniCanvas.getContext("2d");
    miniCanvas.style.backgroundColor = "rgb(135,206,250)";

    //define origin
    miniX = -miniCanvas.width/2;
    miniY = -miniCanvas.height/2;

    //draw axes
    miniL1 = new Line(-world.width/2, 0, world.width/2, 0, miniContext, .3);
    miniL2 = new Line(0, -world.height/2, 0, world.height/2, miniContext, .3);
    
    animate();
}

//++++++++++++Called on keydown
function translateKey(key){
    var translateRate = 20;
    switch(key.keyCode){
        //key A
        case 65:
            x -= translateRate;
            // miniX -= translateRate/scale;
            break;
        //key W
        case 87:
            y -= translateRate;
            // miniY -= translateRate/scale;
            break;
        //key D
        case 68:
            x += translateRate;
            // miniX += translateRate/scale;
            break;
        //key S
        case 83:
            y += translateRate;
            // miniY += translateRate/scale;
            break;
        default: console.log("Incorrect key. Try again.");
    }
}

function animate(){
    requestAnimationFrame(animate);
    //+++++++++++++++++++++++++++++Render main context
    context.clearRect(-world.width/2, -world.height/2, world.width, world.height);

    context.save();

    //translate canvas by (-x, -y) that have been incremented in translateKey(key)
    context.translate(-x, -y);

    //draw lines
    l1.run();
    l2.run();

    //draw 4 images in their resepctive positions in the world 
    context.drawImage(picture1, -3*canvas.width/4, -3*canvas.height/4, 100, 100); 
    context.drawImage(picture1, -3*canvas.width/4, 3*canvas.height/4, 100, 100);
    context.drawImage(picture1, 3*canvas.width/4, -3*canvas.height/4, 100, 100);
    context.drawImage(picture1, 3*canvas.width/4, 3*canvas.height/4, 100, 100);

    context.restore();

    //++++++++++++++++++++++++++++++++++Render mini context
    miniContext.clearRect(-miniWorld.width/2, -miniWorld.height/2, miniWorld.width, miniWorld.height);

    miniContext.save();

    miniContext.scale(miniCanvas.width/world.width, miniCanvas.height/world.height);
    //translate canvas by (-x, -y) that have been incremented in translateKey(key)
    miniContext.translate(world.width/2, world.width/2 - 500);

    //draw lines
    miniL1.run();
    miniL2.run();

    miniContext.beginPath();
    miniContext.lineWidth = 25;
    miniContext.strokeStyle = "black";
    miniContext.rect(x, y, canvas.width, canvas.height);
    miniContext.stroke();

    //draw 4 images in their resepctive positions in the world 
    miniContext.drawImage(picture1, -3*miniCanvas.width/4, -3*miniCanvas.height/4, 100/scale*2, 100/scale*2); 
    miniContext.drawImage(picture1, -3*miniCanvas.width/4, 3*miniCanvas.height/4, 100/scale*2, 100/scale*2);
    miniContext.drawImage(picture1, 3*miniCanvas.width/4, -3*miniCanvas.height/4, 100/scale*2, 100/scale*2);
    miniContext.drawImage(picture1, 3*miniCanvas.width/4, 3*miniCanvas.height/4, 100/scale*2, 100/scale*2);

    miniContext.restore();
}