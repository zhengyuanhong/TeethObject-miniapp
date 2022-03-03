const request = require('../../utils/request.js')
const app = getApp()
Page({
    data: {
        detail: {}
    },
    onLoad: function (e) {
        var that = this
        request.getTeethDetail(app, {
            type: e.type
        }, (res) => {
            console.log('getTeethDetail', res)
            that.setData({
                detail: res
            })
        })
        this.getCardInfo()
    },
    useCard() {
        var that = this
        if (!this.card_info.is_receive) {
            request.showModal('您未领取看牙卡，是否现在去领取？', () => {
                wx.navigateTo({
                    url: '/pages/user/vip',
                })
            }, () => {})
            return
        }
        that.queryPrice()
    },
    getCardInfo() {
        var that = this
        app.getCardInfo(app, wx.getStorageSync('company_id')).then((res) => {
            console.log('cardInfo', res)
            that.card_info = res
            wx.setStorageSync('cardInfo', res)
        })
    },
    queryPrice() {
        var that = this
        var data = {
            obj_name: that.data.detail.name,
            company_id: wx.getStorageSync('company_id')
        }
        if (wx.getStorageSync('salesman_id')) {
            data.sale_user_id = wx.getStorageSync('salesman_id')
        }

        request.showModal('是否咨询价格？', () => {
            request.queryPrice(app, data, (res) => {
                request.showErrToast('价格正在计算中，稍后通知您...')
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 2000)
            })
        }, () => {})
    },
    onShow() {
        this.getCardInfo()
    },
    test() {
        request.showModal('是否咨询价格？', () => {

        }, () => {})
    }
})