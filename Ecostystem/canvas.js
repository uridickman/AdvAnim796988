addEventListener("load", init);
addEventListener("click", createSystemAtMouse);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
let orbiters = [];
let planets = [];
let balls = [];
let ships = [];
var mouse;
var system;
var f;
let colors = [];
var hue = 0;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  system = new System();
  mouse = new MouseEvent("click");

  loadPlanets(2);
  loadShips(100);

  animate();
}

function loadPlanets(numPlanets){
  for(let i = 0; i < numPlanets; i++){
    planets.push(new Planet(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius, Math.random()*1.6-.8, Math.random()*1.6-.8, 20, 'white', Math.floor(Math.random()*10+4)));
    planets[i].createOrbiters();
  }
}

function loadShips(numShips){
  for(let i = 0; i < numShips; i++){
    ships.push(new Ship(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*4-2, Math.random()*4-2, 10, 100, 'hsl(310, 90%, 50%)'));
  }
}

function createSystemAtMouse(mouse){
  system.particleSystems.push(new ParticleSystem(mouse.clientX, mouse.clientY, 0, 0, 0, 7, 100));
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  system.run();
  for(let k = 0; k < ships.length; k++){
    ships[k].run();
  }

  // check which planet ship is close to
  // orbit that planet if within 100 pixels
  for(let m = 0; m < ships.length; m++){
    ships[m].run();
  }
  // iterate through orbiters array
  // assign colors
  // draw line from planet to orbiter
  for(j = 0; j < orbiters.length; j++){
    orbiters[j].run();

    context.lineWidth = 1;
    context.strokeStyle = 'hsl(' + orbiters[j].hue + ', ' + 100 + '%, ' + 50 + '%)';
    context.moveTo(orbiters[j].planet.loc.x, orbiters[j].planet.loc.y);
    context.lineTo(orbiters[j].loc.x, orbiters[j].loc.y);
    context.stroke();
  }
  // assign colors to planets and run each planet
  for(let j = 0; j < planets.length; j++){
    planets[j].color = 'hsl(' + hue + ', ' + 90 + '%, ' + 50 + '%)';
    hue+=.1;
    planets[j].run();
  }
}
