addEventListener("load", init);
addEventListener("click", createSystemAtMouse);

var canvas;
var context;
var mouse;
var system;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  system = new System();
  mouse = new MouseEvent("click");

  animate();
}

function createSystemAtMouse(mouse){
  system.particleSystems.push(new ParticleSystem(mouse.clientX, mouse.clientY, 0, 0, .1, 100));
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  system.run();
}
