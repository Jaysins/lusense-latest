// Vivid, saturated colours — clearly visible on white

type TileConfig = [number, number, number, number, number, string, number];

export const TILES: TileConfig[] = [
  // TOP-LEFT
  [ 2,  1, 108, 138, -7, '#FF6B6B', 0.05],
  [14,  7,  90, 112,  5, '#4ECDC4', 0.12],
  [ 2, 14,  98, 126, -3, '#A78BFA', 0.08],
  [26,  2,  84,  98,  6, '#F59E0B', 0.18],
  [34, 11,  94, 118, -5, '#34D399', 0.22],
  [44,  1,  74,  90,  4, '#F472B6', 0.09],

  // TOP-RIGHT
  [ 2, 76, 106, 134,  6, '#FB923C', 0.07],
  [12, 87,  88, 108, -8, '#38BDF8', 0.14],
  [ 1, 64,  96, 122,  3, '#FBBF24', 0.10],
  [27, 91,  80,  98, -5, '#C084FC', 0.20],
  [36, 79,  90, 114,  7, '#2DD4BF', 0.24],
  [44, 93,  72,  88, -4, '#F87171', 0.11],

  // BOTTOM-LEFT
  [62,  1,  98, 126,  5, '#60A5FA', 0.15],
  [74,  8,  86, 106, -6, '#4ADE80', 0.25],
  [84,  1, 106, 134,  3, '#FB7185', 0.30],
  [55, 12,  78,  94, -7, '#FACC15', 0.06],
  [91, 14,  92, 114,  6, '#A3E635', 0.35],
  [72,  0,  66,  80, -3, '#E879F9', 0.19],

  // BOTTOM-RIGHT
  [60, 88, 100, 128, -5, '#34D399', 0.17],
  [72, 78,  84, 104,  7, '#F97316', 0.27],
  [85, 87, 106, 134, -3, '#818CF8', 0.32],
  [54, 77,  76,  93,  5, '#2DD4BF', 0.04],
  [92, 74,  94, 116, -8, '#F43F5E', 0.40],
  [71, 93,  68,  82,  4, '#FBBF24', 0.21],

  // TOP-CENTRE edges
  [ 1, 29,  82, 102, -2, '#06B6D4', 0.28],
  [ 1, 52,  88, 112,  4, '#84CC16', 0.33],

  // BOTTOM-CENTRE edges
  [89, 30,  86, 108,  5, '#F472B6', 0.38],
  [91, 51,  90, 114, -6, '#60A5FA', 0.43],
];

// Mock data for interior decor items
export const items = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
    title: "Minimalist Lounge",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
    title: "Modern Seating",
  },
  { id: 3, src: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Scandinavian Dining" },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
    title: "Velvet Textures",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Velvet Aesthetics",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    title: "Neutral Bedroom",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800",
    title: "Serene Corner",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800",
    title: "Living Loft",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    title: "Contemporary Wall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=800",
    title: "Modern Kitchen",
  },
   {
    id: 11,
    src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
    title: "Minimalist Lounge",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
    title: "Modern Seating",
  },
  { id: 13, src: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Scandinavian Dining" },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800",
    title: "Velvet Textures",
  },
  {
    id: 15,
    src: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Velvet Aesthetics",
  },
];