'use client';

import { useEffect, useState } from 'react';


// Pinterest-style floating icons — small shapes scattered around the logo
// Each entry: [top%, left%, size(px), rotation(deg), color, delay(s), shape]
// Shapes: 'star4' | 'star5' | 'blob' | 'pin' | 'burst'
type IconConfig = [number, number, number, number, string, number, string];

const ICONS: IconConfig[] = [
  [14, 18, 38, 12,  '#F472B6', 0.05, 'star4'],   // pink 4-point star — top left
  [10, 62, 30, -8,  '#4ADE80', 0.12, 'blob'],    // green blob — top right area
  [22, 78, 34, 15,  '#818CF8', 0.08, 'star5'],   // purple 5-star — right
  [68, 15, 32, -10, '#FB923C', 0.18, 'burst'],   // orange burst — bottom left
  [72, 80, 36, 20,  '#38BDF8', 0.22, 'star4'],   // sky star — bottom right
  [40, 10, 28, -5,  '#FACC15', 0.10, 'blob'],    // yellow blob — mid left
  [48, 85, 30, 8,   '#F87171', 0.15, 'pin'],     // red pin — mid right
  [78, 55, 26, -15, '#A78BFA', 0.28, 'star5'],   // violet star — bottom centre
  [ 5, 40, 22, 20,  '#34D399', 0.20, 'burst'],   // teal burst — top centre
  [85, 28, 28, 10,  '#F472B6', 0.33, 'blob'],    // pink blob — bottom left
];

// SVG path for each shape type (normalised to ~100×100 viewBox)
function ShapeIcon({ shape, color, size, rotation }: {
  shape: string; color: string; size: number; rotation: number;
}) {
  const paths: Record<string, string> = {
    // 4-point star
    star4: 'M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z',
    // 5-point star
    star5: 'M50 5 L61 35 L95 35 L68 57 L79 91 L50 70 L21 91 L32 57 L5 35 L39 35 Z',
    // blob (rounded organic shape)
    blob: 'M60 10 C85 10 90 30 88 50 C86 70 75 90 50 90 C25 90 10 72 12 50 C14 28 35 10 60 10 Z',
    // thumbtack / pin
    pin: 'M50 5 C65 5 78 18 78 35 C78 52 65 62 55 68 L50 95 L45 68 C35 62 22 52 22 35 C22 18 35 5 50 5 Z',
    // starburst (6-point)
    burst: 'M50 5 L55 38 L85 20 L65 48 L95 50 L65 52 L85 80 L55 62 L50 95 L45 62 L15 80 L35 52 L5 50 L35 48 L15 20 L45 38 Z',
  };
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)`, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={paths[shape] ?? paths.star4} fill={color} />
    </svg>
  );
}

function LSLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={96}
      height={96}
      role="img"
      aria-label="LS"
    >
      <defs>
        <radialGradient id="splash-lg" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8a8a8a" />
          <stop offset="100%" stopColor="#3a3a3a" />
        </radialGradient>
        <filter id="splash-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.35)" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#splash-lg)" filter="url(#splash-shadow)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <text
        x="100" y="127"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="82"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        letterSpacing="-4"
        fontStyle="italic"
      >
        LS
      </text>
    </svg>
  );
}

export default function SplashScreen() {
  const [mounted,  setMounted]  = useState(false);
  const [iconsIn,  setIconsIn]  = useState(false);
  const [logoIn,   setLogoIn]   = useState(false);
  const [fadeOut,  setFadeOut]  = useState(false);
  const [unmount,  setUnmount]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const t0 = setTimeout(() => setIconsIn(true), 80);
    const t1 = setTimeout(() => setLogoIn(true),  600);
    const t2 = setTimeout(() => setFadeOut(true), 2400);
    const t3 = setTimeout(() => setUnmount(true), 3100);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!mounted || unmount) return null;

  return (
    <>
      <style>{`
        @keyframes iconPop {
          0%   { opacity: 0; transform: scale(0.3) rotate(var(--rot)); }
          60%  { opacity: 1; transform: scale(1.12) rotate(var(--rot)); }
          100% { opacity: 1; transform: scale(1) rotate(var(--rot)); }
        }
        @keyframes splashLogoIn {
          0%   { opacity: 0; transform: scale(0.55); }
          65%  { opacity: 1; transform: scale(1.09); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splashDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
        .sp-icon {
          position: absolute;
          opacity: 0;
          will-change: transform, opacity;
        }
        .sp-icon.in {
          animation: iconPop 0.55s cubic-bezier(0.34, 1.52, 0.64, 1) forwards;
        }
        .sp-logo {
          opacity: 0;
          transform: scale(0.55);
        }
        .sp-logo.in {
          animation: splashLogoIn 0.52s cubic-bezier(0.34, 1.45, 0.64, 1) forwards;
        }
        .sp-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c0c0c0;
          animation: splashDot 1.3s ease-in-out infinite;
        }
      `}</style>

      <div
        role="status"
        aria-label="Loading application"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#ffffff',
          overflow: 'hidden',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: fadeOut ? 'none' : 'all',
        }}
      >
        {/* Floating icons */}
        {ICONS.map(([top, left, size, rot, color, delay, shape], i) => (
          <div
            key={i}
            className={`sp-icon${iconsIn ? ' in' : ''}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              '--rot': `${rot}deg`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
          >
            <ShapeIcon shape={shape} color={color} size={size} rotation={rot} />
          </div>
        ))}

        {/* Soft radial vignette so icons fade away from centre */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 48% 48% at 50% 50%, transparent 30%, rgba(255,255,255,0.92) 65%, #ffffff 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Centre logo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
          }}
        >
          <div className={`sp-logo${logoIn ? ' in' : ''}`}>
            <LSLogo />
          </div>

          {/* Loading dots */}
          <div
            style={{
              display: 'flex',
              gap: 7,
              opacity: logoIn ? 1 : 0,
              transition: 'opacity 0.4s ease 0.45s',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="sp-dot"
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}