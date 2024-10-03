import Circle from "./circle.js";
import Lettre from "./lettre.js";
export default class App {
  constructor() {
    this.canvas;
    this.ctx;
  }
  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }
  circle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    // this.ctx.stroke();
    this.ctx.fill();
  }

  createGrid() {
    const maLettre = new Lettre(this.ctx);
    let stepX = 30;
    let stepY = 15;
    let radius = 10;
    let spaceX = window.innerWidth / stepX;
    let spaceY = window.innerHeight / stepY;

    for (let i = 0; i < stepX; i++) {
      for (let j = 0; j < stepY; j++) {
        // do something
        maLettre.drawLettre(
          i * spaceX + radius,
          j * spaceY + radius,
          "B",
          55,
          "blue"
        );
      }
    }
  }
}
