function Slingshot(){
    // add bodies
    this.rockOptions = { density: 0.004 };
    this.rock = Bodies.polygon(170, 450, 8, 20, this.rockOptions);
    this.anchor = { x: 170, y: 450 };
    this.elastic = Constraint.create({
            pointA: this.anchor,
            bodyB: this.rock,
            stiffness: 0.05
        });

    // // add mouse control
    var mouse = Mouse.create(canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
            }
        });

    World.add(engine.world, [mouseConstraint]);

    World.add(engine.world, [this.rock, this.elastic]);

    var rock = this.rock;

    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
            this.rock = Bodies.polygon(170, 450, 7, 20, this.rockOptions);
            World.add(engine.world, this.rock);
            this.elastic.bodyB = this.rock;
        }
    });
}