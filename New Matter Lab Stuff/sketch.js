var req = new XMLHttpRequest();

req.addEventListener("load", function(){
  console.log(this);
});

req.open("GET", "http://localhost:8080/practice.json");

var canvas;
var context;
//++++++++++++++++++++  Declare Matter and shape variables as global
var Engine,
  World,
  Bodies,
  Body,
  Composite,
  Composites,
  Events,
  Vector,
  Constraint,
  MouseConstraint,
  Mouse;
var mouseConstraintVar,
  mouseVar;
var engine;
var ground,
  pyramid,
  slingshot,
  cloud,
  rects = [];
let colors = [],
  rocks = [];

function init() {
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  canvas.style.backgroundColor = "rgb(135,206,250)";

  context = canvas.getContext("2d");
  //++++++++++++++++++++++++  Init Matter variables
  Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
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
  colors = ['rgb(204, 51, 255)', 'rgb(255, 51, 204)', 'rgb(255, 0, 102)', 'rgb(204, 0, 0)', 'rgb(255, 51, 0)', 'rgb(255, 153, 51)', 'rgb(153, 204, 0)', 'rgb(102, 255, 51)', 'rgb(0, 153, 0)', 'rgb(0, 204, 0)', 'rgb(0, 204, 102)', 'rgb(0, 204, 153)', 'rgb(0, 153, 153)', 'rgb(0, 102, 153)', 'rgb(0, 204, 255)', 'rgb(102, 153, 255)', 'rgb(153, 102, 255)', 'rgb(153, 0, 255)'];


  ground = new Rectangle(canvas.width / 2, canvas.height - 120, canvas.width + 50, 240, true);

  var transX = 100;
  var transY = ground.y - ground.height/2;

  var initbodies = initWorld.bodies;
  for (let i = 0; i < initbodies.length; i++) {
    let body = initbodies[i];
    rects.push(new Rectangle(transX + body.position.x, transY + body.position.y, body.size.width, body.size.height));
    rects[i].newRect.friction = .7;
    World.add(engine.world, [rects[i].newRect]);
    transX = 100;
  }


  slingshot = new Slingshot(170, 500);

  pyramid = new Pyramid(canvas.width / 2 + 310, ground.y - 200, 5, 25, 40);

  //fill each rectangle in pyramid with a random color from colors[]
  // for(let i = 0; i < pyramid1.pyramid.bodies.length; i++){
  //   pyramid1.fillStyle[i] = colors[Math.floor(Math.random()*(colors.length-1))];
  // }

  // add engine.World and all of the bodies to the world
  World.add(engine.world, [ground.newRect, slingshot]);

  render();

  //add new rock to rocks[] and world after a rock released from slingshot
  Events.on(engine, 'afterUpdate', function () {
    if (mouseConstraintVar.mouse.button === -1 && (slingshot.rock.position.x > slingshot.x + 20 || slingshot.rock.position.y < slingshot.y - 20)) {
      slingshot.onRelease();
    }
  });
}

// draws by connecting vertices if not a rectangle or pyramid (for now)
function drawPolygon(body) {
  context.strokeStyle = "black 10px";

  var vertex = body.vertices;

  context.moveTo(vertex[0].x, vertex[0].y);

  for (var j = 1; j < vertex.length; j += 1) {
    context.lineTo(vertex[j].x, vertex[j].y);
  }

  context.lineTo(vertex[0].x, vertex[0].y);
  context.stroke();
}

//distance formula
function distance(xOne, yOne, xTwo, yTwo) {
  return Math.sqrt((xOne - xTwo) * (xOne - xTwo) + (yOne - yTwo) * (yOne - yTwo));
}

function render() {
  // console.log(boxA.newRect.angularSpeed)
  window.requestAnimationFrame(render);

  context.clearRect(0, 0, canvas.width, canvas.height);


  Engine.update(engine, 1000 / 60);

  context.beginPath();
  context.fillStyle = "rgb(12, 12, 12)";
  ground.run();

  //draw circle on anchor
  context.beginPath();
  context.fillStyle = "red";
  // context.arc(slingshot.anchor.x, slingshot.anchor.y, 9, 0, 2 * Math.PI, false);
  // context.fill();
  // context.closePath();

  //calls run function from pyramids
  // pyramid.run();

  for(let i = 0; i < rects.length; i++){
    rects[i].run();
  }




  //loop through rocks[] and draw each one
  // for (let i = 0; i < rocks.length; i++) {
  //   drawPolygon(rocks[i]);
  // }

  //draw line from anchor to rock connected to it
  // context.beginPath();
  // context.strokeStyle = "black 20px";
  // context.moveTo(slingshot.anchor.x, slingshot.anchor.y);
  // context.lineTo(rocks[rocks.length - 1].position.x, rocks[rocks.length - 1].position.y)
  // context.stroke();

}
