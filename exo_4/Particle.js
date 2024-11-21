export default class Particle {
  constructor(x, y) {
    this.position = {
      x: x || 0,
      y: y || 0,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.acceleration = {
      x: 0,
      y: 0,
    };

    this.radius = 8;
    this.maxSpeed = 3;
    this.orientation = 0;
  }

  applyForce(force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  update() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x > window.innerWidth) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = window.innerWidth;
    }

    if (this.position.y > window.innerHeight) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = window.innerHeight;
    }

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.orientation = Math.atan2(this.velocity.y, this.velocity.x);
    }

    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    const spikes = 5;
    const outerRadius = this.radius;
    const innerRadius = this.radius / 2;
    const step = Math.PI / spikes;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();

    ctx.fillStyle = "#FFD700";
    ctx.fill();

    ctx.restore();
  }
}
