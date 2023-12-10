export default class CanvasDrawer {

  private static readonly DEFAULT_WITDH = 4;

  private readonly ctx: CanvasRenderingContext2D;

  public constructor(canvasContext: CanvasRenderingContext2D) {
    this.ctx = canvasContext;
    this.ctx.translate(0.5,0.5);
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public setOpacity(opacity: number) {
    this.ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
    this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
  }

  public getViewWidth() {
    return this.ctx.canvas.width;
  }

  public getViewHeight() {
    return this.ctx.canvas.height;
  }

  public circle(x: number, y: number, radius: number, lineWidth?: number) {
    this.ctx.lineWidth = lineWidth || CanvasDrawer.DEFAULT_WITDH;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
}