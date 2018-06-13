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
  //获取两个时间之间的时间段
  getTime: function(startTime, endTime) {
    let end
    if (endTime) {
      end = this.stringToDate(endTime)
    } else {
      end = new Date()
    }
    let endYear = end.getFullYear()
    let endMonth = end.getMonth()
    let endDay = end.getDate()
    let endHour = end.getHours()
    let endMinute = end.getMinutes()
    let endSecond = end.getSeconds()

    let start = this.stringToDate(startTime)
      // 获取某一时间的年月日
    let startYear = start.getFullYear()
    let startMonth = start.getMonth()
    let startDay = start.getDate()
    let startHour = start.getHours()
    let startMinute = start.getMinutes()
    let startSecond = start.getSeconds()

    let year, month, day, hour, minute, second

    //计算
    year = (endYear - startYear) > 0 ? (endYear - startYear) : ''
    month = (endMonth - startMonth) > 0 ? (endMonth - startMonth) : ''
    day = (endDay - startDay) > 0 ? (endDay - startDay) : ''
    hour = (endHour - startHour) > 0 ? (endHour - startHour) : ''
    minute = (endMinute - startMinute) > 0 ? (endMinute - startMinute) : ''
    second = (endSecond - startSecond) > 0 ? (endSecond - startSecond) : ''

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