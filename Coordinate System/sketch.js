addEventListener("load", init);

var canvas;
var context;
var l1;
var l2;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(100, 100, 100)";

  l1 = new Line(-10000, 0, 10000, 0);
  l2 = new Line(0, -10000, 0, 10000);

  context.translate(800, 800);
  animate();
}


function animate(){
  requestAnimationFrame(animate);
  context.clearRect(-10000, -10000, 20000, 20000);
  context.translate(1, 1);
  context.rotate(.01);
  l1.run();
  l2.run();
}
