
export function Logo() {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="circleGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#0504AA"/>
      <stop offset="100%" stopColor="#0504AA"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.35)"/>
    </filter>
  </defs>
  <circle cx="100" cy="100" r="90" fill="url(#circleGrad)" filter="url(#shadow)"/>
  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
  <text
    x="100"
    y="127"
    fontFamily="Georgia, 'Times New Roman', serif"
    fontSize="82"
    fontWeight="700"
    fill="white"
    textAnchor="middle"
    letterSpacing="-4"
    className="font-style: italic;"
  >LS</text>
</svg>

  );
}
