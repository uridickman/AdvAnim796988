function Slingshot(){
    // add bodies
    this.rockOptions = { density: 0.004 };
    this.rock = Bodies.polygon(170, 450, 8, 20, this.rockOptions);
    this.anchor = { x: 170, y: 450 };
    this.elastic = Constraint.create({
            pointA: this.anchor,
            bodyB: this.rock,
            stiffness: 0.05,
            length: 20

        });
    
    World.add(engine.world, [this.rock, this.elastic]);

    //temp vars to save info about object vars
    var el = this.elastic;
    var rOptions = this.rockOptions;
    var r = this.rock;

    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraintVar.mouse.button === -1 && (r.position.x > 190 || r.position.y < 430)) {
            r = Bodies.polygon(170, 450, 7, 20, rOptions);
            World.add(engine.world, [r]);
            el.bodyB = r;
        }
        
    });

    this.rock = r;
    this.elastic = el;
    this.rockOptions = rOptions;
    
    // World.add(engine.world, [this.rock, this.elastic]);
}