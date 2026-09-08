/*
# Create messages table for the gift registry message board

1. New Tables
- `messages`
  - `id` (uuid, primary key)
  - `author_name` (text, not null) — name of the person leaving the message
  - `message` (text, not null) — the message content
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `messages`.
- Allow anon + authenticated to SELECT (public message board, anyone can read).
- Allow anon + authenticated to INSERT (anyone can leave a message).
- Allow authenticated to DELETE (admin-only: the logged-in couple can remove messages).
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages" ON messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_messages" ON messages;
CREATE POLICY "auth_delete_messages" ON messages FOR DELETE
  TO authenticated USING (true);