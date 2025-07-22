import * as React from 'react'
import { createRoot } from 'react-dom/client'

interface Props {
  bye?: boolean
}

function UnusedComponent (props: Props) {
  return props.bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent () {
  return <p>Hello, world!</p>
}

const root = createRoot(document.getElementById('body')!)
root.render(<MyComponent />)
