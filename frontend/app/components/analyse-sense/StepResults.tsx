"use client";

import { ArrowLeft, CheckCircle2, RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "./furniture-data";
import type { ScanResult } from "@/lib/lusense-api";
import type { PinItem } from "./lusense";

const marketUrl = "https://www.google.com/maps/search/?api=1&query=Balogun+Market%2C+Lagos+Island%2C+Lagos";

type Option = {
  variant?: unknown;
  typical_price?: unknown;
  source?: unknown;
  market_location?: unknown;
  shop_name?: unknown;
};

export function StepResults({
  item,
  budget,
  onBack,
  scan,
}: {
  item: PinItem;
  budget: number;
  onBack: () => void;
  scan: ScanResult;
}) {
  const estimated = scan.estimated_total.typical;
  const priced = scan.pricing_complete && scan.items.length > 0;
  const validBudget = Number.isFinite(budget) && budget > 0;
  const fits = priced && validBudget && estimated <= budget;
  const needsAlternatives = priced && validBudget && estimated > budget;

  const groups = scan.items.map((it) => {
    const original = it.price ? it.price.typical * it.quantity : Infinity;
    const options = (it.catalog_options as Option[])
      .filter((o) => o.source !== "lusense_demo_sample" && Number.isFinite(Number(o.typical_price)) && Number(o.typical_price) > 0)
      .filter((o) => Number(o.typical_price) * it.quantity < original)
      .sort((a, b) => Number(b.typical_price) - Number(a.typical_price));
    return { item: it, options, original };
  });

  const minimumSet = groups.reduce((sum, group) => {
    const cheapest = group.options.reduce(
      (min, option) => Math.min(min, Number(option.typical_price) * group.item.quantity),
      Infinity,
    );
    return sum + Math.min(group.original, cheapest);
  }, 0);
  const optimizedFits = needsAlternatives && Number.isFinite(minimumSet) && minimumSet <= budget;

  const fitsWithRest = (groupIndex: number, option: Option) => {
    const remainingMinimum = groups.reduce((sum, group, index) => {
      if (index === groupIndex) return sum;
      const cheapest = group.options.reduce(
        (min, entry) => Math.min(min, Number(entry.typical_price) * group.item.quantity),
        Infinity,
      );
      return sum + Math.min(group.original, cheapest);
    }, 0);
    return Number(option.typical_price) * groups[groupIndex].item.quantity + remainingMinimum <= budget;
  };

  return (
    <div className="flex flex-col mt-3">
      <div className="px-5 pt-5 pb-4 bg-linear-to-b from-violet-50/80 to-transparent dark:from-violet-950/30">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 text-zinc-500 -ml-2 h-8 px-2 rounded-lg">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <p className="text-xs font-semibold tracking-widest text-violet-500 uppercase mt-4 mb-1">Budget Bridge</p>
        <h2 className="text-base font-semibold">
          {!priced ? "Some items need pricing data" : !validBudget ? "Enter a valid budget" : fits ? "This look fits your budget" : optimizedFits ? "Lower-cost alternatives may fit your budget" : "Explore lower-cost alternatives"}
        </h2>
        <Badge variant="outline" className="mt-3">
          {fits ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
          {!priced ? "Partial estimate" : !validBudget ? "Budget required" : fits ? "Within budget" : optimizedFits ? "Alternatives available" : "Budget shortfall"}
        </Badge>
      </div>
      <div className="px-5 space-y-4 pb-5 text-sm">
        <div className="flex justify-between"><span>Your budget</span><strong>{formatNaira(budget)}</strong></div>
        <div className="flex justify-between"><span>Typical estimate{!priced ? " (priced items only)" : ""}</span><strong>{formatNaira(estimated)}</strong></div>
        {priced && validBudget && (
          <div className="flex justify-between">
            <span>{fits ? "Remaining budget" : "Amount above budget"}</span>
            <strong>{formatNaira(Math.abs(budget - estimated))}</strong>
          </div>
        )}
        {fits && <p className="text-xs text-emerald-600 dark:text-emerald-400">You can recreate the estimated look within your budget. No cheaper alternatives are needed.</p>}
        {needsAlternatives && (
          <>
            <p className="text-xs text-zinc-500">
              {optimizedFits
                ? "A lower-cost combination may fit your budget. Compare the available choices below."
                : "No complete lower-cost combination in the current catalog is confirmed to fit your budget. Compare the available options below."}
            </p>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Itemized alternatives</p>
            <div className="space-y-2">
              {groups.map(({ item: it, options }, groupIndex) => (
                <div key={`${it.object_name}-${groupIndex}`} className="rounded-xl p-3.5 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-3">
                  <p className="font-semibold">{it.object_name} ×{it.quantity}</p>
                  <p className="text-xs text-zinc-500">Current typical estimate: {it.price ? formatNaira(it.price.typical * it.quantity) : "Unavailable"}</p>
                  {options.length ? options.map((choice, index) => {
                    const optionTotal = Number(choice.typical_price) * it.quantity;
                    const compatible = fitsWithRest(groupIndex, choice);
                    return (
                      <div key={index} className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                        <p className="text-violet-700 dark:text-violet-300">{String(choice.variant || it.object_name)} — {formatNaira(optionTotal)} total</p>
                        <p className={compatible ? "text-xs text-emerald-600 dark:text-emerald-400 mt-1" : "text-xs text-amber-600 mt-1"}>
                          {compatible ? "Can fit as part of a lower-cost set" : "Does not fit the full-set budget with current catalog options"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {String(choice.market_location || "Location not specified")} · {choice.shop_name ? String(choice.shop_name) : "No verified seller"}
                        </p>
                      </div>
                    );
                  }) : <p className="text-xs text-amber-600">No lower-cost alternative in the catalog</p>}
                </div>
              ))}
            </div>
          </>
        )}
        <p className="text-xs text-zinc-500">Prices are catalog estimates and may vary by seller, location, and availability.</p>
      </div>
      <div className="md:p-6 p-4 border-t">
        <a href={marketUrl} target="_blank" rel="noopener noreferrer" className="w-full md:h-12 h-10 rounded-2xl bg-[#0504AA] text-white font-bold text-base gap-3 transition-all shadow-xl shadow-white/5 flex items-center justify-center">
          <MapPin size={18} />
          {optimizedFits ? "Source Optimized Look" : needsAlternatives ? "Explore Markets" : "Shop This Set"}
        </a>
      </div>
    </div>
  );
}
