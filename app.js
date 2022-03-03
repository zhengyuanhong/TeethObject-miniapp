
const request = require('./utils/request.js')
App({
  onLaunch(e) {
    console.log('app.js', e)
    this.getStsytem()
    this.autoUpdate()
    console.log(this.globalData)
  },
  getStsytem() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  userLogin() {
    return new Promise((resolve) => {
      var that = this
      var userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        wx.login({
          success: function (res) {
            console.log('登录中', res)
            request.register(res.code, function (e) {
              console.log('request.login', e)
              console.log('token.login', e.token)
              that.globalData.userInfo = e
              wx.setStorageSync('session_key', e.session_key)
              wx.setStorageSync('userInfo', e)
              resolve(e)
            })
          }
        })
      } else {
        that.globalData.userInfo = userInfo
        resolve(userInfo)
        console.log('已经登录', that.globalData)
      }
    })
  },
  autoUpdate: function () {
    // var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('检测更新', res)
        if (res.hasUpdate) {
          console.log('更新中')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  getCardInfo(app,company_id) {
    var that = this
    var cardInfo = wx.getStorageSync('cardInfo')
    return new Promise((resolve) => {
      if (!cardInfo) {
        request.cardInfo(app, company_id, null, (res) => {
          console.log('cardInfo', res)
          resolve(res)
          wx.setStorageSync('cardInfo', res)
        })
      } else {
        resolve(cardInfo)
      }
    })
  },
  globalData: {
    userInfo: {},
    tmplIds: ['eVhhpoEWrJGPecxMxcY4Z0uNuaUvpN6ZusDYvAtU7ow', '57p3KiZA6zK4rF7sQ8_rOCd3D6gpmDGIALGQcsLMzYQ']
  },
  ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
  ]
})