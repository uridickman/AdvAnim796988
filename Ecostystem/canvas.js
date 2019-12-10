addEventListener("load", init);
// addEventListener("click", createSystemAtMouse);

var canvas;
var context;
var radius = 30;
var loc;
var vel;
let orbiters = [];
let planets = [];
let balls = [];
let ships = [];
// var mouse;
var particleSystems = [];
var system;
var f;
let colors = [];
var hue = 0;
var snakeSystem;
var flock1;
var flock2;
let boidsRed = [];
let boidsBlue = [];
let predators = [];
var image = null;

function init(){
  canvas = document.getElementById("cnv");


  // canvas.width = 800;
  // canvas.height = 800;

  canvas.width = window.innerWidth + 400;
  canvas.height = window.innerHeight + 400;

  context = canvas.getContext("2d");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  system = new System();
  snakeSystem = new SnakeSystem(5);
  // mouse = new MouseEvent("click");
  flock1 = new Flock(100, 2, .2, "red");
  flock2 = new Flock(100, 2, .2, "blue");
  //x, y, vx, vy, color

  loadShips(150);
  for(let i = 0; i < 10; i++){
    predators.push(new Predator(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*2-1, Math.random()*2-1, 'green'));
  }

  image = new Image();   // Create new img element
  image.src = 'trololol.png';

  loadPlanets(3);
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
    ships.push(new Ship(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*2-1, Math.random()*2-1, 10, 100, 'hsl(310, 90%, 50%)'));
  }
}

function repealAndReplaceShip(){
  for(let i = ships.length-1; i > 0; i--){
    if(ships[i].isEaten){
      particleSystems.push(new ParticleSystem(ships[i].planet.loc.x, ships[i].planet.loc.y, 3, 3, 0, 7, 10));
      ships.splice(i, 1);
      ships.push(new Ship(Math.random()*(canvas.width), Math.random()*(canvas.height), Math.random()*2-1, Math.random()*2-1, 10, 100, 'hsl(310, 90%, 50%)'));
    }
  }
}


// function createSystemAtMouse(mouse){
//   system.particleSystems.push(new ParticleSystem(mouse.clientX, mouse.clientY, 0, 0, 0, 7, 100));
// }

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  flock1.run();
  flock2.run();
  for(let i = 0; i < predators.length; i++){
    predators[i].run();
  }
  for(let k = 0; k < ships.length; k++){
  ships[k].run();
  }
  // snakeSystem.run();

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
  repealAndReplaceShip();
  for(let i = 0; i < particleSystems.length; i++){
    particleSystems[i].run();
  }
}
