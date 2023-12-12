import LineSegment from '../entities/LineSegment';
import Orbit from '../entities/Orbit';
import OrbitPair from '../entities/OrbitPair';
import CanvasDrawer from '../graphics/CanvasDrawer';
import polarToCartesian from '../math/polarToCartesian';

export default class LineSystem {

  private static readonly PULSE_INTERVAL_MS = 40;
  private static readonly LINE_TTL_MS = 1600;

  private readonly drawer: CanvasDrawer;
  private readonly orbitPairs: OrbitPair[];
  private readonly lines: LineSegment[];

  private centerX: number;
  private centerY: number;
  private elapsedTimeMs: number;
  private prevPulseTimeMs: number;
  private pulseTimerMs: number;

  constructor(canvasDrawer: CanvasDrawer, centerX: number, centerY: number) {
    this.drawer = canvasDrawer;
    this.orbitPairs = [];
    this.lines = [];
    this.centerX = centerX;
    this.centerY = centerY;
    this.elapsedTimeMs = 0;
    this.prevPulseTimeMs = 0;
    this.pulseTimerMs = LineSystem.PULSE_INTERVAL_MS;
  }

  public update(deltaTimeMs: number) {
    this.elapsedTimeMs += deltaTimeMs;
    this.pulseTimerMs -= deltaTimeMs;

    // Skip if no new lines need to be created
    if (this.pulseTimerMs > 0) {
      return;
    }

    this.pulse();

    // Remove stale lines
    while (this.lines.length > 0 && this.lines[0].expirationTimeMs <= this.elapsedTimeMs) {
      this.lines.shift();
    }

    this.pulseTimerMs += LineSystem.PULSE_INTERVAL_MS;
  }

  private pulse() {
    if (this.elapsedTimeMs - this.prevPulseTimeMs < LineSystem.PULSE_INTERVAL_MS) {
      return;
    }

    for (let timeMs = this.prevPulseTimeMs + LineSystem.PULSE_INTERVAL_MS; timeMs < this.elapsedTimeMs; timeMs += LineSystem.PULSE_INTERVAL_MS) {
      const timeGapMs = this.elapsedTimeMs - timeMs;
      if (timeGapMs > LineSystem.LINE_TTL_MS) continue;
      for (const orbitPair of this.orbitPairs) {
        const radsSinceTimeMs1 = orbitPair.orbit1.radsPerSecond * timeGapMs / 1000;
        const radsSinceTimeMs2 = orbitPair.orbit2.radsPerSecond * timeGapMs / 1000;
        const [x1, y1] = polarToCartesian(orbitPair.orbit1.radius, orbitPair.orbit1.angleRads - radsSinceTimeMs1);
        const [x2, y2] = polarToCartesian(orbitPair.orbit2.radius, orbitPair.orbit2.angleRads - radsSinceTimeMs2);
        this.addLine(x1 + this.centerX, y1 + this.centerY, x2 + this.centerX, y2 + this.centerY, timeMs + LineSystem.LINE_TTL_MS);
      } 
    }

    this.prevPulseTimeMs = this.elapsedTimeMs - (this.elapsedTimeMs % LineSystem.PULSE_INTERVAL_MS);
  }

  public draw() {
    for (const orbitPair of this.orbitPairs) {
      const [x1, y1] = polarToCartesian(orbitPair.orbit1.radius, orbitPair.orbit1.angleRads);
      const [x2, y2] = polarToCartesian(orbitPair.orbit2.radius, orbitPair.orbit2.angleRads);
      this.drawer.setLineWidth(2);
      this.drawer.setRGBA(219, 169, 88, 1);
      this.drawer.line(x1 + this.centerX, y1 + this.centerY, x2 + this.centerX, y2 + this.centerY);
    } 

    for (const line of this.lines) {
      const lineTTLRatio = (line.expirationTimeMs - this.elapsedTimeMs) / LineSystem.LINE_TTL_MS;
      this.drawer.setLineWidth(2);
      this.drawer.setRGBA(219, 169, 88, 1 - (1 - lineTTLRatio) * (1 - lineTTLRatio));
      this.drawer.line(line.x1, line.y1, line.x2, line.y2);
    }
  }

  public addOrbitPair(orbit1: Orbit, orbit2: Orbit) {
    this.orbitPairs.push({orbit1, orbit2, pulses: []});
  }

  private addLine(x1: number, y1: number, x2: number, y2: number, expirationTimeMs: number) {
    this.lines.push({x1, y1, x2, y2, expirationTimeMs});
  }
}
