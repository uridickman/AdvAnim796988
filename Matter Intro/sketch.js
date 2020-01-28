addEventListener("load", init);

var canvas;
var context;
//++++++++++++++++++++  Declare Matter variables as global
var Engine,
    World,
    Bodies,
    Composite,
    Composites,
    Events,
    Constraint,
    MouseConstraint,
    Mouse;
var engine;
var boxA,
    boxB,
    ground;
// var slingshot;

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 800;
  canvas.height = 600;
  canvas.setAttribute('style', "position: absolute;  left: 50%;margin-left:-400px; top: 50%;margin-top:-300px; border:2px solid black");
  context = canvas.getContext("2d");
  //++++++++++++++++++++++++  Init Matter variables
  Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

  // create two boxes and a ground
  boxA = new Rectangle(400, 200, 80, 80);
  boxB = new Rectangle(450, 50, 80, 80);
  ground = new Rectangle(400, 610, 810, 60, true);
  slingshot = new Slingshot();

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
  slingshot.run();

  context.lineWidth = 5;
  context.strokeStyle = '#A0A';
  context.stroke();

  window.requestAnimationFrame(render);
}