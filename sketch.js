let creatures = [];
let targets = [];

let ripple;
let lineTarget;

function setup() {
  createCanvas(300, 300);
  ripple = new Ripple(width, height, 0.99, 1);
  targetCentral = new RotationTarget(width / 2, height / 2, 100, 0.005);
  targets.push(targetCentral);

  // lineTarget1 = new LineTarget(width / 2, height / 2, width / 2 , 0, 0.5);
  // targets.push(lineTarget1);
  // lineTarget2 = new LineTarget(width / 2, height / 2, 0 , height/2, 0.5);
  // targets.push(lineTarget2);
  // lineTarget3 = new LineTarget(width / 2, height / 2, width / 2 , height, 0.5);
  // targets.push(lineTarget3);
  // lineTarget4 = new LineTarget(width / 2, height / 2, width, height/2, 0.5);
  // targets.push(lineTarget4);

  target1 = new RotationTarget(width / 10, height / 10, 100, 0.002);
  targets.push(target1);
  target2 = new RotationTarget(width - width / 10, height / 10, 100, 0.002);
  targets.push(target2);
  target3 = new RotationTarget(width / 10, height - height / 10, 100, 0.002);
  targets.push(target3);
  target4 = new RotationTarget(width - width / 10, height - height / 10, 100, 0.002);
  targets.push(target4);

  for (let i = 0; i < 20; i++) {
    let creature = new Creature(random(width), random(height));
    creatures.push(creature);
  }
  //rectMode(CENTER);
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
    //console.log(target.movingToEnd);
    target.display();
  }
  //let targetPos = target.getPosition();

  for (let creature of creatures) {
    let prevVel = creature.vel.copy();
    creature.applyBehavior(targets);
    creature.applyRepulsion(creatures); // 应用排斥力
    creature.update();
    //console.log(creature.r);
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
      // console.log(frameCount);
      console.log(getMinutesSinceMorning());
    }
  }
  noFill();
  stroke(255);
  rect(1,1,width-1,height-1);
  //console.log(getMinutesSinceMorning());

}

function getMinutesSinceMorning() {
  //上午9点到晚上5点的分钟差是480
  //上午9点到晚上5点的分钟差是540
  let now = new Date();
  let morning = new Date(); // 当天的上午9点
  //now.setHours(18,0,0,0);
  morning.setHours(9, 0, 0, 0); // 设置时间为上午9点

  let diff = now - morning; // 毫秒差
  return Math.floor(diff / 60000); // 转换为分钟
}