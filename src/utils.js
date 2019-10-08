/**
 * Removes the specified keys from an object.
 */
export function removeProps(object, list) {
  const out = {}
  for (const key in object) {
    if (list.indexOf(key) < 0) out[key] = object[key]
  }
  return out
}

/**
 * Makes a copy of an object, sorting its keys.
 */
export function sortObject(object) {
  const out = {}
  Object.keys(object)
    .sort()
    .forEach(function(key) {
      out[key] = object[key]
    })
  return out
}

/**
 * Splits an array in two based on the provided test.
 */
export function splitArray(array, test) {
  const out = { no: [], yes: [] }
  for (let i = 0; i < array.length; ++i) {
    const item = array[i]
    if (test(item)) out.yes.push(item)
    else out.no.push(item)
  }
  return out
}

/**
 * Splits an object in two based on the provided test.
 */
export function splitObject(object, test) {
  const out = { no: {}, yes: {} }
  for (const key in object) {
    if (test(key)) out.yes[key] = object[key]
    else out.no[key] = object[key]
  }
  return out
}
