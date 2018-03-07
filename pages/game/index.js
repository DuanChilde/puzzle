const app = getApp()

Page({
  data: {
    again:"再来一局",
    lastX: 0,
    lastY: 0,
    currentGesture:0,
    d:{},
    p:0,
    jigsaw:{},
    hiddenModal:true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.gd()
  },
  gd: function () {  
    var arr = [1, 2, 3, 4, 5, 6, 7, 8].sort(function () { return Math.random() > .5 });
    for (var i = 0, k = 0, n = arr.length; i < n; i++)
      for (var j = i + 1; j < n; j++)
        arr[i] > arr[j] && (k = 1 - k);
    k && (i = arr[n - 2]) && (arr[n - 2] = arr[n - 1]) && (arr[n - 1] = i);
    if (arr.concat(0) + '' == '1,2,3,4,5,6,7,8,0')
    {
      this.gd();
    }
    this.setData({
      d: arr.concat(0),
      hiddenModal:true,
      p: 8
    });
  },
  handletouchmove: function (event){
    if (this.data.currentGesture != 0) {
      return
    }
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    let text = ""
    let q=0;
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        text = "向左滑动"
        this.data.currentGesture = 1
      }
      else if (tx > 0) {
        text = "向右滑动"
        this.data.currentGesture = 3
      }
    }
    //上下方向滑动
    else {
      if (ty < 0) {
        text = "向上滑动"
        this.data.currentGesture = 2

      }
      else if (ty > 0) {
        text = "向下滑动"
        this.data.currentGesture = 4
      }

    }
    this.data.lastX = currentX
    this.data.lastY = currentY
    if (this.data.currentGesture == 1 && (this.data.p % 3 < 2) || this.data.currentGesture == 3 && (this.data.p % 3 > 0) ||   this.data.currentGesture == 2 && (this.data.p < 6) || this.data.currentGesture == 4 && (this.data.p > 2))
    {
      q = this.data.p + (this.data.currentGesture > 2 ? 1 : -1) * (this.data.currentGesture % 2 * 2 - 3);
      this.data.d[this.data.p] = this.data.d[q], this.data.d[this.data.p = q] = 0;
      //this.data.d = [1, 2, 3, 4, 5, 6, 7, 8];
      //console.log(this.data.d+'');
      if (this.data.d + '' == '1,2,3,4,5,6,7,8,0')
      {
        this.setData({
          d: this.data.d,
          hiddenModal:false
        });
      }else{
        this.setData({
          d: this.data.d,
        });
      }
    }
  },
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchend: function (event) {
    this.data.currentGesture = 0
  },
  replay:function(){
    this.gd();
    
  },
})
