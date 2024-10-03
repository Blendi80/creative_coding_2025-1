export default class Lettre {
  constructor(context) {
    this.ctx = context;
  }

  drawLettre(x, y, letter, fontSize, color) {
    this.ctx.font = `${fontSize}px Helvetica`;
    this.ctx.fillText(letter, x, y);
    this.ctx.fillStyle = color;
  }
}
