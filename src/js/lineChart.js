// 在 Highcharts 加载之后加载功能模块
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

/**
 * 颜色配置， 不写及为highcharts默认颜色配置方案
 */ 
  	// Highcharts.setOptions({
    //      colors:['rgb(88,105,120)','rgb(144,148,168)','rgb(161,170,186)',
    //      'rgb(199,202,218)','rgb(212,212,212)','rgb(235,235,235)', 
 	// 	]
 	// });

var lineChartAttribute = {
    chart: {
        type: 'line',
    },
    title: {
        text: null,
        style: {
            fontSize: 28,
            fontWeight: "bold",
        }
    },
    subtitle: {
        text: null,
        style: {
            fontSize: 28,
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
    xAxis: {
		gridLineColor: '#bbbbbb',
        type: 'category',
        labels: {
            style: {
                fontSize: 24,
            }
        }
    },
    yAxis: {
		gridLineColor: '#bbbbbb',
        min: 0,
        labels: {
            style: {
                fontSize: 24,
            }
        },
        title: {
            style: {
                fontSize: 28,
            }
        }
    },
	legend: {
        enabled: true,
        symbolWidth: 50,
        itemStyle: {
            color: '#000000',
            fontWeight: 'normal',
            fontSize: '24px',
        }
    },
    tooltip: {
        headerFormat: '<span style = "margin:0, padding:0"></span><br>',
        crosshairs: true,
		shared: true,
       //  pointFormat: '<b>{point.name} {point.y:.1f}</b>',
        style: {
            fontSize: 24,
            fontWeight: 'normal',
        }
    },
	plotOptions: {
        line: {
			dataLabels: {
				// 开启数据标签
                enabled: false, 
                style: {
                    fontSize: 24,
                    fontWeight: "light",
                    color: '#666666',
                    textOutline: "0 0 black",
                },         
			},
			// 关闭鼠标跟踪，对应的提示框、点击事件会失效
			enableMouseTracking: true
		},
		series: {
			marker: { 
                radius: 7, //曲线点半径，默认是4 
                }, 
		}
	},
	series: null
}

/**
 * @param {Object} barChart: 需要修改的柱图对象
 * @param {String} showDataLabel: 是否显示数据
 * @param {String} title: 重置表格标题
 * @param {String} subtitle: 重制表格副标题
 * @param {String} unit: 图表在坐标轴上的单位
 * @param {Array}  category: 图表类别分类（x轴）
 * @param {long}   animation: 动画效果持续时间，为0则无动画效果 
 * @param {Array}  dataset: 折线图数据
 */
function lineChartSetting(lineChart, showDataLabel, title, subtitle,  unit, category, animation, dataSet) {

    // 若未取得数据 直接返回
    if (dataSet === undefined || dataSet === null) {
        alert("未取得到数据");
        return;
    }
    for (var i = 0; i < dataSet.length; i++) {    
        lineChart.addSeries(dataSet[i]);
    }

    // 是否在图表上展示数据
    if(showDataLabel === true || showDataLabel === false){
        lineChart.update({
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: showDataLabel,       
                    }
                }
            }
        })
    }

    //若title不为空， 重写title
    if (title !== "" && title !== undefined && title !== null) {
        var newTitle = {
            text: title,
        };
        lineChart.setTitle(newTitle);
    }

    //若subtitle不为空， 重写subtitle
    if (subtitle !== "" && subtitle !== undefined && subtitle !== null) {
        var newTitle = {
            text: subtitle,
        };
        lineChart.setTitle(null, newTitle);
    }

    // 动画持续效果
    if (animation >= 0) {
        lineChart.update({
            series: [{
                animation: {
                    duration: animation,
                }
            }]
        });
    }
    // 图表在坐标轴上的单位
    if(unit !== null && unit !== undefined){
         lineChart.update({
            yAxis: {
                title: {
                    text: unit,
                }
            }
        })
    }
   
    // x轴
    if (category !== null && category !== undefined) {
        lineChart.update({
            xAxis: {
                categories: category,
            }
        })
    }
}

// ---------------------- 初始化多组数据折线图图 ----------------------
dataSet = [{
    name: '安装，实施人员',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
    name: '工人',
    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
}, {
    name: '销售',
    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
}, {
    name: '项目开发',
    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
}, {
    name: '其他',
    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
}]
title = '2010 ~ 2016 年太阳能行业就业人员发展情况';
subtitle = '数据来源：thesolarfoundation.com';
category = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];

var lineChart = Highcharts.chart('lineChart', Object.assign({},lineChartAttribute));

/**
 * @param {Object} 参数1: 需要修改的柱图对象
 * @param {String} 参数2: 是否在图标上显示数据
 * @param {String} 参数3: 表格标题 
 * @param {String} 参数4: 表格副标题 与表格标题都可置空
 * @param {String} 参数5: 图表在坐标轴Y轴上的单位
 * @param {Array}  参数6: 多组数据时的图表类别分类（x轴）
 * @param {long}   参数7: 动画效果持续时间，为0则无动画效果 
 * @param {Array}  参数8: 折线图数据
 */
lineChartSetting(lineChart, false, title, subtitle, '就业人数', category, 2000, dataSet);


dataSet = [{
    name: '东京',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
}, {
    name: '伦敦',
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
}];
title = '两地月平均温度';
subtitle = '数据来源: WorldClimate.com';
category = ['一月', '二月', '三月', '四月', '五月', '六月',
'七月', '八月', '九月', '十月', '十一月', '十二月'];
var lineChart2 = Highcharts.chart('lineChart2', Object.assign({},lineChartAttribute));
lineChartSetting(lineChart2, true, title, subtitle, '温度', category, 2000, dataSet);


