import { CalculatorForm } from '@/components/features/calculator/CalculatorForm'

/**
 * Home page component
 * Displays the main calculator interface
 */
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">
        Seafood Calculator
      </h1>
      <p className="text-muted-foreground mb-8">
        Calculate accurate seafood costs for your business
      </p>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <CalculatorForm />
      </div>
    </div>
  )
}
