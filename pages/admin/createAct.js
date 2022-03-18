const request = require('../../utils/request.js')
const app = getApp()
// pages/regCom/regCom.js
Page({
    data: {
        indexImg: 'https://teeth.manzhi.top/storage/users/pZ5MVO9tZUrgutksDiaoaamB1aNe3wIs69obsNSd.jpg',
        address: '',
        phone: '',
        name: '',
        content: {
            menu: {
                pai_pian: {
                    text: '报名拍片',
                    is_show: false
                },
                clean_teeth: {
                    text: '预约洗牙',
                    is_show: false
                },
                price_jisuan: {
                    text: '咨询价格',
                    is_show: false
                },
            },
            note: ''
        },

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
                request.uploadImg(app, res.tempFilePaths[0], (upload_res) => {
                    console.log('upload-img', upload_res.data)
                    data.indexImg = upload_res.data
                    that.setData(data)
                })

            }
        });
    },
    DelImg(e) {
        var type = e.currentTarget.dataset.type,
            that = this
        wx.showModal({
            title: '提示',
            content: '确认删除吗？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    var data = {}
                    data.indexImg = ''

                    request.delImg(app, {
                        filename: that.data.indexImg.split('storage/')[1]
                    }, (res) => {
                        that.setData(data)
                        request.showErrToast('删除成功')
                    })
                }
            }
        })
    },
    chooseAddr() {
        var that = this
        wx.chooseLocation().then((res) => {
            console.log('choose', res)
            that.setData({
                address: res.name,
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

        data.urls = [this.data.indexImg],
            data.current = this.data.indexImg

        wx.previewImage(data);
    },
    submit(e) {
        console.log('submit', e)
        var formData = e.detail.value
        var phoneRes = this.checkPhone(formData.phone)
        var content = this.data.content
        if (!phoneRes) {
            request.showErrToast('请填写正确的手机号')
            return
        }
        content.note = formData.note
        formData.images = this.data.indexImg
        formData.content = content
        formData.company_id = wx.getStorageSync('company_id')
        console.log('submit', formData)
        if (this.formType == 'edit') {
            formData.activity_id = this.id
            this.updateData(formData)
        } else {
            this.postData(formData)
        }
    },
    updateData(data) {
        console.log('update', data)
        request.updateAct(app, data, (res) => {
            request.showErrToast('修改成功')
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1,
                })
            }, 2000)
        })
    },
    postData(data) {
        console.log('postdata', data)
        request.createAct(app, data, (res) => {
            request.showErrToast('创建成功')
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1,
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
    onLoad: function (e) {
        var that = this
        console.log('dddd', e)
        app.userLogin().then((res) => {
            that.getOneAct(e)
        })
    },
    getOneAct(e) {
        var that = this
        if (e.type != undefined && e.id != undefined) {
            if (e.type = 'edit') {
                that.formType = e.type
                that.id = e.id
                request.getOneActivity(app, {
                    activity_id: e.id,
                    company_id: wx.getStorageSync('company_id')
                }, (res) => {
                    console.log('getOneAct', res)
                    that.setData({
                        indexImg: res.images,
                        address: res.address,
                        phone: res.phone,
                        name: res.name,
                        content: res.content,
                        latitude: res.lat,
                        longitude: res.lon
                    })
                })
            }
        }
    },
    switchChange(e) {
        console.log('switchChage', e)
        var type = e.currentTarget.dataset.type,
            value = e.detail.value,
            content = this.data.content
        content.menu[type]['is_show'] = value
        this.setData({
            content: content
        })
    }
})