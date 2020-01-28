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
    ground,
    slingshot;

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
  Composites = Matter.Composites,
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
  slingshot = new Slingshot();
  // add engine.World and all of the bodies to the world
  World.add(engine.world, [boxA.newRect, boxB.newRect, ground.newRect]);
  
  render();
}

// function drawPolygon(){
  
// }

function render(){
  //  +++++++++++++++++++++++++++++++++++++++  ???
  // var bodies = Composite.allBodies(engine.world);

  window.requestAnimationFrame(render);

  Engine.update(engine, 1000/60); //+++++++++  ???
  // context.fillStyle = '#003';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  // engine.timing.timeScale = .001;

  //calls run function from Rectangles
  ground.run();
  boxA.run();
  boxB.run();
  
  slingshot.run();

  context.lineWidth = 5;
  context.strokeStyle = '#A0A';
  context.stroke();
}
