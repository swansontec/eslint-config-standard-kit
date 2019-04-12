// React is used, but without the JSX rules, we can't see that:
import React from 'react'
import { render } from 'react-dom'

type Props = {
  bye?: boolean
}

function InnerComponent (props: Props) {
  return props.bye ? <p>Goodbye</p> : <p>Hello, world!</p>
}

function MyComponent (props: Props) {
  // The inner component is used, but without the JSX rules, we can't see that:
  return <InnerComponent bye/>
}

render(MyComponent, document.getElementById('body'))
