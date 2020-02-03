addEventListener("load", init);
addEventListener('keypress', translateKey);

var canvas;
var context;
var x = -400;
var y = -300;
var l1;
var l2;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800
  canvas.height = window.innerHeight - 600;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(100, 100, 100)";

  l1 = new Line(-10000, 0, 10000, 0);
  l2 = new Line(0, -10000, 0, 10000);

  animate();
}

// function translateKey(key){
//     switch(key){
//         case "KeyA":
//             context.translate(20, 0);
//             console.log("a");
//             break;
//         case "KeyW":
//             context.translate(0, 20);
//             break;
//         case "KeyD":
//             context.translate(-20, 0);
//             break;
//         case "KeyS":
//             context.translate(0, -20);
//             break;
//         default: console.log("aa");
//     } 
// }

function translateKey(key){
    if(key === "KeyA"){
        x -= 20;
    }
    if(key === "KeyW"){
        y -= 20;
    }
    if(key === "KeyD"){
        x += 20
    }
    if(key === "KeyS"){
        y += 20;
    }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(-10000, -10000, 20000, 20000);
  context.save();
  context.translate(-x, -y);
  l1.run();
  l2.run();
  
  context.restore();
}
