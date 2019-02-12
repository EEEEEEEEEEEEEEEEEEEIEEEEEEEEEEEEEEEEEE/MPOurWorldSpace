/**
 * 日期格式化
 * @description 传入时间戳，返回 0000-00-00 00:00:00 格式的日期
 * @param {*} date 
 */
const formatTime = date => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);
  return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
}

module.exports = {
  formatTime: formatTime
}
