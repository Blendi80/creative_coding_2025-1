import Easing from "./easing.js";

export default class Letter {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.targetx = x;
    this.targety = y;
    this.radius = radius;
    this.character = "B";
    this.speed = 0.05;
    this.timing = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#fb5607";
    ctx.font = `${this.radius * 2}px Times New Roman`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.character, this.x, this.y);
  }

  update() {
    this.timing += this.speed;
    if (this.timing > 1) this.timing = 1;

    this.x =
      this.x + (this.targetx - this.x) * Easing.easeInBounce(this.timing);
    this.y =
      this.y + (this.targety - this.y) * Easing.easeInBounce(this.timing);
  }

  reset(x, y) {
    this.targetx = x;
    this.targety = y;
    this.timing = 0;
  }
}
