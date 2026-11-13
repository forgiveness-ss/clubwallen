-- Apply inside a transaction. Application tables are not exposed through the Data API.
CREATE SCHEMA IF NOT EXISTS clubwallen;
SET LOCAL search_path = clubwallen, pg_catalog;
CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN('admin','customer')),first_name TEXT NOT NULL,last_name TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,verified INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,account_id TEXT NOT NULL REFERENCES accounts(id),expires_at BIGINT NOT NULL);
 CREATE TABLE IF NOT EXISTS customers(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,name TEXT NOT NULL,notes TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS products(id TEXT PRIMARY KEY,name TEXT NOT NULL,kind TEXT NOT NULL,price_cents INTEGER NOT NULL CHECK(price_cents>0),currency TEXT NOT NULL DEFAULT 'usd',active INTEGER NOT NULL DEFAULT 1,image TEXT,description TEXT NOT NULL DEFAULT '',sizes TEXT NOT NULL DEFAULT '[]',sort_order INTEGER NOT NULL DEFAULT 0,inventory INTEGER CHECK(inventory IS NULL OR inventory>=0));
 CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),status TEXT NOT NULL DEFAULT 'pending',payment_status TEXT NOT NULL DEFAULT 'unpaid',method TEXT NOT NULL,amount_cents INTEGER NOT NULL,currency TEXT NOT NULL DEFAULT 'usd',items TEXT NOT NULL,address TEXT NOT NULL DEFAULT '{}',access_token_hash TEXT NOT NULL,provider_id TEXT,provider_payment_id TEXT,provider_mode TEXT NOT NULL DEFAULT 'test',receipt TEXT,reference TEXT NOT NULL DEFAULT '',notes TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,paid_at TEXT);
 CREATE TABLE IF NOT EXISTS memberships(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),product_id TEXT NOT NULL REFERENCES products(id),order_id TEXT NOT NULL REFERENCES orders(id),status TEXT NOT NULL DEFAULT 'active',starts_at TEXT NOT NULL,expires_at TEXT NOT NULL,UNIQUE(order_id,product_id));
 CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),subject TEXT NOT NULL,body TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'open',replies TEXT NOT NULL DEFAULT '[]',created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS webhook_events(id TEXT PRIMARY KEY,provider TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY,actor TEXT NOT NULL,action TEXT NOT NULL,target TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
 CREATE INDEX IF NOT EXISTS orders_customer ON orders(customer_id);
 CREATE INDEX IF NOT EXISTS messages_customer ON messages(customer_id);
CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY,hits INTEGER NOT NULL,expires_at BIGINT NOT NULL);
CREATE INDEX IF NOT EXISTS rate_limits_expiry ON rate_limits(expires_at);
REVOKE ALL ON SCHEMA clubwallen FROM PUBLIC;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname='anon') THEN
    REVOKE ALL ON SCHEMA clubwallen FROM anon, authenticated;
    REVOKE ALL ON ALL TABLES IN SCHEMA clubwallen FROM anon, authenticated;
  END IF;
END $$;
