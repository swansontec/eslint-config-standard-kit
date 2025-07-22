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
 * Copies a JSON tree, sorting its object keys.
 */
export function sortJson(json) {
  // Avoid basic types:
  if (typeof json !== 'object' || json == null) {
    return json
  }

  // Recurse into arrays:
  if (Array.isArray(json)) {
    const out = []
    for (let i = 0; i < json.length; ++i) {
      out[i] = sortJson(json[i])
    }
    return out
  }

  // Sort object keys:
  const out = {}
  const keys = Object.keys(json).sort()
  for (const key of keys) {
    out[key] = sortJson(json[key])
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
