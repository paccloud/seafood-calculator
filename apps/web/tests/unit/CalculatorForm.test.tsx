import { render, screen, fireEvent } from '@testing-library/react'
import { CalculatorForm } from '@/components/features/calculator/CalculatorForm'

describe('CalculatorForm', () => {
  it('renders all form elements', () => {
    render(<CalculatorForm />)
    
    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price per pound/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('calculates total cost correctly', () => {
    render(<CalculatorForm />)
    
    const weightInput = screen.getByLabelText(/weight/i)
    const priceInput = screen.getByLabelText(/price per pound/i)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    fireEvent.change(weightInput, { target: { value: '10' } })
    fireEvent.change(priceInput, { target: { value: '5' } })
    fireEvent.click(calculateButton)

    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })

  it('validates input fields', () => {
    render(<CalculatorForm />)
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    fireEvent.click(calculateButton)

    // HTML5 validation should prevent form submission
    expect(screen.queryByText(/results/i)).not.toBeInTheDocument()
  })

  it('handles decimal values', () => {
    render(<CalculatorForm />)
    
    const weightInput = screen.getByLabelText(/weight/i)
    const priceInput = screen.getByLabelText(/price per pound/i)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })

    fireEvent.change(weightInput, { target: { value: '2.5' } })
    fireEvent.change(priceInput, { target: { value: '3.99' } })
    fireEvent.click(calculateButton)

    expect(screen.getByText('$9.98')).toBeInTheDocument()
  })
})
