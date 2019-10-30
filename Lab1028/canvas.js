addEventListener("load", init);

var canvas;
var context;
let snake;


function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  // length, color, x, y, vx, vy, radius
  snake = new Snake(100, 'white', 200, 200, 5, 4, 20);

  animate();
}



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.run();
}
