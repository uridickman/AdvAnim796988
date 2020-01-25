function Slingshot(){
    // create engine
    // var engine = Engine.create(),

    // create renderer
    // var render = Render.create({
    //     element: document.body,
    //     engine: engine,
    //     options: {
    //         width: 800,
    //         height: 600,
    //         showAngleIndicator: true
    //     }
    // });

    // Render.run(render);

    // create runner
    // var runner = Runner.create();
    // Runner.run(runner, engine);

    // add bodies
    this.ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
    this.rockOptions = { density: 0.004 },
    this.rock = Bodies.polygon(170, 450, 8, 20, this.rockOptions),
    this.anchor = { x: 170, y: 450 },
    this.elastic = Constraint.create({
            pointA: this.anchor,
            bodyB: this.rock,
            stiffness: 0.05
        });

    // this.pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 25, 40);
    // });

    // this.ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

    // this.pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 25, 40);
    // });

    

    // Events.on(engine, 'afterUpdate', function() {
    //     if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
    //         rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
    //         World.add(engine.world, rock);
    //         elastic.bodyB = rock;
    //     }
    // });

    // // add mouse control
    // var mouse = Mouse.create(canvas),
    //     mouseConstraint = MouseConstraint.create(engine, {
    //         mouse: mouse,
    //         constraint: {
    //             stiffness: 0.2,
    //             // render: {
    //             //     visible: false
    //             // }
    //         }
    //     });

    // World.add(World, [mouseConstraint]);

    // keep the mouse in sync with rendering
    // render.mouse = mouse;

    // fit the render viewport to the scene
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    // });

    // context for MatterTools.Demo
    // return {
    //     engine: engine,
    //     // runner: runner,
    //     // render: render,
    //     canvas: canvas,
    //     // stop: function() {
    //     //     Matter.Render.stop(render);
    //     //     Matter.Runner.stop(runner);
    //     // }
    // };
}

// if (typeof module !== 'undefined') {
//     module.exports = Example[Object.keys(Example)[0]];
// }
Slingshot.prototype.run = function(){
    World.add(engine.world, [this.ground,  this.rock, this.elastic]);
}