import Word from "./Word.js";

export default class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.word = new Word("Creative");

    this.isMouseDown = false;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.word.resize(this.canvas.width, this.canvas.height);
  }

  onMouseDown() {
    this.isMouseDown = true;
    this.word.gather();
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.word.scatter();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.word.update(this.canvas.width, this.canvas.height);
    this.word.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}
