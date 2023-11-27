let creatures = [];
let targets = [];

let ripple;

function setup() {
  createCanvas(400, 400);
  ripple = new Ripple(width, height, 0.99);
  targetCentral = new Target(width / 2, height / 2, 100, 0.01);
  targets.push(targetCentral);

  target1 = new Target(width / 10, height / 10, 20, 0.01);
  targets.push(target1);
  target2 = new Target(width - width / 10, height / 10, 20, 0.01);
  targets.push(target2);
  target3 = new Target(width / 10, height - height / 10, 20, 0.01);
  targets.push(target3);
  target4 = new Target(width - width / 10, height - height / 10, 20, 0.01);
  targets.push(target4);

  for (let i = 0; i < 4; i++) {
    let creature = new Creature(random(width), random(height));
    creatures.push(creature);
  }
  pixelDensity(1);
}

function draw() {
  background(255);
  ripple.update();
  ripple.display();

  if (frameCount % 10 === 0) {
    ripple.disturb(width / 10, height / 10, 10, 0.01);
    ripple.disturb(width - width / 10, height / 10, 10, 0.01);
    ripple.disturb(width / 10, height - height / 10, 10, 0.01);
    ripple.disturb(width - width / 10, height - height / 10, 10, 0.01);
  }

  for (let target of targets) {
    target.update();
    target.display();

    //let targetPos = target.getPosition();

    for (let creature of creatures) {
      creature.applyBehavior(target.getPosition());
      creature.update();
      //creature.randomSwing(0.2);
      creature.show();
      creature.edges();

      if (frameCount % 60 === 0) {
        ripple.disturb(Math.floor(creature.pos.x), Math.floor(creature.pos.y));
      }

      if (frameCount % 600 === 0) {
        creature.toggleBehavior();
        ripple.disturb(Math.floor(creature.pos.x), Math.floor(creature.pos.y));
      }
    }
  }
}
