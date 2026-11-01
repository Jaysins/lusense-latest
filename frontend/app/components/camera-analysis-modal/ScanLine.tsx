export function ScanLine() {
  return (
    <>
      <div className="scan-line pointer-events-none absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent z-10" />
      <style>{`
        .scan-line { animation: scan 2.8s ease-in-out infinite; position: absolute; }
        @keyframes scan {
          0%   { top: 4%;  opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { top: 96%; opacity: 0; }
        }
      `}</style>
    </>
  );
}
