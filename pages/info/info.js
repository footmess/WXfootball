//获取app实例
var app = getApp();
console.log(app);
Page({
	data: {
		logs: [],
		userInfo: {},
		weather: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	onLoad: function() {
		console.log('start');
		console.log(wx.getLaunchOptionsSync());
		//到当前页面的路径
		console.log(this.route);
		var _this = this;
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			});
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = (res) => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				});
			};
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: (res) => {
					app.globalData.userInfo = res.userInfo;
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					});
				}
			});
		}
		//wx发送请求wx.request
		wx.request({
			url: 'https://web-api.benq.com.cn/api/service/info?per_page=10&page=1&line=prj&keyword=',
			success: (res) => {
				console.log(this);
				console.log(_this);
				//setData()是页面page的原型上的方法，相当于vue的$.set()设置响应式数据,把数据从逻辑层应用到渲染层
				//setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
				this.setData({
					weather: res.data.data[0]
				});
				console.log(this.data.weather);
			}
		});
	},
	//监听用户点击转发按钮(button组件open-type="share")或者右上角菜单"转发"按钮的行为，并自定义转发内容
	onShareAppMessage: function(res) {
		if (res.from === 'button') {
			console.log(res.target);
		}
		if (res.from === 'menu') {
			console.log(res.target);
		}
		return {
			title: '自定义标题',
			path: '/pages/info'
		};
	},
	bindA: function() {
		// this.getWeather();
		//wx获取用户地理位置
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				const latitude = res.latitude;
				const longitude = res.longitude;
				wx.openLocation({
					latitude,
					longitude,
					scale: 18
				});
			}
		});
	},
	aw: function(e) {
		console.log(e);
		app.globalData.userInfo = e.detail.userInfo;
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		});
	}
});
