addEventListener("load", init);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
// var gravity = new JSVector(0, 1);
let balls = [];
var attractor;
var repeller;
var f;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  loadBalls(Math.random()*100);
  attractor = new Ball(canvas.width/2, canvas.height/2, 0, 0, 60);
  repeller = new Ball(100, 100, 0, 0, 40);

  animate();
}

function loadBalls(n){
  for(let i = 0; i < n; i++){
    balls.push(new Ball(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*12-6, Math.random()*12-6, Math.random()*20+5));
  }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  attractor.run();
  repeller.run();
  for(let i = 0; i < balls.length; i++){
    balls[i].run();
    balls[i].repel(repeller);
    balls[i].attract(attractor);
  }
}
