// @flow

import * as React from 'react'
import { render } from 'react-dom'

type Props = {
  bye?: boolean
}

function InnerComponent (props: Props) {
  return props.bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent () {
  return <InnerComponent bye />
}

render(MyComponent, document.getElementById('body'))
