import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components'

function App() {
  const [count, setCount] = useState(0)
  const testFunction = () => {
    setCount(count + 1)
  }
  return (
    <>
      <h1>Vite + React</h1>
      <Button onClick={testFunction} text="Click me">
        <Button.Items>Item 1</Button.Items>
        <Button.Items>Item 2</Button.Items>
      </Button>
    </>
  )
}

export default App
