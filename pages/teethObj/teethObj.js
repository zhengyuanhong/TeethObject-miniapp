const request = require('../../utils/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAd()
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
  detail(e) {
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/teethObj/detail?type=' + type,
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})