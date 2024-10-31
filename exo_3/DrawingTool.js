export default class DrawingTool {
  constructor(ctx) {
    this.ctx = ctx;
    this.allPoints = [];
    this.minDistance = 30;
  }

  addPoint(x, y) {
    if (
      this.allPoints.length === 0 ||
      this.getDistance(this.allPoints[this.allPoints.length - 1], { x, y }) >
        this.minDistance
    ) {
      this.allPoints.push({ x, y });
    }
  }

  getDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
