import { useState } from 'react'
import { BaseButton } from './components'
import { Icons } from '@/components'
import { encodeSVG } from '@/components/utils.ts'

// translationService('', '')
function App() {
  const [count, setCount] = useState(0)
  const testFunction = () => {
    setCount(count + 1)
  }
  const svg = encodeSVG(
    '<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">\n' +
      '  <path\n' +
      '    d="M 371.2 127.2 Q 380.8 115.2 396 115.2 L 505.6 115.2 L 505.6 115.2 Q 511.2 114.4 512 108.8 Q 511.2 103.2 505.6 102.4 L 396 102.4 L 396 102.4 Q 375.2 103.2 360.8 118.4 L 140.8 385.6 L 140.8 385.6 Q 131.2 396.8 116 396.8 L 6.4 396.8 L 6.4 396.8 Q 0.8 397.6 0 403.2 Q 0.8 408.8 6.4 409.6 L 116 409.6 L 116 409.6 Q 136.8 408.8 151.2 393.6 L 371.2 127.2 L 371.2 127.2 Z M 339.2 396.8 Q 333.6 397.6 332.8 403.2 Q 333.6 408.8 339.2 409.6 L 505.6 409.6 L 505.6 409.6 Q 511.2 408.8 512 403.2 Q 511.2 397.6 505.6 396.8 L 339.2 396.8 L 339.2 396.8 Z"\n' +
      '  />\n' +
      '</svg>'
  )
  return (
    <>
      <h1 className="text-amber">
        Vite + React <Icons className="text-xl" text={svg} />
      </h1>
      <BaseButton onClick={testFunction} text={'123'} />
    </>
  )
}

export default App
