import { supabase } from "@/lib/supabase";
async function authHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Please log in to scan");
  return { Authorization: `Bearer ${session.access_token}` };
}
export type ScanResult = {
  image_size: { width: number; height: number };
  detections: {
    object_name: string;
    confidence: number;
    box: { x1: number; y1: number; x2: number; y2: number };
  }[];
  items: {
    object_name: string;
    quantity: number;
    price: { min: number; typical: number; max: number } | null;
    catalog_options: Record<string, unknown>[];
  }[];
  estimated_total: { min: number; typical: number; max: number };
  pricing_complete: boolean;
};
const configuredBase =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
// When accessing the frontend on a phone via LAN, localhost refers to the phone.
// Use the computer hostname for local development. Production should use an HTTPS API URL.
const base =
  typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1" &&
  /localhost|127\.0\.0\.1/.test(configuredBase)
    ? `${window.location.protocol}//${window.location.hostname}:8000`
    : configuredBase;
export async function scanImage(file: File): Promise<ScanResult> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(`${base}/scans/upload`, {
    method: "POST",
    headers: await authHeaders(),
    body: form,
  });
  if (!response.ok) throw new Error((await response.text()).slice(0, 300));
  return response.json();
}
export async function recommendScan(scan: ScanResult, budget: number) {
  const response = await fetch(`${base}/recommendations/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify({ items: scan.items, budget }),
  });
  if (!response.ok) throw new Error((await response.text()).slice(0, 300));
  return response.json();
}

/** Analyze an image already displayed in the feed, without a file picker. */
export async function scanFeedImage(imageUrl: string): Promise<ScanResult> {
  const response = await fetch(`${base}/scans/feed-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify({ image_url: imageUrl }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body.slice(0, 350));
  }
  return response.json();
}
