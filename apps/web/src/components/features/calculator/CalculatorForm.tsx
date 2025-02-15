"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { WeightInput } from './WeightInput'
import { PriceInput } from './PriceInput'
import { TypeInput } from './TypeInput'
import { ResultDisplay } from './ResultDisplay'

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
      <WeightInput
        weight={weight}
        setWeight={setWeight}
        loading={loading}
      />
      <PriceInput
        price={price}
        setPrice={setPrice}
        loading={loading}
      />
      <TypeInput
        type={type}
        setType={setType}
        loading={loading}
      />

      {error && (
        <div className="text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </Button>

      <ResultDisplay result={result} />
    </form>
  )
}
