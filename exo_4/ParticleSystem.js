import Particle from "./Particle";

export default class ParticleSystem {
  constructor() {
    this.particles = [];
    this.particlesPerClick = 10;

    this.image = new Image();
    this.image.src =
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Populated_Planet.png";
    this.image.onload = () => {
      this.imageLoaded = true;
    };

    this.obstacle = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 150,
    };
    this.imageLoaded = false;
  }

  createParticles(x, y) {
    for (let i = 0; i < this.particlesPerClick; i++) {
      const particle = new Particle(x, y);

      const angle = Math.random() * Math.PI * 2;
      const magnitude = Math.random() * 20;

      particle.velocity.x = Math.cos(angle) * magnitude;
      particle.velocity.y = Math.sin(angle) * magnitude;

      this.particles.push(particle);
    }
  }

  update() {
    for (const particle of this.particles) {
      const dx = particle.position.x - this.obstacle.x;
      const dy = particle.position.y - this.obstacle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.obstacle.radius + particle.radius) {
        const normalX = dx / distance;
        const normalY = dy / distance;

        const dotProduct =
          particle.velocity.x * normalX + particle.velocity.y * normalY;
        particle.velocity.x -= 2 * dotProduct * normalX;
        particle.velocity.y -= 2 * dotProduct * normalY;

        const overlap = this.obstacle.radius + particle.radius - distance;
        particle.position.x += normalX * overlap;
        particle.position.y += normalY * overlap;
      }

      particle.update();
    }
  }

  draw(ctx) {
    if (this.imageLoaded) {
      ctx.save();
      ctx.drawImage(
        this.image,
        this.obstacle.x - this.obstacle.radius,
        this.obstacle.y - this.obstacle.radius,
        this.obstacle.radius * 2,
        this.obstacle.radius * 2
      );
      ctx.restore();
    }

    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }
}
