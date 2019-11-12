addEventListener("load", init);

var canvas;
var context;
var boid;


function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 1100; //window.innerWidth;;  //
  canvas.height = 900;  //window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  //radius, x, y, vx, vy
  boid = new Boid(20, 400, 400, 2, 3, 4, .5);

  animate();
}



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  boid.run();
}
