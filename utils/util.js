const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute].map(formatNumber).join(':')}`
}

const getDate = date=>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const getTime = date=>{
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getNewArray = function(arr,length){
  var newArray = []
  for(var index=0;index<arr.length;index+=length){
    newArray.push(arr.slice(index,index+length))
  }
  return newArray
}

module.exports = {
  formatTime,
  getNewArray,
  getDate,
  getTime
}
