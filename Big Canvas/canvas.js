addEventListener("load", init);
addEventListener('keydown', translateKey);

//++++++++++++Assign global variables
var canvas;
var context;
//set position of origin (x, y)
var x;
var y;

var l1;
var l2;

var picture1 = new Image();

//++++++++++++Called onload
function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800
  canvas.height = 600;

  context = canvas.getContext("2d");
  canvas.style.backgroundColor = "rgb(135,206,250)";
  picture1.src = "picture1.png";

  x = -canvas.width/2;
  y = -canvas.height/2;

  l1 = new Line(-10000, 0, 10000, 0);
  l2 = new Line(0, -10000, 0, 10000);

  context.translate(0, 0);
  animate();
}

//++++++++++++Called on keydown
function translateKey(key){
    var translateRate = 20;
    switch(key.keyCode){
        //key A
        case 65:
            x -= translateRate;
            break;
        //key W
        case 87:
            y -= translateRate;
            break;
        //key D
        case 68:
            x += translateRate;
            break;
        //key S
        case 83:
            y += translateRate;
            break;
        default: console.log("Incorrect key. Try again.");
    } 
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(-10000, -10000, 20000, 20000);

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
}