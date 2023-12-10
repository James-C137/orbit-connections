import CanvasDrawer from '../graphics/CanvasDrawer';

export default class RingsSystem {

  private readonly drawer: CanvasDrawer;

  constructor(canvasDrawer: CanvasDrawer) {
    this.drawer = canvasDrawer;
  }

  public update() {
    // no-op
  }

  public draw() {
    const width = this.drawer.getViewWidth();
    const height = this.drawer.getViewHeight();

    this.drawer.circle(width / 2, height / 2, 128);
    this.drawer.circle(width / 2, height / 2, 256);
    this.drawer.circle(width / 2, height / 2, 384);
    this.drawer.circle(width / 2, height / 2, 512);
    this.drawer.circle(width / 2, height / 2, 640);
    this.drawer.circle(width / 2, height / 2, 768);
  }
}
