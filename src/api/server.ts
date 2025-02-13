import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Middleware
app.use(express.json());

// Routes will be imported here
import speciesRoutes from './routes/species';
import calculatorRoutes from './routes/calculator';
import shippingRoutes from './routes/shipping';

app.use('/api/species', speciesRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/shipping', shippingRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});