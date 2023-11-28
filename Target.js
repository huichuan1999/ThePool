class Target {
  constructor(x, y, radius, rotationSpeed) {
    this.center = createVector(x, y);
    this.radius = radius;
    this.rotationSpeed = rotationSpeed;
    this.angle = 0;
  }

  update() {
    // 更新目标点的位置
    this.angle += this.rotationSpeed;
    this.x = this.center.x + this.radius * cos(this.angle);
    this.y = this.center.y + this.radius * sin(this.angle);
  }

  display() {
    fill(255, 50);
    //circle(this.x, this.y, 12);
    push();
    translate(this.x, this.y);
    rect(0, 0, 12, 12);
    rotate(PI / 4);
    rect(0, 0, 12, 12);
    pop();
  }

  getPosition() {
    return createVector(this.x, this.y);
  }
}
