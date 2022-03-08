const request = require('../../utils/request.js')
const app = getApp()
Page({
    data: {
        qr_code: '',
        company: false,
        status: false,
        savePhotoFail: false,
        company_id:false,
        loading:true
    },
    viewImg() {
        var that = this
        wx.previewImage({
            urls: [that.data.qr_code],
            current: that.data.qr_code
        });
    },
    onLoad: function (options) {

    },
    userView(){
        var company_id = wx.getStorageSync('company_id') || false
        if (company_id) {
            this.setData({
                company_id: company_id
            })
        }
    },
    onShow() {
        var that = this

        that.userView()

        app.userLogin().then((res) => {
            request.ownCompanyQrCode(app, null, (res1) => {
                console.log('res1', res1)
                that.setData({
                    qr_code: res1.qr_code,
                    status: res1.status,
                    company: res1.company,
                    loading:false
                })
            })
        })
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
                            that.setData({
                                savePhotoFail: true
                            })
                        }
                    })
                }
            }
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
    toUse() {
        wx.navigateTo({
            url: '/pages/regCom/regCom',
        })
    },
    toCompany() {
        var that = this
        wx.navigateTo({
            url: '/pages/company/company?scene=' + encodeURIComponent('company_id=' + that.data.company_id)
        })
    }
})