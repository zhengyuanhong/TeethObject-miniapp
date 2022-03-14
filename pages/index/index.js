const request = require('../../utils/request.js')

const app = getApp()
Page({

    data: {
        activity: [],
        page: 1,
        lon: 0,
        lat: 0,
        openSetting: false
    },
    onLoad: function (options) {

    },
    callback(res) {
        console.log(res)
        if (res.detail.authSetting['scope.userLocation']) {
            this.setData({
                openSetting: false
            })
            this.getLocal()
        }
    },
    onReachBottom() {
        this.getActivity(this.data.lat, this.data.lon)
    },
    getActivity(lat, lon) {
        var that = this
        var data = {
            page: this.data.page,
            lat: lat,
            lon: lon
        }
        request.getActivity(app, data, (res) => {
            console.log('getActivity', res)
            if (res.length > 0) {
                // that.getDistance(res)
                console.log(res)
                that.setData({
                    activity: that.sortDis(that.data.activity.concat(res)),
                    page: that.data.page + 1
                })
            }
        })
    },
    toIndex(e) {
        console.log(e)
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index
        var activity_id = this.data.activity[index].id
        wx.navigateTo({
            url: '/pages/company/company?scene=' + encodeURIComponent('company_id=' + id + '&activity_id=' + activity_id)
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
                that.getActivity(res.latitude, res.longitude)
                that.setData({
                    lat: res.latitude,
                    lon: res.longitude
                })
            },
            fail() {
                console.log('获取位置失败')
                that.setData({
                    openSetting: true
                })
            }
        })
    },
    sortDis(arr) {
        return arr.sort((a, b) => {
            return a.distance - b.distance
        })
    },
    onShow(){
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
    },
    objToArr(obj) {
        var arr = []
        for (var i in obj) {
            arr.push(obj[i])
        }
        return arr
    }
})