addEventListener("load", init);

var canvas;
var context;
var Engine,
    World,
    Bodies,
    Composite;
var engine;

function init(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 600;

  context = canvas.getContext("2d");

  document.body.appendChild(canvas);

  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgb(12, 12, 12)";

  Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  engine = Engine.create();

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);

  render();
}

function render(){

  var bodies = Composite.allBodies(engine.world);

  window.requestAnimationFrame(render);
  Engine.update(engine, 1000 / 60);

  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();

  for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;

        context.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
        }

        context.lineTo(vertices[0].x, vertices[0].y);
    }

    context.lineWidth = 1;
    context.strokeStyle = '#999';
    context.stroke();
}
