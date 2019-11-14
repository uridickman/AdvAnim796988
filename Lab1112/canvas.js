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

  boid = new Boid(20, 1000, 400, 2, 3, 5, .05);

  animate();
}



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  boid.run();
}
