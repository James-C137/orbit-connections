import LineSegment from '../entities/LineSegment';
import Orbit from '../entities/Orbit';
import OrbitPair from '../entities/OrbitPair';
import CanvasDrawer from '../graphics/CanvasDrawer';

export default class LineSystem {

  private static readonly LINE_CREATION_INTERVAL = 100;
  private static readonly TIME_TO_LIVE_MS = 500;

  private readonly drawer: CanvasDrawer;
  private readonly orbitPairs: OrbitPair[];
  private readonly lines: LineSegment[];

  private centerX: number;
  private centerY: number;

  private lineCreationTimerMs;

  constructor(canvasDrawer: CanvasDrawer, centerX: number, centerY: number) {
    this.drawer = canvasDrawer;
    this.centerX = centerX;
    this.centerY = centerY;
    this.orbitPairs = [];
    this.lines = [];
    this.lineCreationTimerMs = LineSystem.LINE_CREATION_INTERVAL;
  }

  public update(deltaMilliseconds: number) {
    if (this.lineCreationTimerMs > 0) {
      this.lineCreationTimerMs -= deltaMilliseconds;
      return;
    }

    while (this.lines.length > 0 && this.lines[0].timeToLiveMs <= 0) {
      this.lines.shift();
    }

    for (const line of this.lines) {
      line.timeToLiveMs -= deltaMilliseconds;
    }

    for (const orbitPair of this.orbitPairs) {
      const x1 = this.centerX + orbitPair.orbit1.radius * Math.cos(orbitPair.orbit1.angleRads);
      const y1 = this.centerY + orbitPair.orbit1.radius * Math.sin(orbitPair.orbit1.angleRads);
      const x2 = this.centerX + orbitPair.orbit2.radius * Math.cos(orbitPair.orbit2.angleRads);
      const y2 = this.centerY + orbitPair.orbit2.radius * Math.sin(orbitPair.orbit2.angleRads);
      this.addLine(x1, y1, x2, y2);
    } 

    this.lineCreationTimerMs += LineSystem.LINE_CREATION_INTERVAL;
    this.lineCreationTimerMs -= deltaMilliseconds;
  }

  public draw() {
    for (const orbitPair of this.orbitPairs) {
      const x1 = this.centerX + orbitPair.orbit1.radius * Math.cos(orbitPair.orbit1.angleRads);
      const y1 = this.centerY + orbitPair.orbit1.radius * Math.sin(orbitPair.orbit1.angleRads);
      const x2 = this.centerX + orbitPair.orbit2.radius * Math.cos(orbitPair.orbit2.angleRads);
      const y2 = this.centerY + orbitPair.orbit2.radius * Math.sin(orbitPair.orbit2.angleRads);
      this.drawer.line(x1, y1, x2, y2);
    } 

    for (const line of this.lines) {
      const lineLifeRatio = line.timeToLiveMs / LineSystem.TIME_TO_LIVE_MS;
      this.drawer.setOpacity(1 - (1 - lineLifeRatio) * (1 - lineLifeRatio));
      this.drawer.line(line.x1, line.y1, line.x2, line.y2);
    }
    this.drawer.setOpacity(1);
  }

  public addOrbitPair(orbit1: Orbit, orbit2: Orbit) {
    this.orbitPairs.push({ orbit1, orbit2 });
  }

  private addLine(x1: number, y1: number, x2: number, y2: number) {
    this.lines.push({
      x1, y1, x2, y2,
      timeToLiveMs: LineSystem.TIME_TO_LIVE_MS
    });
  }
}
