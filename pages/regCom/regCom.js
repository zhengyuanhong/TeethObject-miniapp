const request = require('../../utils/request.js')
const app = getApp()
// pages/regCom/regCom.js
Page({
    data: {
        indexImg: '',
        logoImg: '',
        address: '',
        phone: '',
        latitude: 0,
        longitude: 0
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
    ChooseImage(e) {
        var type = e.currentTarget.dataset.type
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                var data = {}
                var that = this
                if (type == 'indexImg') {
                    request.uploadImg(app, res.tempFilePaths[0], (upload_res) => {
                        console.log('upload-img', upload_res.data)
                        data.indexImg = upload_res.data
                        that.setData(data)
                    })
                }
                if (type == 'logoImg') {
                    request.uploadImg(app, res.tempFilePaths[0], (upload_res) => {
                        console.log('upload-img', upload_res.data)
                        data.logoImg = upload_res.data
                        that.setData(data)
                    })
                }
            }
        });
    },
    DelImg(e) {
        var type = e.currentTarget.dataset.type
        wx.showModal({
            title: '提示',
            content: '确认删除吗？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    var data = {}
                    if (type == 'indexImg') {
                        data.indexImg = ''
                        request.delImg(app, {
                            filename: that.data.indexImg.split('storage/')[1]
                        }, (res) => {
                            that.setData(data)
                            request.showErrToast('删除成功')
                        })
                    }
                    if (type == 'logoImg') {
                        data.logoImg = ''
                        request.delImg(app, {
                            filename: that.data.logoImg.split('storage/')[1]
                        }, (res) => {
                            that.setData(data)
                            request.showErrToast('删除成功')
                        })
                    }
                    this.setData(data)
                }
            }
        })
    },
    chooseAddr() {
        var that = this
        wx.chooseLocation().then((res) => {
            console.log('choose', res)
            that.setData({
                address: res.address + res.name,
                latitude: res.latitude,
                longitude: res.longitude
            })
        }).catch(() => {
            request.showErrToast('获取失败')
        })
    },
    ViewImage(e) {
        var type = e.currentTarget.dataset.type,
            data = {}
        if (type == 'logoImg') {
            data.urls = [this.data.logoImg],
                data.current = this.data.logoImg
        }
        if (type == 'indexImg') {
            data.urls = [this.data.indexImg],
                data.current = this.data.indexImg
        }
        wx.previewImage(data);
    },
    submit(e) {
        console.log('submit', e)
        var formData = e.detail.value
        var phoneRes = this.checkPhone(formData.phone)
        if (!phoneRes) {
            request.showErrToast('请填写正确的手机号')
            return
        }
        formData.index_head_image = this.data.indexImg
        formData.logo = this.data.logoImg
        formData.card_name = formData.company_name + '看牙卡'
        console.log('submit', formData)
        this.postData(formData)
    },
    postData(data) {
        request.settleCompany(app, data, (res) => {
            request.showErrToast('提交成功，等待审核...')
            setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
            }, 2000)
        })
    },
    checkPhone(str) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    onLoad: function (options) {
        app.userLogin().then((res)=>{
            request.ownCompanyQrCode(app, null, (res1) => {
                console.log('res1', res1)
                if(res1.status == 1){
                    request.showErrToast('您的提交正在审核中...')
                    setTimeout(()=>{
                        wx.reLaunch({
                            url: '/pages/index/index',
                          })
                    },2000)
                }
                // that.setData({
                //     qr_code: res1.qr_code,
                //     status: res1.status,
                //     company: res1.company,
                //     loading:false
                // })
            })
        })

    }
})