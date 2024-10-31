import Letter from "./Letter.js";
import DrawingTool from "./DrawingTool.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    this.createCanvas();
    this.letter = new Letter(this.width / 2, this.height / 2, "STOP");
    this.drawingTool = new DrawingTool(this.ctx);
    this.isAnimating = true;

    this.canvas.addEventListener("mousedown", this.stopAnimation.bind(this));
    this.canvas.addEventListener("mouseup", this.startAnimation.bind(this));

    this.draw();
  }

  createCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.letter.move();
    this.drawingTool.addPoint(this.letter.x, this.letter.y);

    this.drawingTool.allPoints.forEach((point, index) => {
      const color =
        index === this.drawingTool.allPoints.length - 1 ? "#ccff00" : "#76b918";
      this.letter.drawAt(this.ctx, point.x, point.y, color);
    });

    if (this.isAnimating) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  stopAnimation() {
    this.isAnimating = false;
  }

  startAnimation() {
    this.isAnimating = true;
    this.draw();
  }
}
