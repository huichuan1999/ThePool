class LineTarget {
  constructor(x1, y1, x2, y2, linearSpeed) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.pos = this.start.copy();
    this.direction = p5.Vector.sub(this.end, this.start); // 正确计算方向向量
    this.direction.normalize();
    this.linearSpeed = linearSpeed;
    this.movingToEnd = true;
  }

  update() {
    let speed = this.direction.copy().mult(this.linearSpeed); // 计算速度向量
    if (this.movingToEnd) {
      this.pos.add(speed); // 向终点移动
      if (p5.Vector.dist(this.pos, this.end) < this.linearSpeed) {
        this.movingToEnd = false; // 到达终点后改变方向
      }
    } else {
      this.pos.sub(speed); // 向起点移动
      if (p5.Vector.dist(this.pos, this.start) < this.linearSpeed) {
        this.movingToEnd = true; // 到达起点后改变方向
      }
    }
  }

  display() {
    fill(255);
    circle(this.pos.x, this.pos.y, 3); // 使用 pos 的坐标来绘制
  }

  getPosition() {
    return this.pos.copy(); // 返回位置的副本
  }
}
