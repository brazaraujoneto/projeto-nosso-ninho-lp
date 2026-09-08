/*
# Create gift registry items and restrict administration

1. New Tables
- `gifts`
  - `id` (uuid, primary key)
  - `title` (text, not null) — gift name shown publicly
  - `price` (text, not null) — formatted price shown publicly
  - `image_url` (text, not null) — public image URL or local path
  - `reserved` (boolean, default false) — whether the item is unavailable
  - `reserved_by` (text) — optional display name for the reservation
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `gifts`.
- Anyone may read gifts because the registry is public.
- Only the configured administrator email may insert, update, or delete gifts.
- Restrict message deletion to the same administrator email.
3. Important Notes
- The administrator account must exist in Supabase Auth with email `braz.nobre97@gmail.com`.
- The public website never receives permission to manage the registry.
*/

CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price text NOT NULL,
  image_url text NOT NULL,
  reserved boolean NOT NULL DEFAULT false,
  reserved_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_gifts" ON gifts;
CREATE POLICY "public_select_gifts" ON gifts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gifts" ON gifts;
CREATE POLICY "admin_insert_gifts" ON gifts FOR INSERT
  TO authenticated WITH CHECK ((auth.jwt() ->> 'email') = 'braz.nobre97@gmail.com');

DROP POLICY IF EXISTS "admin_update_gifts" ON gifts;
CREATE POLICY "admin_update_gifts" ON gifts FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'braz.nobre97@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'braz.nobre97@gmail.com');

DROP POLICY IF EXISTS "admin_delete_gifts" ON gifts;
CREATE POLICY "admin_delete_gifts" ON gifts FOR DELETE
  TO authenticated USING ((auth.jwt() ->> 'email') = 'braz.nobre97@gmail.com');

DROP POLICY IF EXISTS "auth_delete_messages" ON messages;
CREATE POLICY "auth_delete_messages" ON messages FOR DELETE
  TO authenticated USING ((auth.jwt() ->> 'email') = 'braz.nobre97@gmail.com');