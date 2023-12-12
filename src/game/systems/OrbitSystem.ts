import Orbit from '../entities/Orbit';
import CanvasDrawer from '../graphics/CanvasDrawer';

export default class OrbitSystem {

  private readonly drawer: CanvasDrawer;
  private readonly orbits: Orbit[];

  private centerX: number;
  private centerY: number;

  constructor(canvasDrawer: CanvasDrawer, centerX: number, centerY: number) {
    this.drawer = canvasDrawer;
    this.orbits = [];

    this.centerX = centerX;
    this.centerY = centerY;
  }

  public update(deltaTimeMs: number) {
    for (const orbit of this.orbits) {
      orbit.angleRads += orbit.radsPerSecond * deltaTimeMs / 1000;
    }
  }

  public draw() {
    for (const orbit of this.orbits) {
      const x = this.centerX + orbit.radius * Math.cos(orbit.angleRads);
      const y = this.centerY + orbit.radius * Math.sin(orbit.angleRads);
      this.drawer.setLineWidth(3);
      this.drawer.setRGBA(219, 169, 88, 1);
      this.drawer.circle(x, y, 24);
    }
  }

  public addOrbit(orbit: Orbit) {
    this.orbits.push(orbit);
  }
}
