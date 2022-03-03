const request = require('../../utils/request.js')
const app = getApp()
Page({
  data: {
    TabCur: 0,
    appoint_info: false,
    scrollLeft: 0,
    date_arr: {},
    current_date: '',
    teeth_data_arr: {},
    appoint_data: [],
    is_admin: false,
    is_salesman: false,
    actionArr: ['appoint', 'addHead'],
    ad: [],
    status: {
      await: {
        text: '审核中',
        color: 'yellow'
      },
      success: {
        text: '预约成功',
        color: 'green'
      },
      failed: {
        text: '预约失败',
        color: 'red'
      },
      arrived: {
        text: '已完成',
        color: 'green'
      }
    }
  },
  onLoad() {
    this.setData(wx.getStorageSync('role'))
    console.log('admin', app.globalData.userInfo.is_admin)
  },
  onReady() {
    this.getTeethData({
      company_id: wx.getStorageSync('company_id')
    })
    this.getAd()
  },
  getAd() {
    var that = this
    request.ad(app, {
      company_id: wx.getStorageSync('company_id')
    }, (res) => {
      console.log('ad', res)
      that.setData({
        ad: res
      })
    })
  },
  toAd() {
    var that = this
    if (that.data.ad) {
      wx.navigateTo({
        url: '/pages/teeth/teeth?id=' + that.data.ad.id,
      })
    }
  },
  getTeethData(data) {
    var that = this
    request.getTeethData(app, data, (res) => {
      console.log('geteethData', res)
      that.setData({
        date_arr: res.date_arr,
        teeth_data_arr: res.clean_tooth_arr,
        current_date: res.date_arr.current_date,
        appoint_info: res.appoint_info,
        appoint_data: res.clean_tooth_arr.appoint_content
      })
    })
  },
  tabSelect(e) {
    var index = e.currentTarget.dataset.id
    var date = this.data.date_arr.date[index]
    this.getTeethData({
      date: date,
      company_id: wx.getStorageSync('company_id')
    })

    this.setData({
      current_date: date,
      appoint_data: [],
      appoint_info: false,
      TabCur: index,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log('tabselect', index, date)
  },
  operate(e) {
    console.log(e.currentTarget.id)
    var index = e.currentTarget.id
    var that = this,
      actionArr = that.checkOperate()

    if (!(that.data.is_admin || that.data.is_salesman)) {
      if (that.data.appoint_data[index].head == 0) {
        wx.showToast({
          title: '已约满',
          icon: 'none'
        })
        return
      }
    }

    wx.showActionSheet({
      itemList: actionArr[1],
      success(res) {
        console.log(res.tapIndex)
        that[actionArr[0][res.tapIndex]](index)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  checkOperate() {
    var is_admin = this.data.is_admin
    var is_salesman = this.data.is_salesman
    if (!(is_admin || is_salesman)) {
      return [
        ['appoint'],
        ['立即预约']
      ]
    } else if (is_admin || is_salesman) {
      return [
        ['addHead', 'subHead'],
        ['增加位置', '减少位置']
      ]
    }
  },
  disOperate() {
    console.log('不能预约')
  },
  updateData(data, newArr) {
    var that = this
    return new Promise((resolve)=>{
      request.updateCleanTeethData(app, data, (res) => {
        console.log('updateCleanTeethData', res)
        if (res.code === 201) {
          if (res.message == 'no_card') {
            that.tipNoCard()
          } else {
            request.showErrToast(res.message)
          }
          that.getTeethData({
            date: that.data.current_date,
            company_id: wx.getStorageSync('company_id')
          })
          return
        }
        that.setData({
          appoint_data: newArr
        })
        resolve(res)
      })
    })
  },
  tipNoCard() {
    request.showModal('您未领取看牙卡，是否现在去领取？', () => {
      wx.navigateTo({
        url: '/pages/user/vip',
      })
    }, () => {})
  },
  getOneRecord() {
    var that = this,
      data = {
        date: that.data.current_date
      }
    request.getOneRecord(app, wx.getStorageSync('company_id'), data, (res) => {
      console.log('getOneRecord', res)
      that.setData({
        appoint_info: res.appoint_info
      })
    })
  },
  appoint(index) {
    var oldArr = this.data.appoint_data
    oldArr[index].head = oldArr[index].head - 1
    oldArr[index].is_appoint = 0

    var data = {
      clean_tooth_date: this.data.current_date,
      appoint_content: oldArr,
      time: this.data.current_date + ' ' + oldArr[index].time,
      company_id: wx.getStorageSync('company_id')
    }
    var that = this
    that.updateData(data, oldArr).then((res)=>{
      that.getOneRecord()
    })
    console.log('预约')
  },
  subHead(index) {
    var oldArr = this.data.appoint_data
    if (oldArr[index].head <= 0) {
      wx.showToast({
        title: '不能在减了',
        icon: 'none'
      })
      return
    }

    oldArr[index].head = oldArr[index].head - 1
    oldArr[index].is_appoint = 0

    var data = {
      clean_tooth_date: this.data.current_date,
      appoint_content: oldArr,
      company_id: wx.getStorageSync('company_id')
    }
    var that = this
    that.updateData(data, oldArr).then((res)=>{
      that.getOneRecord()
    })
    console.log('减少位置')
  },
  addHead(index) {
    var oldArr = this.data.appoint_data
    oldArr[index].head = oldArr[index].head + 1
    oldArr[index].is_appoint = 0

    var data = {
      clean_tooth_date: this.data.current_date,
      appoint_content: oldArr,
      company_id: wx.getStorageSync('company_id')
    }
    var that = this
    that.updateData(data, oldArr).then((res)=>{
      that.getOneRecord()
    })
    console.log('增加位置', data, oldArr)
  },
  cancelAppoint() {
    var that = this,
      data = {
        record_id: that.data.appoint_info.id,
        type:'cancel'
      },
      index = that.getIndex()

    console.log('getIndex', index)
    request.showModal('是否取消预约？', () => {
      request.updateAppoint(app, wx.getStorageSync('company_id'), data, (res) => {
        console.log('取消成功')
        that.getTeethData({
          date: that.data.current_date,
          company_id: wx.getStorageSync('company_id')
        })
        that.getOneRecord()
      })
    }, () => {})
  },
  splitStr(str) {
    var newArr = str.split(' ')
    newArr = newArr[1].split(':')
    return newArr[0] + ':' + newArr[1]
  },
  getIndex() {
    var that = this,
      appoint_data = that.data.appoint_data,
      appoint_info = that.data.appoint_info,
      arr_index = 0

    if (!appoint_info) {
      return
    }

    var time = that.splitStr(appoint_info.appoint_date_at)
    for (var index = 0; index < appoint_data.length; index++) {
      if (appoint_data[index].time == time) {
        arr_index = index
        break
      }
    }
    return arr_index
  }
})