import * as React from 'react'
import { createRoot } from 'react-dom/client'

interface Props {
  bye?: boolean
}

function InnerComponent (props: Props): React.ReactElement {
  const { bye = false } = props
  return bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent (): React.ReactElement {
  return <InnerComponent bye />
}

const root = createRoot(document.getElementById('body')!)
root.render(<MyComponent />)
