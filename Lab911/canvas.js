addEventListener("load", init);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
var gravity = new JSVector(0, 1);
var stop = false;
let balls = [];

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  loadBalls(Math.random()*100);

  animate();
}

function loadBalls(n){
  for(let i = 0; i < n; i++){
    balls.push(new Ball(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*12-6, Math.random()*12-6, .3, Math.random()*30));
  }
}


function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < balls.length; i++){
    balls[i].run();
  }
}
