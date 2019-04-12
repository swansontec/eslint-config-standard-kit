interface SomeObject {
  x: number
  y: string
}
const x: SomeObject = { x: 1, y: 'text' }

function someFunction (param) {
  console.log(param)
}

someFunction(x)
