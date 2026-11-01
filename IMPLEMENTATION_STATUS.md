# LuSense implementation status

Implemented: trained model path correction; real YOLO upload endpoint; market price lookup; upload-based budget recommendations; scan page; Supabase email/password login and signup; environment templates.

Not yet verified: live Supabase table schema, row-level security policies, existing feed workflows, camera modal integration, and end-to-end execution. Existing market_items column assumptions may differ from your schema. Email confirmation must be configured in Supabase Auth settings; it cannot be disabled securely by frontend code. Never use service-role keys in the browser.

## Safe schema sharing
Run `SCHEMA_EXPORT.sql` in Supabase SQL Editor. Export only the result grid (column names and types). Do not export actual rows, passwords, connection strings, access tokens, or secret keys. Also share table relationships and RLS policy definitions without user data. Rotate any previously disclosed database password.

## Local setup
1. Copy frontend/.env.local.example to frontend/.env.local and set public Supabase project URL and publishable key.
2. Set backend/.env with SUPABASE_URL, SUPABASE_KEY (publishable/anon), FRONTEND_URL=http://localhost:3000.
3. Supabase dashboard: Auth > Providers > Email; choose whether to require email confirmation. For immediate signup without codes, turn off Confirm email for this demo project.
4. In frontend run `npm install && npm run dev`.
5. In backend virtual environment run `pip install -r requirements.txt && uvicorn main:app --reload`.
6. Visit /signup, /login, /feed/scan.
