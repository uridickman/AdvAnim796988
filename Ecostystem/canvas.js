addEventListener("load", init);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
let orbiters = [];
let planets = [];
let balls = [];
let ships = [];
var ps;
var f;
let colors = [];
var hue = 0;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(100, 100, 100)";

  loadPlanets(3);
  loadShips(80);

  ps = new ParticleSystem(canvas.width/2, canvas.height/2, 10, 100);

  animate();
}

function loadPlanets(numPlanets){
  for(let i = 0; i < numPlanets; i++){
    planets.push(new Planet(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*1.6-.8, Math.random()*1.6-.8, 40, 'white', Math.floor(Math.random()*10+4)));
    planets[i].createOrbiters();
  }
}

function loadShips(numShips){
  for(let i = 0; i < numShips; i++){
    ships.push(new Ship(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*4-2, Math.random()*4-2, 10, 40, 'hsl(310, 90%, 50%)'));
  }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ps.run();
  for(let k = 0; k < ships.length; k++){
    ships[k].run();
  }
  for(let m = 0; m < ships.length; m++){
    let planetIndex = ships[m].checkOrbit()
    if(planetIndex != -1){
      ships[m].orbit(planets[planetIndex]);
    }
  }
  for(j = 0; j < orbiters.length; j++){
    orbiters[j].run();

    context.lineWidth = 1;
    context.strokeStyle = 'hsl(' + orbiters[j].hue + ', ' + 100 + '%, ' + 50 + '%)';
    context.moveTo(orbiters[j].planet.loc.x, orbiters[j].planet.loc.y);
    context.lineTo(orbiters[j].loc.x, orbiters[j].loc.y);
    context.stroke();
  }
  for(let j = 0; j < planets.length; j++){
    planets[j].color = 'hsl(' + hue + ', ' + 90 + '%, ' + 50 + '%)';
    hue+=.1;
    planets[j].run();
  }
}
