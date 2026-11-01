import { DetectedItem } from "./lusense";

export const DEFAULT_DETECTED_ITEMS: DetectedItem[] = [
  {
    id: "sofa",
    name: "Luxury Velvet Sofa",
    quantity: 1,
    price: 1_200_000,
    emoji: "🛋️",
    swapName: "Quality Fabric Sofa",
    swapSaving: 650_000,
    swapNote: "Similar silhouette, local weave",
  },
  {
    id: "tables",
    name: "Marble Side Tables",
    quantity: 2,
    price: 900_000,
    emoji: "🪵",
    swapName: "High-Gloss Wood Tables ×2",
    swapSaving: 600_000,
    swapNote: "Same clean aesthetic",
  },
  {
    id: "lamp",
    name: "Arc Floor Lamp",
    quantity: 1,
    price: 400_000,
    emoji: "💡",
    swapName: "Arc Floor Lamp",
    swapSaving: 0,
    swapNote: "Within budget range",
    keepAsIs: true,
  },
];

export const PINTEREST_TOTAL = DEFAULT_DETECTED_ITEMS.reduce(
  (sum, item) => sum + item.price,
  0
);

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getSwapsNeeded(
  budget: number,
  items: DetectedItem[]
): DetectedItem[] {
  if (budget >= PINTEREST_TOTAL) return [];

  const gap = PINTEREST_TOTAL - budget;
  let accumulated = 0;
  const swaps: DetectedItem[] = [];

  for (const item of items) {
    if (item.keepAsIs) continue;
    if (accumulated < gap) {
      swaps.push(item);
      accumulated += item.swapSaving;
    }
  }
  return swaps;
}
