"use client"

import { Input } from '@/components/ui/input'
import * as React from "react"

interface TypeInputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string;
  setType: (type: string) => void;
  loading: boolean;
}

const TypeInput = React.forwardRef<HTMLInputElement, TypeInputProps>(
  ({ className, type, setType, loading, ...props }, ref) => {
    return (
      <div className="mb-4">
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
          className={className}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
TypeInput.displayName = "TypeInput"

export { TypeInput }