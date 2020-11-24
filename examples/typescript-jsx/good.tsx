import * as React from 'react'
import { render } from 'react-dom'

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

render(<MyComponent />, document.getElementById('body'))
