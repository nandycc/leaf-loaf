/*
  # Initial Schema Setup
  
  1. New Tables
    - `available_pincodes`
      - `id` (uuid, primary key)
      - `pincode` (text, unique) - The zipcode/pincode value
      - `city` (text) - City name for the pincode
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `user_addresses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users) - Reference to authenticated user
      - `name` (text) - User's name
      - `flat_house_building` (text) - Flat/House/Building information
      - `area_street_block` (text) - Area, Street, Block information
      - `pincode` (text) - Pincode of the address
      - `city` (text) - City name
      - `address_type` (text) - Type of address (home, work, etc.)
      - `is_default` (boolean) - Whether this is the default address
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read all available pincodes (public data)
      - Read, insert, update their own addresses
    
  3. Data Population
    - Insert San Francisco pincodes into available_pincodes table
*/

-- Create available_pincodes table
CREATE TABLE IF NOT EXISTS available_pincodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pincode text UNIQUE NOT NULL,
  city text DEFAULT 'San Francisco',
  created_at timestamptz DEFAULT now()
);

-- Create user_addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  flat_house_building text NOT NULL,
  area_street_block text NOT NULL,
  pincode text NOT NULL,
  city text NOT NULL,
  address_type text DEFAULT 'home',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE available_pincodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for available_pincodes
-- Anyone can read available pincodes (public data)
CREATE POLICY "Anyone can view available pincodes"
  ON available_pincodes FOR SELECT
  USING (true);

-- RLS Policies for user_addresses
CREATE POLICY "Users can view own addresses"
  ON user_addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON user_addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON user_addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON user_addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert San Francisco pincodes
INSERT INTO available_pincodes (pincode, city) VALUES
  ('94110', 'San Francisco'),
  ('94112', 'San Francisco'),
  ('94122', 'San Francisco'),
  ('94109', 'San Francisco'),
  ('94118', 'San Francisco'),
  ('94116', 'San Francisco'),
  ('94117', 'San Francisco'),
  ('94114', 'San Francisco'),
  ('94115', 'San Francisco'),
  ('94121', 'San Francisco'),
  ('94124', 'San Francisco'),
  ('94132', 'San Francisco'),
  ('94131', 'San Francisco'),
  ('94107', 'San Francisco'),
  ('94102', 'San Francisco'),
  ('94123', 'San Francisco'),
  ('94134', 'San Francisco'),
  ('94111', 'San Francisco'),
  ('94105', 'San Francisco'),
  ('94108', 'San Francisco')
ON CONFLICT (pincode) DO NOTHING;

-- Create index for faster pincode lookups
CREATE INDEX IF NOT EXISTS idx_available_pincodes_pincode ON available_pincodes(pincode);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_pincode ON user_addresses(pincode);