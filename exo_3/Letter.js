export default class Letter {
  constructor(x, y, text = "Cos", fontSize = 80) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = "#57cc99";
    this.fontSize = fontSize;
    this.angleX = 0;
    this.angleY = 2;
    this.speedX = 1;
    this.speedY = 2;
    this.center = { x: x, y: y };
    this.motion_radiusX = 600;
    this.motion_radiusY = 200;
  }

  draw(ctx) {
    this.fontSize = 50;
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px "orbitron", sans serif`;
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = this.fontSize;
    ctx.fillText(this.text, this.x - textWidth / 2, this.y + textHeight / 2);
  }

  drawAt(ctx, x, y, color = this.color) {
    ctx.fillStyle = color;
    ctx.font = `${this.fontSize}px "orbitron", sans serif`;
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = this.fontSize;
    ctx.fillText(this.text, x - textWidth / 2, y + textHeight / 2);
  }

  move() {
    this.x =
      this.center.x +
      Math.cos((this.angleX * Math.PI) / 200) * this.motion_radiusX;
    this.y =
      this.center.y +
      Math.sin((this.angleY * Math.PI) / 180) * this.motion_radiusY;

    this.angleX += this.speedX;
    this.angleY += this.speedY;
  }
}
