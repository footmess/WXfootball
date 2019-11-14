Component({
	properties: {
		//组件的properties 相当于vue的prop
		innerText: {
			type: String,
			value: 'good'
		}
	},
	data: {
		//组件内部数据 => vue data
		name: 'Tom',
		age: 12,
		like: {
			food: '肌肉',
			fruit: '水果'
		}
	},
	methods: {
		//组件内部方法
		sum(a, b) {
			return a + b;
		}
	}
});
