addEventListener("load", init);

var canvas;
var context;
var flock;
let boids = [];
var separation;
var alignment;
var cohesion;
var wallRepulsion;


function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 1100; //window.innerWidth;;  //
  canvas.height = 900;  //window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  separation = document.getElementById("sep");
  alignment = document.getElementById("align");
  cohesion = document.getElementById("coh");
  wallRepulsion = document.getElementById("wall");

  flock = new Flock(60, 2, .2);

  animate();
}



function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  flock.run();
}
