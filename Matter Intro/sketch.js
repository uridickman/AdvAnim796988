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
    ground2,
    wallOne,
    wallTwo,
    pyramid1,
    pyramid2,
    slingshot;

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

  //Create the physics engine
  engine = Engine.create();

  // create two boxes and a ground
  boxA = new Rectangle(400, 200, 80, 80);
  boxB = new Rectangle(450, 50, 80, 80);
  ground = new Rectangle(400, 610, canvas.width + 10, 60, true);
  ground2 = new Rectangle(610, 250, 200, 20, true);
  wallOne = new Rectangle(0, canvas.height/2 - 25, 60, canvas.height + 10, true);
  wallTwo = new Rectangle(canvas.width, canvas.height/2 - 25, 60, canvas.height + 10, true);
  pyramid1 = new Pyramid(500, 300, 25, 40, 9, 10);
  pyramid2 = new Pyramid(550, 0, 25, 40, 5, 10);
  slingshot = new Slingshot();
  
  // add engine.World and all of the bodies to the world
  World.add(engine.world, [boxA.newRect, boxB.newRect, ground.newRect, ground2.newRect, pyramid1.pyramid, pyramid2.pyramid]);

  render();
}

function render(){

  window.requestAnimationFrame(render);

  Engine.update(engine, 1000/60);
  // context.fillStyle = '#003';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  //++++++++++++++++++++++++++++++++adjust time scale for debugging
  // engine.timing.timeScale = .001;

  //calls run function from Rectangles
  ground.run();
  ground2.run();
  // wallOne.run();
  // wallTwo.run();
  boxA.run();
  boxB.run();

  //calls run function from pyramids
  pyramid1.run();
  pyramid2.run();

  context.lineWidth = 5;
  context.strokeStyle = '#A0A';
  context.stroke();
}
