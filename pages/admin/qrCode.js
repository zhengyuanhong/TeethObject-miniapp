const request = require('../../utils/request.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qr_code: '',
        savePhotoFail: false
    },
    onLoad: function (options) {
        var that = this
        request.getQrCode(app, wx.getStorageSync('company_id'), null, (res) => {
            console.log('getQrCode', res)
            that.setData({
                qr_code: res.qr_code
            })
        })
    },
    callback(res) {
        console.log(res)
        if (res.detail.authSetting['scope.writePhotosAlbum']) {
            this.setData({
                savePhotoFail: false
            })
        }
    },
    saveQrcode: function () {
        var that = this
        wx.downloadFile({
            url: that.data.qr_code,
            success(res) {
                if (res.statusCode === 200) {
                    console.log('下载', res.tempFilePath)
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (res) {
                            request.showErrToast('保存成功')
                        },
                        fail: function (res) {
                            console.log(res)
                            console.log('fail')
                        }
                    })
                }
            }
        })
    },
    onShow: function () {

    },
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