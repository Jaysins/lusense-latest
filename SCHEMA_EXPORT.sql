-- Run in Supabase SQL Editor and share only the results (no row data).
SELECT table_name,column_name,data_type,is_nullable
FROM information_schema.columns
WHERE table_schema='public' AND table_name IN ('market_items','feed_posts','scans','scan_items','vendors','catalog_items','partnerships')
ORDER BY table_name,ordinal_position;
-- Separately inspect policies in Dashboard > Authentication > Policies.
