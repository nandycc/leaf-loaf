/*
  # Create notes table

  1. New Tables
    - `notes`
      - `id` (uuid, primary key) - Unique identifier for each note
      - `user_id` (uuid, foreign key) - References the user who created the note
      - `name` (text) - Name/title of the note
      - `lists` (text array) - Array of text items in the note
      - `color` (text) - Color variant for the note card (brown-300, blue-200, orange-300, green-300)
      - `created_at` (timestamptz) - Timestamp when the note was created
      - `updated_at` (timestamptz) - Timestamp when the note was last updated

  2. Security
    - Enable RLS on `notes` table
    - Add policy for users to read their own notes
    - Add policy for users to insert their own notes
    - Add policy for users to update their own notes
    - Add policy for users to delete their own notes
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  lists text[] DEFAULT '{}',
  color text NOT NULL CHECK (color IN ('brown-300', 'blue-200', 'orange-300', 'green-300')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes(created_at DESC);