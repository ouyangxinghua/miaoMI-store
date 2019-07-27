Page({
  data: {
    hasCart: false,  //购物车是否为空
    cartgoods: [],    //购物的商品
    selectAll: true, //是否全选 
    totalPrice: '',  //计算总价
  },
  // 计算选择了的商品的总价
  getTotalPrice() {
    let cartgoods = this.data.cartgoods
    let total = 0
    for (let item of cartgoods) {
      if (item.select) {
        total += parseInt(item.price) * parseInt(item.num);
      }
    }
    this.setData({
      totalPrice: total
    })
  },
  // 全选小图标
  selectAll() {
    let selectAll = this.data.selectAll
    selectAll = !selectAll
    let cartgoods = this.data.cartgoods
    for (let item of cartgoods) {
      item.select = selectAll
    }
    this.setData({
      selectAll,
      cartgoods
    })
    this.getTotalPrice()
  },
  // 每件商品的小图标
  selectList(e) {
    // console.log(e)
    let index = e.target.dataset.index
    let cartgoods = this.data.cartgoods
    cartgoods[index].select = !cartgoods[index].select

    this.setData({
      cartgoods
    })
    this.getTotalPrice()
  },
  // 跳转到首页查看商品信息
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  // 去删除商品页面
  goDeleteGoods(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    console.log(index, id)
    wx.navigateTo({
      url: `/pages/modifyGood/modifyGood?index=${index}&id=${id}`,
    });

  },
  // 页面显示时，会从本地Storage中获取购买的商品信息
  onShow: function () {
    let cartgoods = wx.getStorageSync('goods') || [];
    if (cartgoods.length === 0) {
      this.setData({
        cartgoods,
        hasCart: false
      })
      return
    }
    this.setData({
      cartgoods,
      hasCart: true
    })
    this.getTotalPrice()
    // 这里是统计的所有购买的商品
    const allNum = this.getAllNum(cartgoods)
    wx.setStorageSync('allNum', allNum);
  },
  // 计算总的商品数量
  getAllNum(cartgoods) {
    return cartgoods.reduce((sum, item) => {
      return sum + (+item.num)
    }, 0)
  }
})