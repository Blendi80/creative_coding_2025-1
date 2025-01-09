export default class Particle {
  constructor(char, index) {
    this.char = char;
    this.index = index;

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;

    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;

    this.targetX = this.x;
    this.targetY = this.y;

    this.speed = 0.05;
    this.baseRadius = 20; // Rayon de base (avant mise à l'échelle)
    this.radius = this.baseRadius;

    this.isGathered = false;

    this.scale = 3; // Taille initiale
    this.targetScale = 30; // Taille cible lors de l'éloignement
  }

  setGatheredState(state) {
    this.isGathered = state;
    this.targetScale = state ? 3 : 30; // Taille plus grande si dispersée
  }

  setTarget(target) {
    this.targetX = target.x;
    this.targetY = target.y;
  }

  randomizePosition(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
  }

  update(canvasWidth, canvasHeight) {
    if (this.isGathered) {
      // Rapproche la particule de sa cible
      this.x += (this.targetX - this.x) * this.speed;
      this.y += (this.targetY - this.y) * this.speed;
    } else {
      // Mouvement libre avec rebonds
      this.x += this.vx;
      this.y += this.vy;

      // Calcul du rayon basé sur l'échelle
      this.radius = this.baseRadius * this.scale;

      // Si la particule touche un bord, l'empêcher de dépasser le bord
      if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
        this.vx *= -1;
        this.x = Math.max(
          this.radius,
          Math.min(this.x, canvasWidth - this.radius)
        );
      }

      if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
        this.vy *= -1;
        this.y = Math.max(
          this.radius,
          Math.min(this.y, canvasHeight - this.radius)
        );
      }
    }

    // Animation fluide de l'échelle avec un easing élastique
    const elasticity = 0.1;
    const damping = 0.8;
    const deltaScale = this.targetScale - this.scale;

    this.scale += deltaScale * elasticity;
    this.scale *= damping;
  }

  draw(ctx, canvasWidth, canvasHeight) {
    ctx.font = `${50 * this.scale}px Helvetica`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.char, this.x, this.y);
  }
}
