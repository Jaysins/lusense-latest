export function FrozenFrame({src}:{src:string}) {return <div className="absolute inset-0 bg-black">{src&&<img src={src} alt="Captured furniture" className="w-full h-full object-contain"/>}</div>}
