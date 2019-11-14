//获取app实例
var app = getApp();
Page({
	data: {
		logs: [],
		userInfo: {},
		weather: {}
	},
	onLoad: function() {
		console.log('start');
	},
	bindA: function() {
		this.getWeather();
		//wx获取用户地理位置
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				const latitude = res.latitude;
				const longitude = res.longitude;
				//wx发送请求wx.request
				wx.request({
					url: 'https:www.benq.com.cn',
					success(res) {
						//wx.setData()，相当于vue的$.set()设置响应式数据
						this.setData({
							weather: res.data
						});
					}
				});
			}
		});
	}
});
