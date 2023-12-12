import CanvasDrawer from './graphics/CanvasDrawer';
import LineSystem from './systems/LineSystem';
import OrbitSystem from './systems/OrbitSystem';
import RingsSystem from './systems/RingsSystem';

export default class GameRunner {

  private readonly drawer: CanvasDrawer;

  private readonly lineSystem: LineSystem;
  private readonly orbitSystem: OrbitSystem;
  private readonly ringsSystem: RingsSystem;

  private running: boolean;
  private prevDrawTimestamp: number;

  public constructor(canvas: HTMLCanvasElement) {
    if (!canvas) throw new Error(`GameRunner(): canvas cannot be ${canvas}`);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('GameRunner(): Failed to get 2d context');
    this.drawer = new CanvasDrawer(ctx);

    this.lineSystem = new LineSystem(this.drawer, canvas.width / 2, canvas.height / 2);
    this.orbitSystem = new OrbitSystem(this.drawer, canvas.width / 2, canvas.height / 2);
    this.ringsSystem = new RingsSystem(this.drawer);

    this.running = true;
    this.prevDrawTimestamp = 0;

    this.start();
  }

  public start() {
    const orbit1 = {
      angleRads: 0,
      radius: 128,
      radsPerSecond: 1
    }
    const orbit2 = {
      angleRads: 0,
      radius: 256,
      radsPerSecond: 1.1
    }
    const orbit3 = {
      angleRads: 0,
      radius: 384,
      radsPerSecond: 1.2
    }
    const orbit4 = {
      angleRads: 0,
      radius: 512,
      radsPerSecond: 1.3
    }
    const orbit5 = {
      angleRads: 0,
      radius: 640,
      radsPerSecond: 1.4
    }
    const orbit6 = {
      angleRads: 0,
      radius: 768,
      radsPerSecond: 1.5
    }

    this.orbitSystem.addOrbit(orbit1);
    this.orbitSystem.addOrbit(orbit2);
    this.orbitSystem.addOrbit(orbit3);
    this.orbitSystem.addOrbit(orbit4);
    this.orbitSystem.addOrbit(orbit5);
    this.orbitSystem.addOrbit(orbit6);
    this.lineSystem.addOrbitPair(orbit1, orbit4);
    this.lineSystem.addOrbitPair(orbit2, orbit5);
    this.lineSystem.addOrbitPair(orbit3, orbit6);

    window.requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.requestAnimation(timestamp));
  }

  private requestAnimation(timestamp: DOMHighResTimeStamp) {
    const elapsed = timestamp - this.prevDrawTimestamp;
    if (!this.running || elapsed === 0) return;

    if (this.prevDrawTimestamp !== timestamp) {
      this.update(timestamp - this.prevDrawTimestamp);
      this.drawer.clear();
      this.draw();
    }

    this.prevDrawTimestamp = timestamp;
    window.requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.requestAnimation(timestamp));
  }

  private update(deltaMilliseconds: number) {
    this.orbitSystem.update(deltaMilliseconds);
    this.lineSystem.update(deltaMilliseconds);
  }

  private draw() {
    this.ringsSystem.draw();
    this.lineSystem.draw();
    this.orbitSystem.draw();
  }
}
