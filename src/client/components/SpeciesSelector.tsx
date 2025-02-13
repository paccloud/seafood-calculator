import React, { useState, useEffect } from 'react';

interface Species {
  id: number;
  species_name: string;
  description: string;
}

interface SpeciesSelectorProps {
  onSelect: (species: Species) => void;
}

export const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({ onSelect }) => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpecies();
  }, []);

  const fetchSpecies = async () => {
    try {
      const response = await fetch('/api/species');
      if (!response.ok) {
        throw new Error('Failed to fetch species');
      }
      const data = await response.json();
      setSpecies(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading species...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="species-selector">
      <h2>Select Species</h2>
      <select 
        onChange={(e) => {
          const selected = species.find(s => s.id === parseInt(e.target.value));
          if (selected) onSelect(selected);
        }}
      >
        <option value="">Select a species...</option>
        {species.map(s => (
          <option key={s.id} value={s.id}>
            {s.species_name}
          </option>
        ))}
      </select>
    </div>
  );
};