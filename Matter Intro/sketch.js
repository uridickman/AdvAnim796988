addEventListener("load", init);

var canvas;
var context;
//++++++++++++++++++++  Declare Matter and shape variables as global
var Engine,
    World,
    Bodies,
    Composite,
    Composites,
    Events,
    Constraint,
    MouseConstraint,
    Mouse;
var mouseConstraintVar,
    mouseVar;
var engine;
var boxA,
    boxB,
    boxC,
    ground,
    ground2,
    wallOne,
    wallTwo,
    pyramid1,
    pyramid2,
    slingshot;
let colors = [];

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  document.body.style.backgroundImage = "url(picture.jpg)";
  // canvas.setAttribute('style', "position: absolute;  left: 50%;margin-left:-400px; top: 50%;margin-top:-300px");
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

  // // add mouse control
  mouseVar = Mouse.create(canvas),
  mouseConstraintVar = MouseConstraint.create(engine, {
      mouse: mouseVar,
      constraint: {
          stiffness: 0.2,
      }
  });
  //add a mouse constraint to the world in order to lock objects to mouse when clicked
  World.add(engine.world, [mouseConstraintVar]);

  //array of colors
  colors = ['rgb(204, 51, 255)','rgb(255, 51, 204)','rgb(255, 0, 102)','rgb(204, 0, 0)','rgb(255, 51, 0)','rgb(255, 153, 51)','rgb(153, 204, 0)','rgb(102, 255, 51)','rgb(0, 153, 0)','rgb(0, 204, 0)','rgb(0, 204, 102)','rgb(0, 204, 153)','rgb(0, 153, 153)','rgb(0, 102, 153)','rgb(0, 204, 255)','rgb(102, 153, 255)','rgb(153, 102, 255)','rgb(153, 0, 255)'];

  // create two boxes and a ground
  boxC = new Rectangle(canvas.width/2 - 180, canvas.height - 350, 80, 80);
  ground = new Rectangle(canvas.width/2, canvas.height - 200, canvas.width + 10, 1, true);
  // ground2 = new Rectangle(canvas.width/2, 250, 200, 20, true);
  slingshot = new Slingshot();

  pyramid1 = new Pyramid(canvas.width/2 + 370, canvas.height - 500, 25, 40, 9, 10);
  // pyramid2 = new Pyramid(canvas.width/2 - 50, 0, 25, 40, 5, 10);
  for(let i = 0; i < pyramid1.pyramid.bodies.length; i++){
    pyramid1.fillStyle[i] = colors[Math.floor(Math.random()*(colors.length-1))];
  }
  
  // add engine.World and all of the bodies to the world
  World.add(engine.world, [ground.newRect, pyramid1.pyramid, boxC.newRect, slingshot]);

  render();
}

//draws by connecting vertices if not a rectangle or pyramid (for now)
function drawPolygon(body){
  
  var vertice = body.vertices;

  context.moveTo(vertice[0].x, vertice[0].y);

  for (var j = 1; j < vertice.length; j += 1) {
      context.lineTo(vertice[j].x, vertice[j].y);
  }

  context.lineTo(vertice[0].x, vertice[0].y);
}

function render(){
  // console.log(boxA.newRect.angularSpeed)
  window.requestAnimationFrame(render);
  context.clearRect(0,0, canvas.width, canvas.height)

  Engine.update(engine, 1000/60);

  context.beginPath();

  //adjust time scale for debugging
  // engine.timing.timeScale = .001;

  //calls run function from Rectangles
  ground.run();

  // drawPolygon(slingshot);
  boxC.run();

  //calls run function from pyramids
  pyramid1.run();
}
