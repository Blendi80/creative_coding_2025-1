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

    ctx.font = "30px 'VT323', sans-serif";
    ctx.fillStyle = "#FFD700";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("STAR", 0, 0);

    ctx.restore();
  }
}
