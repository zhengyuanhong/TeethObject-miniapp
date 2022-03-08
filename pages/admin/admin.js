const request = require('../../utils/request.js')
const app = getApp()
// pages/admin/admin.js
Page({
  data: {
    userInfo: {},
    is_admin: false,
    is_salesman: false
  },
  onLoad: function (options) {
    this.setData(wx.getStorageSync('role'))
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  onReady: function () {

  },
  toTeam(e) {
    wx.navigateTo({
      url: '/pages/team/team',
    })
  },
  toCustomer() {
    wx.navigateTo({
      url: '/pages/custome/custome',
    })
  },
  toQrCode() {
    wx.navigateTo({
      url: '/pages/admin/qrCode',
    })
  },
  toCustomerAppoint() {
    wx.navigateTo({
      url: '/pages/admin/customerAppoint',
    })
  },
  getUserInfo() {
    var that = this,
      FormData = {}
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res)
        FormData.gender = res.userInfo.gender
        FormData.avatar = res.userInfo.avatarUrl
        FormData.name = res.userInfo.nickName

        request.updateUserInfo(app, FormData, (res1) => {
          request.showErrToast('登录成功')
          var user_info = wx.getStorageSync('userInfo')
          if (user_info) {
            user_info.name = res.userInfo.nickName
            user_info.avatar = res.userInfo.avatarUrl
            user_info.gender = res.userInfo.gender
            wx.setStorageSync('userInfo', user_info)
            that.setData({
              userInfo: user_info
            })
          }
        })
      }
    })
  }
})