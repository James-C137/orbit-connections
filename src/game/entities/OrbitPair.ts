import Orbit from './Orbit';

export default interface OrbitPair {
  orbit1: Orbit;
  orbit2: Orbit;
  pulses: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    timeMs: number;
  }[];
}
