import Particle from "./Particle.js";

export default class Word {
  constructor(word) {
    this.word = word;
    this.particles = [];
    this.targetPositions = [];
    this.isGathered = false;

    this.shakeIntensity = 2;
    this.init();
  }

  init() {
    this.particles = this.word
      .split("")
      .map((char, index) => new Particle(char, index));
  }

  resize(canvasWidth, canvasHeight) {
    const spacing = 50;
    this.targetPositions = this.particles.map((_, index) => ({
      x: canvasWidth / 2 - (this.word.length / 2) * spacing + index * spacing,
      y: canvasHeight / 2,
    }));

    this.particles.forEach((particle) =>
      particle.randomizePosition(canvasWidth, canvasHeight)
    );
  }

  gather() {
    this.isGathered = true;
    this.particles.forEach((particle, index) => {
      particle.setGatheredState(true);
      particle.setTarget(this.targetPositions[index]);
    });
  }

  scatter() {
    this.isGathered = false;
    this.particles.forEach((particle) => {
      particle.setGatheredState(false);
    });
  }

  update(canvasWidth, canvasHeight) {
    this.particles.forEach((particle) => {
      if (this.isGathered) {
        particle.x +=
          Math.random() * this.shakeIntensity - this.shakeIntensity / 2;
        particle.y +=
          Math.random() * this.shakeIntensity - this.shakeIntensity / 2;
      }
      particle.update(canvasWidth, canvasHeight);
    });
  }

  draw(ctx) {
    this.particles.forEach((particle) => particle.draw(ctx));
  }
}
