let creatures = [];
let targets = [];

let ripple;
let lineTarget;

function setup() {
  createCanvas(300, 300);
  ripple = new Ripple(width, height, 0.99, 1);
  // targetCentral = new RotationTarget(width / 2, height / 2, 100, 0.005);
  // targets.push(targetCentral);

  lineTarget1 = new LineTarget(width / 2, height / 2, width / 2 , 0, 0.5);
  targets.push(lineTarget1);
  lineTarget2 = new LineTarget(width / 2, height / 2, 0 , height/2, 0.5);
  targets.push(lineTarget2);
  lineTarget3 = new LineTarget(width / 2, height / 2, width / 2 , height, 0.5);
  targets.push(lineTarget3);
  lineTarget4 = new LineTarget(width / 2, height / 2, width, height/2, 0.5);
  targets.push(lineTarget4);

  // target1 = new rotationTarget(width / 10, height / 10, 100, 0.002);
  // targets.push(target1);
  // target2 = new rotationTarget(width - width / 10, height / 10, 100, 0.002);
  // targets.push(target2);
  // target3 = new rotationTarget(width / 10, height - height / 10, 100, 0.002);
  // targets.push(target3);
  // target4 = new rotationTarget(width - width / 10, height - height / 10, 100, 0.002);
  // targets.push(target4);

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
  background(0);
  ripple.update();
  ripple.display();
  // lineTarget.update();
  // lineTarget.display();

  if (frameCount % 20 === 0) ripple.disturb(width / 2, height / 2, 10, 0.01);

  // if (frameCount % 10 === 0) {
  //   ripple.disturb(width / 10, height / 10, 10, 0.01);
  //   ripple.disturb(width - width / 10, height / 10, 10, 0.01);
  //   ripple.disturb(width / 10, height - height / 10, 10, 0.01);
  //   ripple.disturb(width - width / 10, height - height / 10, 10, 0.01);
  // }

  for (let target of targets) {
    target.update();
    target.display();
  }
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
