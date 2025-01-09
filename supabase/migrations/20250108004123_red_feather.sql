/*
  # Create users table and related tables

  1. New Tables
    - `users`: Stores user information
      - `id` (text, primary key): Firebase UID
      - `email` (text): User's email
      - `name` (text): User's display name
      - `avatar_url` (text): User's profile picture URL
      - `created_at` (timestamp): Account creation date
      - `last_login` (timestamp): Last login timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id);
