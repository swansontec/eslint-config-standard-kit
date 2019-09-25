import React, { ReactElement } from 'react'
import { render } from 'react-dom'

interface Props {
  bye?: boolean
}

function InnerComponent (props: Props): ReactElement {
  return props.bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent (): ReactElement {
  return <InnerComponent bye />
}

render(<MyComponent />, document.getElementById('body'))
