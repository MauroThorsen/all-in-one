import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import Button from './index'
import '@testing-library/jest-dom'

test('Button component renders the provided text', () => {
  const { getByText } = render(<Button onClick={() => {}} text="Click me" />)
  expect(getByText('Click me')).toBeInTheDocument()
})
