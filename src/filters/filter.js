import dateFormat from '../utils/util'

export function datetime (value) {
  if (value) {
    if (typeof value === 'string') {
      value = Number(value)
    }
    let date = new Date(value)
    value = dateFormat(date, 'yyyy-MM-dd hh:mm')
  }
  return value
}

export function html2text (value) {
  if (value) {
    value = value.replace(/<[^>]*>/g, '')
  }
  return value
}

export function substr (value, start, length) {
  if (value) {
    value = value.substr(start, length)
  }
  return value
}

export function maxlength (value, length, ellipsis = true) {
  if (value) {
    if (value.length > length) {
      value = value.substr(0, length)
      if (ellipsis) value += '...'
    }
  }
  return value
}

export function number (value) {
  return parseInt(value)
}
const stateMap = {
  1: '正常',
  0: '已删除'
}
export function state (value) {
  return stateMap[value]
}
