import BaseApp from "./BaseApp";
import ParticleSystem from "./ParticleSystem";

export default class App extends BaseApp {
  constructor() {
    super();
    this.particleSystem = new ParticleSystem();

    this.canvas.addEventListener("click", this.handleClick.bind(this));

    this.draw();
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.particleSystem.createParticles(x, y);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particleSystem.update();
    this.particleSystem.draw(this.ctx);

    requestAnimationFrame(() => this.draw());
  }
}
