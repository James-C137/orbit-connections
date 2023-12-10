import { useEffect, useRef } from "react";
import GameRunner from "./GameRunner";

export default function gameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    new GameRunner(canvas);
  }, []);

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <canvas ref={canvasRef} width="2048" height="2048" style={{
        maxWidth: 'min(100%, 1024px)',
        maxHeight: 'min(100%, 1024px)'
      }} />
    </div>
  );
}
