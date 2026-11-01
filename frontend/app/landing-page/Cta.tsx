"use client";
import Image from "next/image";
import { Button } from "../components/widgets/button";
import { CameraModal } from "../components/camera-analysis-modal";
import { useState } from "react";
import Link from "next/link";

const Cta = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  return (
    <section className="relative w-full h-125 md:h-150 overflow-hidden">
      {/* Background Image */}
      <Image
        alt="Inspirational interior design"
        src="/bg.png"
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        priority
      />

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
        {/* Content */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl leading-[1.3]">
          Ready to turn your mood boards into reality?
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-[1.3]">
          Join thousands of creators using LuSense to discover vendors and
          source products with the power of AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setCameraOpen(true)}
            className=" text-white px-8 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Start Scanning Now
          </Button>
          <Link rel="preload" href="#showcases" as="image">
            {" "}
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-2 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-lg cursor-pointer">
              View Showcases
            </button>
          </Link>
        </div>
      </div>

      <CameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />
    </section>
  );
};

export default Cta;
