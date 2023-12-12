export default function polarToCartesian(radius: number, angle: number): [number, number] {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return [x, y];
}
