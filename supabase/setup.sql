-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    date TIMESTAMP WITH TIME ZONE,
    slots_available INTEGER DEFAULT 0,
    total_slots INTEGER DEFAULT 0,
    price DECIMAL(10, 2),
    link TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_appointments_category ON appointments(category);
CREATE INDEX IF NOT EXISTS idx_appointments_location ON appointments(location);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public appointments" ON appointments FOR SELECT USING (true);
