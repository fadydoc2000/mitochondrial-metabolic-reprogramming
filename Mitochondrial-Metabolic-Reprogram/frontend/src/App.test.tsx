import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the landing page for an anonymous visitor', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { level: 1, name: /track the metabolism/i })
  ).toBeInTheDocument()
  expect(screen.getAllByText(/Mitochondrial Metabolic Reprogramming/i).length).toBeGreaterThan(0)
})
