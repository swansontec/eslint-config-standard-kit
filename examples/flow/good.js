// @flow

export type SomeObject = {
  x: number,
  y: string
}
const x: SomeObject = { x: 1, y: 'text' }

function someFunction (param: SomeObject): number {
  console.log(param)
  return 1
}

someFunction(x)
