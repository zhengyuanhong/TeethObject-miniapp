const request = require('../../utils/request.js')
const app = getApp()
Page({
    data: {
        salesman: [],
        max_salesman_num: 20,
        current_salesman_num: 0,
        is_admin: false,
        is_salesman: false,
        userInfo: {},
        invite_code: '', // = res.invite_code
        admin_user_id: '' // = res.admin_user_id
    },
    onLoad: function (options) {
        this.setData(wx.getStorageSync('role'))
        this.getSale()
        var that = this
        that.inviteUser().then((res) => {
            that.setData({
                invite_code: res.invite_code,
                admin_user_id: res.admin_user_id
            })

        })
    },
    getSale() {
        var that = this
        request.getSale(app, wx.getStorageSync('company_id'), null, (res) => {
            console.log('getSale', res)
            that.setData({
                salesman: res,
                current_salesman_num: res.length,
                max_salesman_num: that.data.max_salesman_num - res.length
            })
        })
    },
    delSale(e) {
        console.log('delSale', e)
        var that = this,
            index = e.currentTarget.dataset.index,
            salesman = that.data.salesman
        console.log(index)
        request.showModal('是否移除该成员', () => {
            request.delSale(app, wx.getStorageSync('company_id'), {
                user_id: salesman[index].user_id
            }, (res) => {
                console.log(res)
                salesman.splice(index, 1)
                that.setData({
                    salesman: salesman
                })
                request.showErrToast('移除成功')
            })
        }, () => {})
    },
    onReady: function () {
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    },
    inviteUser() {
        return new Promise((resolve) => {
            var that = this,
                content = {}
            request.inviteCode(app, wx.getStorageSync('company_id'), null, (res) => {
                console.log(res)
                that.setData({
                    invite_code: res.invite_code,
                    admin_user_id: res.admin_user_id
                })
                resolve(res)
            })
        })
    },
    onShareAppMessage: function (res) {
        var that = this
        if (res.from === 'button') {
            return {
                title: "邀请你加入我的团队",
                imageUrl: '/images/share.jpg',
                path: 'pages/team/join?invite_code=' + this.data.invite_code + '&admin_user_id=' + this.data.admin_user_id
            }
        }
        return {
            title: "邀请你加入我的团队",
            imageUrl: '/images/share.jpg',
            path: 'pages/team/join?invite_code=' + this.data.invite_code + '&admin_user_id=' + this.data.admin_user_id
        }
    }
})