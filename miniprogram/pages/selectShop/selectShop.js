const API = require('../../utils/request.js');
let versionData = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodData: {},
    id: '',
    vIndex: "",
    cIndex: "",
    imgSrc: "",
    memory: "",
    color: "",
    price: "",
    priceOld: "",
    selectNum: "1",
    soHave: false,
    stHave: false
  },
  onLoad: function (options) {
    API.showLoading()
    this.setData({
      id: options.id
    })
    this.getSelectGoods()
  },
  // 获取页面 所需数据
  getSelectGoods() {
    const self = this
    API
      .getGoodDetail()
      .then(res => {
        const goodData = res.data.filter(item => item.id === self.data.id)[0]
        console.log(goodData)
        versionData = goodData.versionData
        const defaultData = goodData.defaultData
        this.setData({
          goodData,
          imgSrc: defaultData.img,
          memory: defaultData.memory,
          color: defaultData.color,
          price: defaultData.price[0],
          priceOld: defaultData.price[1],
          vIndex: defaultData.vIndex,
          cIndex: defaultData.cIndex
        })
        wx.hideLoading()
      })
  },
  // 选择版本
  chooseV(e) {
    // console.log(e)
    const vIndex = e.target.dataset.index
    const memory = e.target.dataset.memory
    const price = e.target.dataset.price[0]
    const priceOld = e.target.dataset.price[1]
    this.setData({
      vIndex,
      memory,
      price,
      priceOld
    })
  },
  // 选择颜色
  chooseC(e) {
    // console.log(e)
    const cIndex = e.target.dataset.index
    const color = e.target.dataset.color
    const imgSrc = e.target.dataset.src
    this.setData({
      cIndex,
      color,
      imgSrc
    })
  },
  // 服务是否勾选
  sOne() {
    const soHave = !this.data.soHave
    this.setData({
      soHave
    })
  },
  // 服务是否勾选
  sTwo() {
    const stHave = !this.data.stHave
    this.setData({
      stHave
    })
  },
  // 数量减
  sNum() {
    let selectNum = this.data.selectNum
    if (selectNum <= 1) {
      return
    }
    selectNum--
    this.setData({
      selectNum
    })
  },
  // 数量加
  aNum() {
    let selectNum = this.data.selectNum
    if (selectNum > 98) {
      return
    }
    selectNum++
    this.setData({
      selectNum
    })
  },
  // 添加到购物车
  toAddCart() {
    let cartData = wx.getStorageSync('goods') || [];
    let data = {
      id: this.data.id,
      name: this.data.goodData.name,
      memory: this.data.memory,
      color: this.data.color,
      price: this.data.price,
      num: this.data.selectNum,
      img: this.data.imgSrc,
      select: true
    }
    cartData.push(data)
    const allNum = this.getAllNum(cartData)
    console.log(allNum)
    wx.setStorage({
      key: 'goods',
      data: cartData,
      success: (res) => {
        console.log(res)
        let pageIndex = getCurrentPages()
        let backIndex = pageIndex.length - 2
        wx.navigateBack({
          delta: backIndex
        })
      },
      fail: () => { },
      complete: () => { }
    });
    wx.setStorageSync('allNum', allNum);
    setTimeout(() => {
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 2000
      });
    }, 500)
  },
  // 获取所有的数量
  getAllNum(cartData) {
    return cartData.reduce((sum, item) => {
      return sum + (+item.num)
    }, 0)
  }
})