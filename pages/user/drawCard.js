const request = require('../../utils/request.js')
const app = getApp()
Page({

  data: {
    avatarUrl: '/images/user.png',
    ad: false,
    session_key: '',
    phone: '',
  },
  drawCard(e) {
    var that = this
    var FormData = e.detail.value
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
        FormData.gender = res.userInfo.gender
        FormData.avatar = res.userInfo.avatarUrl

        if (wx.getStorageSync('salesman_id')) {
          FormData.sale_user_id = wx.getStorageSync('salesman_id')
        }
        FormData.company_id = wx.getStorageSync('company_id')
        console.log('submit', FormData)
        that.postDrawCard(FormData)
      },
      fail: () => {
        wx.showToast({
          title: '未完善个人信息，领取失败',
          icon: 'none'
        })
      }
    })
  },
  getPhoneNumber(e) {
    var that = this
    console.log(e)
    request.getPhone(app, {
      code: e.detail.code
    }, (res) => {
      console.log(res)
      that.setData({
        phone: res.phone_info.phoneNumber
      })
    })
  },
  getUserInfo() {
    request.getUserInfo(app, null, (res) => {
      console.log('getUserInfo', res)
      app.globalData.userInfo = res
      wx.setStorageSync('userInfo', res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  postDrawCard(data) {
    var that = this
    request.postDrawCard(app, data, (res) => {
      console.log('postDrawCard', res)
      that.getUserInfo()
      request.showErrToast('领取成功')
      setTimeout(() => {
        wx.navigateBack({ //返回
          delta: 1
        })
      }, 1500)
    })
  },
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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