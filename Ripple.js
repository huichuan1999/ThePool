class Ripple {
  constructor(cols, rows, dampening, pixelSize) {
    this.cols = cols;
    this.rows = rows;
    this.dampening = dampening;
    this.pixelSize = pixelSize; // 新增：像素放大尺寸
    this.current = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
    this.previous = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
  }

  update() {
    for (let i = 1; i < this.cols - 1; i++) {
      for (let j = 1; j < this.rows - 1; j++) {
        this.current[i][j] =
          (this.previous[i - 1][j] +
            this.previous[i + 1][j] +
            this.previous[i][j - 1] +
            this.previous[i][j + 1]) / 2 -
          this.current[i][j];
        this.current[i][j] *= this.dampening;
      }
    }

    let temp = this.previous;
    this.previous = this.current;
    this.current = temp;
  }

  display() {
    loadPixels();
    for (let i = 1; i < this.cols - 1; i++) {
      for (let j = 1; j < this.rows - 1; j++) {
        let index = (i + j * this.cols) * 4;
        pixels[index + 0] = this.current[i][j];
        pixels[index + 1] = this.current[i][j];
        pixels[index + 2] = this.current[i][j];
      }
    }
    updatePixels();
  }

  // display() {
  //   for (let i = 1; i < this.cols - 1; i++) {
  //     for (let j = 1; j < this.rows - 1; j++) {
  //       let val = this.current[i][j];
  //       fill(val);
  //       noStroke();
  //       // 绘制放大的像素方块
  //       rect(i * this.pixelSize, j * this.pixelSize, this.pixelSize, this.pixelSize,4,4);
  //     }
  //   }
  // }

  disturb(x, y) {
    if (x > 0 && x < this.cols && y > 0 && y < this.rows) {
      this.previous[x][y] = 200; //数值越小 涟漪越不明显
    }
  }
}
