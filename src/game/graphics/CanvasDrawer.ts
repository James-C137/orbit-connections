export default class CanvasDrawer {

  private static readonly DEFAULT_WITDH = 4;

  private readonly ctx: CanvasRenderingContext2D;

  private lineWidth: number;

  public constructor(canvasContext: CanvasRenderingContext2D) {
    this.ctx = canvasContext;
    this.ctx.translate(0.5,0.5);

    this.lineWidth = CanvasDrawer.DEFAULT_WITDH;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public setLineWidth(value: number) {
    this.lineWidth = Math.max(1, value);
  }

  public setRGBA(r: number, g: number, b: number, a: number) {
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  }

  public getViewWidth() {
    return this.ctx.canvas.width;
  }

  public getViewHeight() {
    return this.ctx.canvas.height;
  }

  public circle(x: number, y: number, radius: number) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
}