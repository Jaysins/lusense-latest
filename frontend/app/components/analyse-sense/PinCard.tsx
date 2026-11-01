"use client";
import { useState } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyzeModal } from "./AnalyzeModal";
import { PinItem } from "./lusense";

interface PinCardProps {
  item: PinItem;
}

export function PinCard({ item }: PinCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleCardTap = () => {
    // On touch devices, first tap reveals overlay; second tap elsewhere hides it
    setOverlayVisible((prev) => !prev);
  };

  const handleAnalyzeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlayVisible(false);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in mb-2 sm:mb-3"
        onClick={handleCardTap}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay — visible on hover (desktop) OR when overlayVisible=true (mobile tap) */}
        <div
          className={`
            absolute inset-0 bg-black/20
            flex flex-col justify-between p-3
            transition-opacity duration-300
            ${overlayVisible ? "opacity-100" : "opacity-0"}
            group-hover:opacity-100
          `}
        >
          {/* Analyze button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              className="
                bg-gray-900/90 hover:bg-gray-900 text-white rounded-full
                flex items-center gap-1.5 border-none shadow-lg text-xs px-3 py-1.5
                translate-y-1 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer
              "
              onClick={handleAnalyzeClick}
            >
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              Analyze Sense
            </Button>
          </div>

          {/* Bottom title + arrow */}
          <div className="flex items-end justify-between gap-2">
            <span className="text-white text-sm font-medium drop-shadow-md line-clamp-2">
              {item.title}
            </span>
            <div className="h-8 w-8 bg-white/90 rounded-full shrink-0 flex items-center justify-center text-gray-900 hover:bg-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <AnalyzeModal open={isOpen} onOpenChange={setIsOpen} item={item} />
    </>
  );
}