import { Request, Response } from 'express';
import { Pool } from 'pg';

export class SpeciesController {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllSpecies(req: Request, res: Response) {
    try {
      const result = await this.pool.query('SELECT * FROM seafood_recoveries ORDER BY species_name');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching species data' });
    }
  }

  async getSpeciesById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.pool.query(
        'SELECT * FROM seafood_recoveries WHERE id = $1',
        [id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Species not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching species data' });
    }
  }
}