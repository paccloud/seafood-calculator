-- Initial schema for Seafood Calculator

-- Species table (already provided in paste.txt)
CREATE TABLE IF NOT EXISTS seafood_recoveries (
    id SERIAL PRIMARY KEY,
    species_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Yields table
CREATE TABLE IF NOT EXISTS yields (
    id SERIAL PRIMARY KEY,
    species_id INTEGER REFERENCES seafood_recoveries(id),
    cut_type VARCHAR(50),
    min_yield DECIMAL(5,2),
    max_yield DECIMAL(5,2),
    default_yield DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Processing costs
CREATE TABLE IF NOT EXISTS processing_costs (
    id SERIAL PRIMARY KEY,
    species_id INTEGER REFERENCES seafood_recoveries(id),
    cut_type VARCHAR(50),
    base_cost DECIMAL(10,2),
    volume_discount_threshold INTEGER,
    volume_discount_rate DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saved calculations
CREATE TABLE IF NOT EXISTS saved_calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    species_id INTEGER REFERENCES seafood_recoveries(id),
    yield_percentage DECIMAL(5,2),
    raw_cost DECIMAL(10,2),
    processing_cost DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    total_weight INTEGER,
    markup_percentage DECIMAL(5,2),
    final_cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);