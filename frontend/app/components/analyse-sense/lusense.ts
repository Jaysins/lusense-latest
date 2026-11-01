export interface DetectedItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  emoji: string;
  swapName: string;
  swapSaving: number;
  swapNote: string;
  keepAsIs?: boolean;
}

export interface PinItem {
  id: string | number;
  src: string;
  title: string;
  detectedItems?: DetectedItem[];
}

export interface AnalyzeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PinItem;
}
