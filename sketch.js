let creatures = [];
let targets = [];

let ripple;

function setup() {
  createCanvas(300, 300);
  ripple = new Ripple(width, height, 0.99, 1);
  targetCentral = new Target(width / 2, height / 2, 100, 0.005);
  targets.push(targetCentral);

  target1 = new Target(width / 10, height / 10, 100, 0.002);
  targets.push(target1);
  target2 = new Target(width - width / 10, height / 10, 100, 0.002);
  targets.push(target2);
  target3 = new Target(width / 10, height - height / 10, 100, 0.002);
  targets.push(target3);
  target4 = new Target(width - width / 10, height - height / 10, 100, 0.002);
  targets.push(target4);

  for (let i = 0; i < 20; i++) {
    let creature = new Creature(random(width), random(height));
    creatures.push(creature);
  }
  rectMode(CENTER);
  pixelDensity(1);
  noSmooth();
}

function draw() {
  noSmooth();
  background(255);
  ripple.update();
  ripple.display();

  // if (frameCount % 10 === 0) {
  //   ripple.disturb(width / 10, height / 10, 10, 0.01);
  //   ripple.disturb(width - width / 10, height / 10, 10, 0.01);
  //   ripple.disturb(width / 10, height - height / 10, 10, 0.01);
  //   ripple.disturb(width - width / 10, height - height / 10, 10, 0.01);
  // }

  for (let target of targets) {
    target.update();
    target.display();

    //let targetPos = target.getPosition();

    for (let creature of creatures) {
      let prevVel = creature.vel.copy();
      creature.applyBehavior(targets);
      creature.applyRepulsion(creatures); // 应用排斥力
      creature.update();
      creature.randomSwing(0.001);
      creature.checkForRipple(prevVel); // 检查并触发涟漪
      creature.show();
      creature.edges();

      // if (frameCount % 60 === 0) {
      //   ripple.disturb(Math.floor(creature.pos.x), Math.floor(creature.pos.y));
      // }

      if (frameCount % 600 === 0) {
        creature.toggleBehavior();
        ripple.disturb(Math.floor(creature.pos.x), Math.floor(creature.pos.y));
      }
    }
  }
}
