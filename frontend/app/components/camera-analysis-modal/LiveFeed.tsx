"use client";
import { ZapOff } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
export const LiveFeed = forwardRef<HTMLVideoElement, { facingMode: "user" | "environment" }>(function LiveFeed({facingMode}, forwardedRef) {
 const streamRef=useRef<MediaStream|null>(null);const [error,setError]=useState("");
 useEffect(()=>{let active=true;setError("");
  (async()=>{try{const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode},audio:false});if(!active){stream.getTracks().forEach(t=>t.stop());return}streamRef.current=stream;
    const el=typeof forwardedRef==="function"?null:forwardedRef?.current;if(el){el.srcObject=stream;await el.play().catch(()=>{});}
  }catch(e){if(active)setError(e instanceof Error?e.message:"Camera unavailable")}})();
  return()=>{active=false;streamRef.current?.getTracks().forEach(t=>t.stop());streamRef.current=null};
 },[facingMode,forwardedRef]);
 if(error)return <div className="absolute inset-0 bg-linear-to-br from-[#1c1c2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center gap-3 px-6 text-center"><ZapOff className="w-8 h-8 text-white/30"/><p className="text-white/60 text-sm">{error}</p><p className="text-white/40 text-xs">Camera access requires permission and HTTPS (or localhost).</p></div>;
 return <video ref={forwardedRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" style={{transform:facingMode==="user"?"scaleX(-1)":"none"}}/>;
});
