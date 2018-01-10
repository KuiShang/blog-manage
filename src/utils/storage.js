const storageKey = {
  'TOKEN': 'token'
}

const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}
const getStorage = (key) => {
  return localStorage.getItem(key)
}
export {
  storageKey,
  setStorage,
  getStorage
}
