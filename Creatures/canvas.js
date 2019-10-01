addEventListener("load", init);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
let orbiters = [];
var planet;
var f;
let colors = [];
var hue = 0;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0,1)";


  // colors = ['rgb(204, 51, 255)','rgb(255, 51, 204)','rgb(255, 0, 102)','rgb(204, 0, 0)','rgb(255, 51, 0)','rgb(255, 153, 51)','rgb(153, 204, 0)','rgb(102, 255, 51)','rgb(0, 153, 0)','rgb(0, 204, 0)','rgb(0, 204, 102)','rgb(0, 204, 153)','rgb(0, 153, 153)','rgb(0, 102, 153)','rgb(0, 204, 255)','rgb(102, 153, 255)','rgb(153, 102, 255)','rgb(153, 0, 255)'];
  planet1 = new Planet(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*1.6-.8, Math.random()*1.6-.8, 60, 'hsl(0, 100%, 100%)');

  loadOrbiters(20);
  for(let j = 0; j < orbiters.length; j++){
    colors.push('hsl(' + Math.floor(360/orbiters.length)*j + ', ' + 100 + '%, ' + 50 + '%)');
  }
  for(let k = 0; k < orbiters.length; k++){
    orbiters[k].color = colors[k];
  }

  animate();
}

function loadOrbiters(n){
  for(let i = 0; i < n; i++){
    orbiters.push(new Orbiter(planet1.loc.x + (this.orbRadius + planet1.radius)*Math.cos(this.angle), planet1.loc.y + (this.orbRadius + planet1.radius)*Math.sin(this.angle), 8, 8, 20, 100 + this.radius, i*2*Math.PI/n, 'white'));
  }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  planet1.color = 'hsl(' + hue + ', ' + 100 + '%, ' + 60 + '%)';
  hue+=.5;
  planet1.run();
  for(let i = 0; i < orbiters.length; i++){
    orbiters[i].run(planet1);

    context.lineWidth = 1;
    context.strokeStyle = orbiters[i].color;
    context.moveTo(planet1.loc.x, planet1.loc.y);
    context.lineTo(orbiters[i].loc.x, orbiters[i].loc.y);
    context.stroke();

    orbiters[i].orbit(planet1);
  }

}
