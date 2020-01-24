addEventListener("load", init);

var canvas;
var context;
//++++++++++++++++++++  Declare Matter variables as global
var Engine,
    World,
    Bodies,
    Composite,
    Events,
    Constraint,
    MouseConstraint,
    Mouse;
var engine;
var boxA,
    boxB,
    ground;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 600;
  context = canvas.getContext("2d");
  //++++++++++++++++++++++++  Init Matter variables
  Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

  // create two boxes and a ground
  boxA = new Rectangle(400, 200, 80, 80);
  boxB = new Rectangle(450, 50, 80, 80);
  ground = new Rectangle(400, 610, 810, 60, true);

  //Create the physics engine
  engine = Engine.create();
  // add engine.World and all of the bodies to the world
  
  render();
}

function render(){
  //  +++++++++++++++++++++++++++++++++++++++  ???
  var bodies = Composite.allBodies(engine.world);

  Engine.update(engine, 1000/60); //+++++++++  ???
  context.fillStyle = '#003';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  //calls run function from Rectangles
  boxA.run();
  boxB.run();
  ground.run();

  context.lineWidth = 5;
  context.strokeStyle = '#A0A';
  context.stroke();

  window.requestAnimationFrame(render);
}
