"use client"

import * as React from "react"

interface CalculationResult {
  id: string
  weight: number
  pricePerPound: number
  totalCost: number
  type?: string
  createdAt: string
}

interface ResultDisplayProps {
  result: CalculationResult | null;
}

const ResultDisplay = React.forwardRef<HTMLDivElement, ResultDisplayProps>(
  ({ result }, ref) => {
    if (!result) {
      return null;
    }

    return (
      <div className="mt-6 p-4 bg-muted rounded-lg" ref={ref}>
        <h3 className="font-medium mb-2">Results</h3>
        <p className="text-2xl font-bold">${result.totalCost.toFixed(2)}</p>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p>Weight: {result.weight} lbs</p>
          <p>Price per pound: ${result.pricePerPound.toFixed(2)}</p>
          {result.type && <p>Type: {result.type}</p>}
          <p>Calculated on: {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      </div>
    );
  }
)
ResultDisplay.displayName = "ResultDisplay"

export { ResultDisplay }