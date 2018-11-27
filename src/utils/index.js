
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
/**
 * 比较日期大小
 */
export function compareDate(date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if(oDate1.getTime() > oDate2.getTime()){
      return true
  } else {
      return false
  }
}
/**
 * 测评名称 两行显示
 * 先处理测评名称里的左右括号，统一替换为中文符号的括号
 * 通过左括号分割 换行显示
 */
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

/**
 * 根据域名判断是否显示价格字段
 * uwopai为一级域名时 显示价格
 * uwopai为二级域名时 不显示价格
 */
export function showPrice() {
  let sysbelong = location.href.substring(location.href.lastIndexOf('://')+3,location.href.lastIndexOf('.uwopai.com'))
  if (sysbelong === 'www' || sysbelong === 'http://') { 
    sysbelong = 'uwopai'
  }
  if (sysbelong === 'uwopai') {
    return true
  } else {
    return false
  }
}

