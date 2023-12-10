import Orbit from '../entities/Orbit';
import CanvasDrawer from '../graphics/CanvasDrawer';

export default class OrbitSystem {

  private readonly drawer: CanvasDrawer;
  private readonly orbits: Orbit[];

  private centerX: number;
  private centerY: number;

  constructor(canvasDrawer: CanvasDrawer, centerX: number, centerY: number) {
    this.drawer = canvasDrawer;
    this.centerX = centerX;
    this.centerY = centerY;
    this.orbits = [];
  }

  public update(deltaMilliseconds: number) {
    for (const orbit of this.orbits) {
      orbit.angleRads += orbit.radsPerSecond * deltaMilliseconds / 1000;
    }
  }

  public draw() {
    for (const orbit of this.orbits) {
      const x = this.centerX + orbit.radius * Math.cos(orbit.angleRads);
      const y = this.centerY + orbit.radius * Math.sin(orbit.angleRads);
      this.drawer.circle(x, y, 24);
    }
  }

  public addOrbit(orbit: Orbit) {
    this.orbits.push(orbit);
  }
}
