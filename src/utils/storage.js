const storageKey = {
  'TOKEN': 'token',
  'CATALOGS': 'catalogs'
}

const setStorage = (key, value) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}
const getStorage = (key) => {
  let val = localStorage.getItem(key)
  try {
    return JSON.parse(val)
  } catch (error) {
    return val
  }
}
export {
  storageKey,
  setStorage,
  getStorage
}
