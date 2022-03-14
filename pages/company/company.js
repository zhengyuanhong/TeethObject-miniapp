const request = require("../../utils/request.js")
const util = require("../../utils/util.js")
const app = getApp()
Page({
  data: {
    dot_color: ["red", "orange", "yellow", "olive", "green", "blue", "purple", "pink", "brown"],
    adList: [],
    company: false,
    is_admin: false,
    is_salesman: false,
    modalName: null,
    btn_type: null,
    company_id: null,
    card_img: '/images/card.jpg',
    salesmanInfo: {},
    salesman_name: '',
    sale_phone: '',
    activity: ''
  },
  onLoad: function (e) {
    var sence = this.parseQueryString(decodeURIComponent(e.scene))
    console.log(sence)
    this.setData({
      company_id: sence.company_id
    })

    wx.setStorageSync('company_id', sence.company_id)
    //从二维码如果进来，保存业务员的id
    if (sence.salesman_id !== undefined) {
      console.log('salesman_id', sence.salesman_id)
      wx.setStorageSync('salesman_id', sence.salesman_id)
    } else {
      wx.removeStorageSync('salesman_id')
    }

    console.log('app.index', app)
    var that = this
    app.userLogin().then((res) => {
      console.log('promise同步', res)
      that.getIndex(sence.company_id)
      if (sence.salesman_id !== undefined) {
        that.getOtherUser(sence.salesman_id)
      }
      that.getOnActivity(sence.company_id, sence.activity_id)
    })
  },
  onReady() {
    that.setData({
      card_img: '/images/card.jpg'
    })
  },
  getIndex(id) {
    var that = this
    request.indexData(app, {
      company_id: id
    }, (res) => {
      console.log('getIndex', res)
      if (res.code == 201) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      } else if (res.code == 202) {
        request.showErrToast('您不属于这家口腔的用户')
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 1000)
      } else {
        that.setData({
          company: res.data.company,
          adList: res.data.ad,
          is_admin: res.data.is_admin,
          is_salesman: res.data.is_salesman
        })

        wx.setStorageSync('role', {
          is_admin: res.data.is_admin,
          is_salesman: res.data.is_salesman
        })
      }
    })
  },
  getOnActivity(company_id, activity_id) {
    var that = this
    request.getOneActivity(app, {
      company_id: company_id,
      activity_id: activity_id
    }, (res) => {
      console.log('getOneActivity', res)
      that.setData({
        activity: res
      })
      wx.setNavigationBarTitle({
        title: res.name,
      })
    })
  },
  toAd(e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/teeth/teeth?id=' + id,
    })
  },
  getCard(e) {
    var that = this,
      type = e.currentTarget.dataset.type
    console.log('getCard', e)
    that.setData({
      modalName: null
    })
    that.dingyue(() => {
      wx.navigateTo({
        url: '/pages/user/vip',
      })
    }, type)
  },
  openDinYue() {
    this.setData({
      modalName: 'image'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  setNotice() {
    wx.openSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res)
      }
    })
    this.setData({
      modalName: null
    })
  },
  formGua(e) {
    var that = this,
      type = e.currentTarget.dataset.type
    console.log('formGua', e)
    that.setData({
      modalName: null
    })
    that.dingyue(() => {
      wx.navigateTo({
        url: '/pages/user/gua',
      })
    }, type)
  },
  LookPrice(e) {
    var that = this,
      type = e.currentTarget.dataset.type
    console.log('LookPrice', e)
    that.setData({
      modalName: null
    })
    that.dingyue(() => {
      wx.navigateTo({
        url: '/pages/teethObj/teethObj',
      })
    }, type)
  },
  subscribeTooth(e) {
    var that = this,
      type = e.currentTarget.dataset.type
    console.log('subscribeTooth', e)
    that.setData({
      modalName: null
    })
    that.dingyue(() => {
      wx.navigateTo({
        url: "/pages/cleanTeeth/cleanTeeth",
      })
    }, type)
  },
  toAdmin() {
    wx.navigateTo({
      url: '/pages/admin/admin',
    })
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },
  goThere() {
    let that = this
    wx.openLocation({
      latitude: that.data.company.latitude,
      longitude: that.data.company.longitude,
      name: that.data.company.name,
      scale: 16,
      address: that.data.company.address
    })
  },
  call() {
    var that = this
    var phone = that.data.company.phone
    if (wx.getStorageSync('salesman_id')) {
      phone = that.data.sale_phone
    }

    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    }).catch((res) => {
      console.log(res)
    })
  },
  onShow: function () {
    var that = this
    if (wx.getStorageSync('company_id')) {
      this.getIndex(wx.getStorageSync('company_id'))
    }
  },
  parseQueryString(str) {
    var json = {};
    var arr = str.substr(str.indexOf('?') + 1).split('&');
    arr.forEach(function (item) {
      var tmp = item.split('=');
      json[tmp[0]] = tmp[1];
    })
    return json;
  },
  dingyue(callback, type) {
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: app.globalData.tmplIds,
      success(res) {
        if (res[app.globalData.tmplIds[0]] == 'reject') {
          console.log('拒绝')
          that.setData({
            modalName: 'notice',
            btn_type: type
          })
        } else {
          callback()
        }
      }
    })
  },
  getOtherUser(user_id) {
    var that = this
    request.getOtherUserInfo(app, {
      user_id: user_id
    }, (res) => {
      console.log('getOtherUser', res)
      that.setData({
        salesmanInfo: res,
        salesman_name: res.name,
        sale_phone: res.phone
      })
    })
  },
  copyPhone() {
    var that = this
    var phone = that.data.company.phone
    if (wx.getStorageSync('salesman_id')) {
      phone = that.data.sale_phone
    }
    wx.setClipboardData({
      data: phone,
      success: function () {
        console.log('微信号复制成功')
        request.showErrToast('微信号复制成功')
      }
    })
  },
  onShareAppMessage: function (res) {
    var role = wx.getStorageSync('role')
    var userInfo = wx.getStorageSync('userInfo')
    var query = ''
    if (role.is_admin || role.is_salesman) {
      query = encodeURIComponent('company_id=' + this.data.company.id + '&salesman_id=' + userInfo.id)
    } else {
      query = encodeURIComponent('company_id=' + this.data.company.id)
    }
    console.log(query)
    return {
      title: this.data.company.name,
      imageUrl: this.data.company.index_head_image,
      path: '/pages/company/company?scene=' + query
    }
  }
})