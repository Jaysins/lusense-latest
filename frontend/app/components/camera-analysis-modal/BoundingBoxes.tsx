"use client";
import { useEffect, useState } from "react";
import type { ScanResult } from "@/lib/lusense-api";
export function BoundingBoxes({
  scan,
  visible,
}: {
  scan: ScanResult | null;
  visible: boolean;
}) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible || !scan) {
      setShown(0);
      return;
    }
    setShown(0);
    const timers = scan.detections.map((_, i) =>
      setTimeout(() => setShown(i + 1), i * 180),
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, scan]);
  if (!scan) return null;
  const { width, height } = scan.image_size;
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full z-20"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Furniture detections"
    >
      {scan.detections.map((d, i) => {
        const b = d.box;
        return (
          <g
            key={i}
            opacity={shown > i ? 1 : 0}
            style={{ transition: "opacity .35s" }}
          >
            <rect
              x={b.x1}
              y={b.y1}
              width={Math.max(0, b.x2 - b.x1)}
              height={Math.max(0, b.y2 - b.y1)}
              fill="rgba(139,92,246,.12)"
              stroke="#c4b5fd"
              strokeWidth={Math.max(2, width / 320)}
            />
            <text
              x={b.x1}
              y={Math.max(18, b.y1 - 8)}
              fontSize={Math.max(14, width / 42)}
              fontWeight="bold"
              fill="white"
              stroke="#111"
              strokeWidth={Math.max(3, width / 180)}
              paintOrder="stroke"
            >
              {d.object_name} 
              {/* {Math.round(d.confidence * 100)}% */}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
