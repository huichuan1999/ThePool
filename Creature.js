class Creature{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 0.5;
    this.maxForce = 0.1;
    this.r = 10;
    this.behavior = 'seek'; // 初始行为设为 seek
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
    randomSwing.mult(intensity);
    this.acc.add(randomSwing);
  }
  
  update(){
    this.vel.add(this.acc);
    this.vel.mult(0.9); // Apply damping
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    
    this.acc.set(0,0);//在每一帧的末尾重置加速度向量,以防止加速度在连续的帧之间累积
  }
  
  show(){
    stroke(255);
    strokeWeight(1);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r,-this.r/2,-this.r,this.r/2,this.r,0);
    // rectMode(CENTER);
    // rect(0,0,this.r,this.r);
    pop();
  }
  
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  
   checkForRipple(prevVel) {
    // 如果生物的速度方向发生了显著变化，则在其位置产生水波纹
    if (this.vel.heading() !== prevVel.heading()) {
      ripple.disturb(Math.floor(this.pos.x), Math.floor(this.pos.y));
    }
  }
  
  applyBehavior(target) {
    let force;
    if (this.behavior === 'seek') {
      force = this.seek(target);
    } else {
      force = this.flee(target);
    }
    this.applyForce(force);
  }
  
}