export function FocusFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
      <div className="relative w-[58%] aspect-square">
        <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/75" />
        <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-white/75" />
        <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-white/75" />
        <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/75" />
      </div>
    </div>
  );
}