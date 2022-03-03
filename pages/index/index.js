const request = require('../../utils/request.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
    key: 'O4ABZ-2FQRJ-O63FE-KBQEI-YNZHS-5GBFJ' // 必填
});
const app = getApp()
Page({

    data: {
        company: [],
        page: 1,
        lon: 0,
        lat: 0
    },
    onLoad: function (options) {

    },
    onReachBottom() {
        this.getCompany(this.data.lat, this.data.lon)
    },
    getCompany(lat, lon) {
        var that = this
        var data = {
            page: this.data.page,
            lat: lat,
            lon: lon
        }
        request.getCompany(app, data, (res) => {
            console.log('getCompany', res)
            if (res.length > 0) {
                // that.getDistance(res)
                console.log(res)
                that.setData({
                    company: that.sortDis(that.data.company.concat(res)),
                    page: that.data.page + 1
                })
            }
        })
    },
    toIndex(e) {
        console.log(e)
        var id = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/company/company?scene=' + encodeURIComponent('company_id=' + id)
        })
    },
    getLocal() {
        var that = this
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                console.log('getLocal', res)
                that.getCompany(res.latitude, res.longitude)
                that.setData({
                    lat: res.latitude,
                    lon: res.longitude
                })
            }
        })
    },
    sortDis(arr) {
        return arr.sort((a, b) => {
            return a.distance - b.distance
        })
    },
    onReady() {
        var that = this
        app.userLogin().then((res) => {
            console.log('promise同步', res)
            that.getLocal()
        })
    },
    onPullDownRefresh() {
        this.onReady()
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: function (res) {
        return {
          title: '小民看牙',
          path: 'pages/index/index'
        }
      }
})