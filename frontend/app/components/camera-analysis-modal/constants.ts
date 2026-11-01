export interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  delay: number;
}

export const MOCK_BOXES: BoundingBox[] = [
  {
    id: "1",
    x: 22,
    y: 28,
    width: 40,
    height: 48,
    label: "Mid-century Chair",
    confidence: 98,
    delay: 0,
  },
  {
    id: "2",
    x: 66,
    y: 18,
    width: 22,
    height: 30,
    label: "Floor Lamp",
    confidence: 94,
    delay: 350,
  },
  {
    id: "3",
    x: 10,
    y: 62,
    width: 28,
    height: 20,
    label: "Side Table",
    confidence: 87,
    delay: 650,
  },
];