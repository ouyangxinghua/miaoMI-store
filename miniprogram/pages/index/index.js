// miniprogram/pages/index/index.js
const API = require('../../utils/request.js')
Page({

  data: {
    imgUrls: [
      'https://i1.mifile.cn/a4/xmad_15574198038169_xvodz.jpg',
      'https://i1.mifile.cn/a4/xmad_15579184778872_ECdvK.jpg',
      'https://i1.mifile.cn/a4/xmad_15548066625675_jhzWS.jpg'
    ],
    menu: [{
        icon: '../../images/手机 (1).png',
        text: '手机'
      }, {
        icon: '../../images/电视.png',
        text: '电视'
      }, {
        icon: '../../images/电脑.png',
        text: '电脑'
      }, {
        icon: '../../images/智能场控.png',
        text: '智能'
      }, {
        icon: '../../images/家电.png',
        text: '家电'
      }, {
        icon: '../../images/皇冠.png',
        text: '新品'
      },
      {
        icon: '../../images/钟.png',
        text: '小米众筹'
      }, {
        icon: '../../images/以旧换新 图标-03.png',
        text: '以旧换新'
      }, {
        icon: '../../images/1-.png',
        text: '1分拼团'
      }, {
        icon: '../../images/钻石.png',
        text: '每日臻选'
      },
    ],
    goodList: [],
    first: {},
  },

  onLoad: function(options) {
    this.getGoodList()
  },
  getGoodList() {
    API
      .getGoodList()
      .then(res => {
        // console.log(res)
        this.setData({
          first: res.data.one,
          goodList: res.data.section
        })
      })
  },
  goDetails(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    });
  }
})