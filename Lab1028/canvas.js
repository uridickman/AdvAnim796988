addEventListener("load", init);

var canvas;
var context;
let snake;


function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 1100; //window.innerWidth;;  //
  canvas.height = 900;  //window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  // length, color, x, y, vx, vy, radius
  snake = new Snake(30, 200, 200, Math.random()*10-5, Math.random()*10-5, 20, 'white');

  animate();
}



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.run();
}
