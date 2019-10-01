addEventListener("load", init);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
let balls = [];
// var attractor;
// var repeller;
var planet;
var f;
let colors = [];

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  colors = ['rgb(204, 51, 255)','rgb(255, 51, 204)','rgb(255, 0, 102)','rgb(204, 0, 0)','rgb(255, 51, 0)','rgb(255, 153, 51)','rgb(153, 204, 0)','rgb(102, 255, 51)','rgb(0, 153, 0)','rgb(0, 204, 0)','rgb(0, 204, 102)','rgb(0, 204, 153)','rgb(0, 153, 153)','rgb(0, 102, 153)','rgb(0, 204, 255)','rgb(102, 153, 255)','rgb(153, 102, 255)','rgb(153, 0, 255)'];

  loadBalls(Math.floor(Math.random()*100+30));
  // attractor = new Ball(canvas.width/2, canvas.height/2, Math.random()*2, Math.random()*2, 60, colors[Math.floor(Math.random()*colors.length)]);
  // repeller = new Ball(100, 100, Math.random()*1, Math.random()*1, 40, colors[Math.floor(Math.random()*colors.length)]);
  planet = new Ball(canvas.width/2, canvas.height/2, 0, 0, 60, 0, colors[Math.floor(Math.random()*colors.length)]);

  animate();
}

function loadBalls(n){
  for(let i = 0; i < n; i++){
    balls.push(new Ball(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*12-6, Math.random()*12-6, Math.random()*20+5, Math.floor(Math.random()*200), colors[Math.floor(Math.random()*colors.length)]));
  }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // attractor.run();
  // repeller.run();
  planet.run();
  for(let i = 0; i < balls.length; i++){
    balls[i].run();
    // balls[i].repel(repeller);
    // balls[i].attract(attractor);
    balls[i].orbit(planet);
    // for(let j = 0; j < balls.length; j++){
    //   //if(balls[j].loc.distance(planet.loc) <= 200){
    //     balls[j].orbit(planet);
    // //  }
    // }
  }
}
