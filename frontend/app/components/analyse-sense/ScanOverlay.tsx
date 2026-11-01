"use client";
import { useEffect, useState } from "react";
export function ScanOverlay({ isScanning }: { isScanning: boolean }) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    if (!isScanning) return;
    let frame = 0;
    let running = true;
    const start = performance.now();
    const tick = (t: number) => {
      if (!running) return;
      setPosition(((t - start) / 17) % 100);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, [isScanning]);
  if (!isScanning) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute inset-3 rounded-lg border border-violet-400/40" />
      <div
        className="absolute left-0 right-0 h-0.5 bg-violet-400 shadow-[0_0_16px_4px_rgba(167,139,250,.65)]"
        style={{ top: `${position}%` }}
      />
    </div>
  );
}
