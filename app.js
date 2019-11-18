//app.js
// 注册小程序
App({
	//小程序初始化完成时触发，全局只触发一次
	onLaunch: function() {
		console.log(wx.getSystemInfoSync());
		console.log(wx);
		// console.log(wx.getLaunchOptionsSync());
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);

		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					console.log('已授权');
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					// 登录;
					wx.login({
						success: (res) => {
							console.log('login', { res });
							// 发送 res.code 到后台换取 openId, sessionKey, unionId
							wx.getUserInfo({
								success: (res) => {
									// 可以将 res 发送给后台解码出 unionId
									this.globalData.userInfo = res.userInfo;
									// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
									// 所以此处加入 callback 以防止这种情况
									if (this.userInfoReadyCallback) {
										this.userInfoReadyCallback(res);
									}
								}
							});
						}
					});
				} else {
					console.log('未授权');
					this.showSettingToast('请授权');
				}
			}
		});
		//初始化多线程  发送消息
		const worker = wx.createWorker('workers/request/index.js');
		worker.postMessage({
			msg: 'hello worker'
		});
		//测试API是否可用
		console.log(wx.canIUse('button.open-type.contact'));
	},
	globalData: {
		userInfo: null
	},
	//打开权限设置页提示框
	showSettingToast(e) {
		wx.showModal({
			//提示的标题
			title: '提示',
			//确认按钮的文字
			confirText: '去设置',
			//是否显示取消按钮
			showCancel: false,
			content: e,
			success: (res) => {
				if (res.confirm) {
					console.log('点了确定');
					wx.navigateTo({
						url: 'pages/setting/setting'
					});
				} else if (res.cancel) {
					console.log('点了取消');
				}
			}
		});
	}
});
