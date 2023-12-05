class Creature{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    
    this.maxSpeed = 0.7;
    this.maxForce = 0.05;
    this.r = 3;
    this.repulsionRadius = 30; // 排斥力作用范围

    this.behavior = 'seek'; // 初始行为设为 seek
    this.perceptionRadius = 200; // 新增检测范围

    this.updateTimeParam();
  }
  
  crawling() {
    let angle = noise(this.pos.x / 500, this.pos.y / 500, frameCount / 20) * TWO_PI * 2; //0-2PI
    this.pos.x += this.vel.x * cos(angle) * 3;
    this.pos.y += this.vel.y * sin(angle) * 3;
  }

  updateTimeParam(){
    let minutesSinceMorning = getMinutesSinceMorning();
     // 根据时间差调整速度和力
     this.maxSpeed = map(minutesSinceMorning, 0, 60*9, 1.0, 0.5); // 假设8小时内减慢到最小速度
     this.maxForce = map(minutesSinceMorning, 0, 60*9, 0.1, 0.03); // 同上
     this.r = map(minutesSinceMorning, 0, 60*9, 1, 4);
     this.repulsionRadius = map(minutesSinceMorning, 0, 60*9, 50, 10); // 排斥力作用范围
  }

  toggleBehavior() {
    // 切换行为模式
    this.behavior = (this.behavior === 'seek') ? 'flee' : 'seek';
  }
  
  flee(target) {
    return this.seek(target).mult(-1);
  }
  
  seek(target){
    //生成一个指向target的力
    let force = p5.Vector.sub(target,this.pos);
    
    //不然magnitude太大了看起来会瞬间传送
     force.setMag(this.maxSpeed);
    
    //非常重要，steering使之力的方向转向target
    force.sub(this.vel);
    
    force.limit(this.maxForce);
    
    //this.applyForce(steering);
    return force;
    
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  randomSwing(intensity){
    let randomSwing = p5.Vector.random2D();
    randomSwing.normalize(1);
    randomSwing.mult(intensity);
    //this.acc.add(randomSwing);
    this.applyForce(randomSwing);
  }
  
  update(){
    this.updateTimeParam();
    this.vel.add(this.acc);
    this.vel.mult(0.9); // Apply damping
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    
    this.acc.set(0,0);//在每一帧的末尾重置加速度向量,以防止加速度在连续的帧之间累积
  }
  
  show(){
    let alpha = map(sin(frameCount * 0.02), -1, 1, 0, 100); // 使用 sin 函数计算透明度
    stroke(255);
    fill(2555,alpha);
    strokeWeight(0.5);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r,-this.r,-this.r,this.r,this.r,0);
    //rect(0,0,this.r,this.r);
    pop();
  }
  
  edges() {
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1; // 反转水平速度分量
    } else if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1; // 反转水平速度分量
    }
  
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1; // 反转垂直速度分量
    } else if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1; // 反转垂直速度分量
    }
  }
  
  
  checkForRipple(prevVel) {
    let angleChange = getAngleBetween(prevVel, this.vel);
    //if (abs(angleChange) > PI/1.2) {
      ripple.disturb(Math.floor(this.pos.x), Math.floor(this.pos.y));
    //}
  }


  applyBehavior(targets) {
    
     let totalForce = createVector();
    for (let target of targets) {
      let d = p5.Vector.dist(this.pos, target.getPosition());
      if (d < this.perceptionRadius) { // 仅当目标在检测范围内时才作出反应
        let force = (this.behavior === 'seek') ? this.seek(target.getPosition()) : this.flee(target.getPosition());
        totalForce.add(force);
      }
    }
    this.applyForce(totalForce);
    
    //this.applyForce(force);
  }
  
  applyRepulsion(others) {
    let repulsionForce = createVector();
    for (let other of others) {
      if (other !== this) {
        let d = p5.Vector.dist(this.pos, other.pos);
        if ((d > 0) && (d < this.repulsionRadius)) {
          let diff = p5.Vector.sub(this.pos, other.pos);
          diff.div(d * d); // 排斥力与距离的平方成反比
          repulsionForce.add(diff);
        }
      }
    }
    this.applyForce(repulsionForce);
  }
  
}

function getAngleBetween(v1, v2) {
  let dot = v1.dot(v2);
  let mag1 = v1.mag();
  let mag2 = v2.mag();
  let angle = Math.acos(dot / (mag1 * mag2));
  return angle;
}