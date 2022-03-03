const request = require('../../utils/request.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    date: '2021-12-25',
    time: ['12:00', '18:00'],
    timeArr: ['上午', '下午'],
    time_index: 0,
    card_info: {},
    name: '',
    phone: '',
    ad: false
  },
  useCard() {
    var that = this
    if (!that.data.card_info.is_receive) {
      request.showModal('您未领取看牙卡，是否现在去领取？', () => {
        wx.navigateTo({
          url: '/pages/user/vip',
        })
      }, () => {})
      return
    }

    that.setData({
      name: that.data.card_info.user.name,
      phone: that.data.card_info.phone
    })
  },
  getAd() {
    var that = this
    request.ad(app, {
      company_id: wx.getStorageSync('company_id')
    }, (res) => {
      console.log(res)
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
  appointFilm(data) {
    request.appointFilm(app, data, (res) => {
      request.showErrToast('预约成功')
      setTimeout(() => {
        wx.navigateBack({ //返回
          delta: 1
        })
      }, 2000)
    })
  },
  getCardInfo() {
    var that = this
    app.getCardInfo(app, wx.getStorageSync('company_id')).then((res) => {
      console.log('cardInfo', res)
      that.setData({
        card_info: res
      })
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time_index: e.detail.value
    })
  },
  submit(e) {
    var that = this,
      FormData = e.detail.value
    FormData.time = that.data.date + ' ' + that.data.time[that.data.time_index]
    FormData.company_id = wx.getStorageSync('company_id')

    if (wx.getStorageSync('salesman_id')) {
      FormData.sale_user_id = wx.getStorageSync('salesman_id')
    }

    console.log('submit', FormData)
    that.appointFilm(FormData)
  },
  onLoad: function (options) {
    console.log('date', util.formatTime(new Date()))
    this.getCurrentDate()
    this.getAd()
  },
  onReady() {
    this.getCardInfo()
  },
  getCurrentDate() {
    this.setData({
      date: util.getDate(new Date())
    })
  }
})