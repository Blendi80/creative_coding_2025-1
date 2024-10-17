import Letter from "./letter.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    this.createCanvas();
    this.letter = new Letter(200, 200, 100);
    this.initInteraction();
    this.draw();
  }

  createCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  initInteraction() {
    document.addEventListener("click", (e) => {
      this.letter.reset(e.x, e.y);
    });
  }

  draw() {
    this.ctx.fillStyle = "rgba(0, 100, 150, 0.009)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.letter.update();
    this.letter.draw(this.ctx);

    requestAnimationFrame(this.draw.bind(this));
  }
}
