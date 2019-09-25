interface SomeObject {
  x: number
  y: string
}
const x: SomeObject = { x: 1, y: 'text' }

function someFunction (param): number {
  console.log(param)
  return 1
}

someFunction(x)
