-- TerminPro Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    date TIMESTAMP WITH TIME ZONE,
    time VARCHAR(20),
    slots_available INTEGER DEFAULT 0,
    total_slots INTEGER DEFAULT 0,
    price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'EUR',
    language VARCHAR(10) DEFAULT 'de',
    link TEXT NOT NULL,
    booking_notes TEXT,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_appointments_category ON appointments(category);
CREATE INDEX idx_appointments_location ON appointments(location);
CREATE INDEX idx_appointments_source ON appointments(source);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_active ON appointments(is_active) WHERE is_active = true;

-- Cities table (for reference)
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    population INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sources table (for reference)
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_scraped TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences (for future features)
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    favorite_categories TEXT[],
    favorite_locations TEXT[],
    notifications_enabled BOOLEAN DEFAULT false,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments search function (full-text search)
CREATE OR REPLACE FUNCTION search_appointments(
    search_query TEXT,
    category_filter TEXT DEFAULT NULL,
    location_filter TEXT DEFAULT NULL,
    limit_count INTEGER DEFAULT 50
)
RETURNS SETOF appointments
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM appointments
    WHERE is_active = true
      AND (
        search_query IS NULL 
        OR title ILIKE '%' || search_query || '%'
        OR description ILIKE '%' || search_query || '%'
        OR location ILIKE '%' || search_query || '%'
      )
      AND (category_filter IS NULL OR category = category_filter)
      AND (location_filter IS NULL OR location ILIKE '%' || location_filter || '%')
    ORDER BY date ASC
    LIMIT limit_count;
END;
$$;

-- Insert sample cities
INSERT INTO cities (name, lat, lng, population) VALUES
    ('Berlin', 52.52, 13.405, 3644826),
    ('München', 48.1351, 11.582, 1471508),
    ('Hamburg', 53.5511, 9.9937, 1841179),
    ('Frankfurt', 50.1109, 8.6821, 753056),
    ('Köln', 50.9375, 6.9603, 1085664),
    ('Stuttgart', 48.7758, 9.1829, 632743),
    ('Düsseldorf', 51.2277, 6.7735, 619294),
    ('Dresden', 51.0504, 13.7373, 556780),
    ('Leipzig', 51.3397, 12.3731, 587857),
    ('Nürnberg', 49.4521, 11.0767, 515543)
ON CONFLICT (name) DO NOTHING;

-- Insert sample sources
INSERT INTO sources (name, website) VALUES
    ('Goethe-Institut', 'https://www.goethe.de'),
    ('Telc', 'https://www.telc.net'),
    ('TestDaF', 'https://www.testdaf.de'),
    ('ÖSD', 'https://www.osd.at'),
    ('BAMF', 'https://www.bamf.de'),
    ('Bürgeramt', NULL),
    ('KFZ-Stelle', NULL),
    ('Ausländerbehörde', NULL),
    ('Gesundheitsamt', NULL),
    ('Bildungsamt', NULL)
ON CONFLICT (name) DO NOTHING;
