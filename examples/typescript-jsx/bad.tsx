import React from 'react'
import { render } from 'react-dom'

interface Props {
  bye?: boolean
}

function UnusedComponent (props: Props) {
  return props.bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent () {
  return <p>Hello, world!</p>
}

render(<MyComponent />, document.getElementById('body'))
