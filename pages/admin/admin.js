// pages/admin/admin.js
Page({
  data: {
    userInfo: {},
    is_admin:false,
    is_salesman:false
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
  toCustomerAppoint(){
    wx.navigateTo({
      url: '/pages/admin/customerAppoint',
    })
  }
})