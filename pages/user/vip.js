const request = require('../../utils/request.js')
const app = getApp()

Page({
  data: {
    user_info: {},
    user_card: {}
  },
  getRecord() {
    wx.navigateTo({
      url: '/pages/user/record',
    })
  },
  drawCard() {
    var that = this
    wx.navigateTo({
      url: '/pages/user/drawCard',
    })
  },
  getCardInfo() {
    var company_id = wx.getStorageSync('company_id')
    var that = this
    request.cardInfo(app, company_id, null, (res) => {
      console.log('cardInfo', res)
      that.setData({
        user_card: res,
        user_info: res.user
      })
      wx.setStorageSync('cardInfo', res)
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    console.log('onShow')
    this.getCardInfo()
  }
})