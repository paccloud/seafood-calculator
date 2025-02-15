"use client"

import { Input } from '@/components/ui/input'
import * as React from "react"

interface PriceInputProps extends React.HTMLAttributes<HTMLInputElement> {
  price: string;
  setPrice: (price: string) => void;
  loading: boolean;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  ({ className, price, setPrice, loading, ...props }, ref) => {
    return (
      <div className="mb-4">
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
          className={className}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
PriceInput.displayName = "PriceInput"

export { PriceInput }