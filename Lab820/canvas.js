addEventListener("load", init);

var canvas;
var context;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  animate();
}

var x, y, vx, vy, radius;
x = Math.random()*800;
y = Math.random()*800;
vx = Math.random()*30-15;
vy = Math.random()*30-15;
radius = 40;

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "red";
  context.fillStyle = "red";
  context.beginPath();

  context.arc(x, y, radius, 0, Math.PI*2, false);
  context.fill();
  context.stroke();

  x+=vx;
  y+=vy;
  if(x + radius>800 || x - radius<0){
    vx = -vx;
  }
  if(y + radius>800 || y - radius<0){
    vy = -vy;
  }
}
