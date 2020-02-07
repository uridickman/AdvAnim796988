addEventListener("load", init);
addEventListener("afterupdate", createNewRock);

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
var updateEvent = new Event("afterUpdate");
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
let colors = [],
    rocks = [];

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
  boxC = new Rectangle(canvas.width/2 - 530, canvas.height - 350, 80, 80);
  // boxC = Bodies.rectangle(canvas.width/2 - 180, canvas.height - 350, 80, 80, { isStatic: false} );
  ground = new Rectangle(canvas.width/2, canvas.height - 120, canvas.width + 10, 40, true);
  // ground2 = new Rectangle(canvas.width/2, 250, 200, 20, true);
  slingshot = new Slingshot();

  pyramid1 = new Pyramid(canvas.width/2 + 310, canvas.height - 500, 25, 40, 9, 10);
  // pyramid2 = new Pyramid(canvas.width/2 - 50, 0, 25, 40, 5, 10);
  for(let i = 0; i < pyramid1.pyramid.bodies.length; i++){
    pyramid1.fillStyle[i] = colors[Math.floor(Math.random()*(colors.length-1))];
  }
  
  // add engine.World and all of the bodies to the world
  World.add(engine.world, [ground.newRect, pyramid1.pyramid, boxC.newRect, slingshot]);
  
  

  render();
}

function createNewRock(){
  //temp vars to save info about object vars
  var el = slingshot.elastic;
  var rOptions = slingshot.rockOptions;
  var r = slingshot.rock;
  if (mouseConstraintVar.mouse.button === -1 && (r.position.x > 190 || r.position.y < 430)) {
    r = Bodies.polygon(170, 450, 7, 20, rOptions);
    World.add(engine.world, [r]);
    el.bodyB = r;
  }

  slingshot.rock = r;
  slingshot.elastic = el;
  slingshot.rockOptions = rOptions;
}

//draws by connecting vertices if not a rectangle or pyramid (for now)
function drawPolygon(body){
  context.strokeStyle = "black 10px";
  
  var vertice = body.vertices;

  context.moveTo(vertice[0].x, vertice[0].y);

  for (var j = 1; j < vertice.length; j += 1) {
      context.lineTo(vertice[j].x, vertice[j].y);
  }

  context.lineTo(vertice[0].x, vertice[0].y);
  context.stroke();
}

function distance(xOne, yOne, xTwo, yTwo){
  return Math.sqrt((xOne-xTwo)*(xOne-xTwo) + (yOne-yTwo)*(yOne-yTwo));
}

function render(){
  // console.log(boxA.newRect.angularSpeed)
  window.requestAnimationFrame(render);
  context.clearRect(0,0, canvas.width, canvas.height)

  
  Engine.update(engine, 1000/60);
  window.dispatchEvent(updateEvent);

  context.beginPath();

  //adjust time scale for debugging
  // engine.timing.timeScale = .001;

  boxC.run();

  ground.run();

  drawPolygon(slingshot.rock);

  //draw circle on anchor
  context.beginPath();
  context.fillStyle = "red";
  context.arc(slingshot.anchor.x, slingshot.anchor.y, 9, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

  //calls run function from pyramids
  pyramid1.run();
  
  // let newRock = Bodies.polygon(170, 450, 7, 20, slingshot.rockOptions);

  // if (mouseConstraintVar.mouse.button != -1 && distance(slingshot.rock.position.x, slingshot.rock.position.y, slingshot.anchor.x, slingshot.anchor.y) < 160) {
  //   let r = slingshot.rock;
  //   let a = slingshot.anchor;
  //   context.beginPath();
  //   context.moveTo(r.position.x, r.position.y);
  //   context.lineTo(a.x, a.y);
  //   context.stroke();
  //   // World.add(engine.world, [newRock])
  // }

  // drawPolygon(newRock);
  
}
