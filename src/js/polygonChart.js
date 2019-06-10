// 在 Highcharts 加载之后加载功能模块
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);
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
        polar: true,
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
        type: 'category',
        labels: {
            style: {
                fontSize: 24,
            }
        },
        tickmarkPlacement: 'on',
		lineWidth: 0
    },
    yAxis: {
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
        },
        gridLineInterpolation: 'polygon',
		lineWidth: 0,
		min: 0
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
function polygonChartSetting(lineChart, showDataLabel, title, subtitle,  unit, category, animation, dataSet) {

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


dataSet = [{
    name: '预算拨款',
    data: [43000, 19000, 60000, 35000, 17000, 10000],
    pointPlacement: 'on'
}, {
    name: '实际支出',
    data: [50000, 39000, 42000, 31000, 26000, 14000],
    pointPlacement: 'on'
}];
title = '预算与支出';
subtitle = '数据来源: WorldClimate.com';
category = ['销售', '市场营销', '发展', '客户支持',
'信息技术', '行政管理'];
 var polygonChart = Highcharts.chart('polygonChart', Object.assign({},lineChartAttribute));
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
 polygonChartSetting(polygonChart, true, title, subtitle, null, category, 2000, dataSet);