/**
 * 颜色配置， 不写及为highcharts默认颜色配置方案
 */ 
  	// Highcharts.setOptions({
    //      colors:['rgb(88,105,120)','rgb(144,148,168)','rgb(161,170,186)',
    //      'rgb(199,202,218)','rgb(212,212,212)','rgb(235,235,235)', 
 	// 	]
 	// });

// 饼图属性
export var pieChartAttribute = {
	// 表格基本设置
	chart: {
		type: 'pie',
	},
	// 标题设置
	title: {
		text: null,
		style: {
			fontWeight: 'bold',
			fontSize: 36,   //这边是改标题的字体大小和颜色
		},
	},
	subtitle: {
		text: null,
		style: {
			fontSize: 28,
		}
	},
	// 提示工具设置
	tooltip: {
		headerFormat: '{series.name}<br>',
		pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
		style: {
			fontSize: 28,
			padding: 10,
			fontWeight: 'normal',
		}
	},
	plotOptions: {
		pie: {
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>',
				// : {point.percentage:.1f} %
				style: {
					fontSize: 28,//更改饼状图里面显示的字体
					fontWeight: 'normal',
				},
			},
			showInLegend: true,	//展示图例
			allowPointSelect: true,
			slicedOffset: 20,      // 突出间距
		}
	},
	legend: {
		itemStyle: {
			color: '#444444',
			fontWeight: 'normal',
			fontSize: '24px',
		}
	},
	//关闭导出信息
	exporting: {
		enabled: false
	},
	// 关闭版权信息
	credits: {
		enabled: false,
	},
	// dataset
	series: [{
		type: 'pie',
		name: '浏览器访问量占比',
		dataLabels: {
			style: {
				fontSize: 24,
				color: '#666666',
			},
		}
	}]
}

/**
 * @param {Object} pieChart: 需要修改的饼图对象
 * @param {String} title: 重制表格标题 
 * @param {String} subtitle: 表格副标题
 * @param {long}   animation: 动画效果 animation为0则无动画效果 
 * @param {int}    innerSize: 圆环大小 
 * @param {boolean}legend: 是否展示图例 
 */
export function pieChartSetting(pieChart, title, subtitle, animation, innerSize, legend, data) {

	if (data === undefined || data === null || data.length === 0){
		alert("未取得到数据");
		return;
	}
	pieChart.update({
		series: [{
			data: data,
		}],
	})

	//若title不为空， 重写title
	if (title !== "" && title !== undefined && title !== null) {
		var newTitle = {
			text: title,
		};
		pieChart.setTitle(newTitle);
	}

	//若subtitle不为空， 重写subtitle
	if (subtitle !== "" && subtitle !== undefined && subtitle !== null) {
		var newTitle = {
			text: subtitle,
		};
		pieChart.setTitle(null, newTitle);
	}

	// 动画持续效果
	if (animation >= 0) {
		pieChart.update({
			series: [{
				animation: {
					duration: animation,
				}
			}]
		});
	}

	// 圆环大小
	if (innerSize >= 0 && innerSize <= 100) {
		pieChart.update({
			series: [{
				innerSize: innerSize + '%',
			}],
		})
	}
	// 是否显示图例
	if (legend === true || legend === false) {
		pieChart.update({
			plotOptions: {
				pie: {
					showInLegend: legend,
				}
			}
		});
	}
}