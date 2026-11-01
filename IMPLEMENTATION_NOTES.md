# LuSense integration

## Run
Backend: `cd backend && python -m pip install -r requirements.txt && uvicorn main:app --reload --port 8000`
Frontend: `cd frontend && npm install && npm run dev`
Copy `.env.example` to backend `.env`, and `.env.local.example` to frontend `.env.local`; supply your own Supabase URL and publishable key.

Visit `/feed/scan` for the integrated upload → YOLO → catalog → Budget Bridge flow. The original feed scanning modal remains a mock UI; use the new page for real inference.

## Data and limitations
`market_items` must contain `object_name`, `min_price`, `typical_price`, `max_price` and the fields referenced in `api/services/pricing.py`. Publishable-key access needs appropriate Supabase RLS SELECT policies. This prototype sends catalog options to the browser and returns them to the recommendation endpoint; do not treat client-supplied prices as authoritative. Use server-persisted scans and authenticated requests before production.

The uploaded zip contained credentials. Rotate the database password and any keys that grant elevated access. The redistributed archive omits backend `.env`. Existing feed, scans, and camera routes are not fully integrated with the new upload flow. Local-only profile authentication is not security authentication.
