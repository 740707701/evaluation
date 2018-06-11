export default {
  //字符串日期转换成日期格式
  stringToDate: function(dateStr, separator) {
    if (!separator) {
      separator = '-'
    }
    let dateArr = dateStr.slice(0, 10).split(separator)
    let timeArr = dateStr.slice(11).split(":")
    let year = dateArr[0]
    let month;
    if (dateArr[1].indexOf('0') == '0') { //月份<10
      month = parseInt(dateArr[1].substring(1))
    } else { //月份>=10
      month = parseInt(dateArr[1])
    }
    let day = parseInt(dateArr[2])

    let hour = parseInt(timeArr[0])
    let minute = parseInt(timeArr[1])
    let second = parseInt(timeArr[2])
    var date = new Date(year, month - 1, day, hour, minute, second)
    return date
  },
  //获取距离当前时间的时间段
  getTime: function(timeStr) {
    //获取当前时间的 年,月,日
    let date = new Date()
    let curYear = date.getFullYear()
    let curMonth = date.getMonth()
    let curDay = date.getDate()
    let curHour = date.getHours()
    let curMinute = date.getMinutes()
    let curSecond = date.getSeconds()

    let time = this.stringToDate(timeStr)
      // 获取某一时间的年月日
    let timeYear = time.getFullYear()
    let timeMonth = time.getMonth()
    let timeDay = time.getDate()
    let timeHour = time.getHours()
    let timeMinute = time.getMinutes()
    let timeSecond = time.getSeconds()

    let year, month, day, hour, minute, second

    //计算
    year = (curYear - timeYear) > 0 ? (curYear - timeYear) : ''
    month = (curMonth - timeMonth) > 0 ? (curMonth - timeMonth) : ''
    day = (curDay - timeDay) > 0 ? (curDay - timeDay) : ''
    hour = (curHour - timeHour) > 0 ? (curHour - timeHour) : ''
    minute = (curMinute - timeMinute) > 0 ? (curMinute - timeMinute) : ''
    second = (curSecond - timeSecond) > 0 ? (curSecond - timeSecond) : ''

    // return year, month, day, hour, minute, second
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second
    }

  }
}