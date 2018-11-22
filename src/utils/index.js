
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function compareDate(date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if(oDate1.getTime() > oDate2.getTime()){
      return true
  } else {
      return false
  }
}

export function splitTitle(str) {
  const strArr = []
  const pattern = /[()（）]/
  if(pattern.test(str)){
    str = str.replace(new RegExp('[(（]', 'gm'), '（')
    str = str.replace(new RegExp('[)）]', 'gm'), '）')
    strArr[0] = str.substr(0, str.indexOf('（'))
    strArr[1] = str.substr(str.indexOf('（'), str.indexOf('）'))
  } else {
    strArr[0] = str
  }
  return strArr
}

