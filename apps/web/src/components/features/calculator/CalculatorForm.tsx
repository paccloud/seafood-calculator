import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CalculationResult {
  id: string
  weight: number
  pricePerPound: number
  totalCost: number
  type?: string
  createdAt: string
}

/**
 * Calculator form component for seafood cost calculations
 * @returns {JSX.Element} Calculator form component
 */
export function CalculatorForm() {
  const [weight, setWeight] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /**
   * Handles form submission and calculates results
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const weightNum = parseFloat(weight)
    const priceNum = parseFloat(price)
    
    if (isNaN(weightNum) || isNaN(priceNum)) {
      setError('Please enter valid numbers')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: weightNum,
          pricePerPound: priceNum,
          type: type || undefined
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save calculation')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="weight" className="block text-sm font-medium mb-1">
          Weight (lbs)
        </label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          Price per pound ($)
        </label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price per pound"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium mb-1">
          Type of Seafood (optional)
        </label>
        <Input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="e.g., Salmon, Tuna"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </Button>

      {result && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Results</h3>
          <p className="text-2xl font-bold">${result.totalCost.toFixed(2)}</p>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>Weight: {result.weight} lbs</p>
            <p>Price per pound: ${result.pricePerPound.toFixed(2)}</p>
            {result.type && <p>Type: {result.type}</p>}
            <p>Calculated on: {new Date(result.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </form>
  )
}
