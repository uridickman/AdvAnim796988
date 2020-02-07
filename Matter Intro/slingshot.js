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

    
    
    // World.add(engine.world, [this.rock, this.elastic]);
}