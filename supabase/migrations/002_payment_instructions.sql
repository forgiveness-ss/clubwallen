ALTER TABLE clubwallen.orders ADD COLUMN IF NOT EXISTS payment_details TEXT NOT NULL DEFAULT '{}';
CREATE INDEX IF NOT EXISTS orders_provider ON clubwallen.orders(provider_id);
CREATE TABLE IF NOT EXISTS clubwallen.payment_references(reference TEXT PRIMARY KEY,order_id TEXT NOT NULL REFERENCES clubwallen.orders(id));
ALTER TABLE clubwallen.payment_references ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON clubwallen.payment_references FROM PUBLIC;
