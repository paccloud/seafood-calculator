"use client"

import { Input } from '@/components/ui/input'
import * as React from "react"

interface WeightInputProps extends React.HTMLAttributes<HTMLInputElement> {
  weight: string;
  setWeight: (weight: string) => void;
  loading: boolean;
}

const WeightInput = React.forwardRef<HTMLInputElement, WeightInputProps>(
  ({ className, weight, setWeight, loading, ...props }, ref) => {
    return (
      <div className="mb-4">
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
          className={className}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
WeightInput.displayName = "WeightInput"

export { WeightInput }