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

var barChartAttribute = {
    chart: {
        type: 'column',
        marginRight: 30,
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
    //关闭导出信息
    exporting: {
        enabled: false
    },
    // 关闭版权信息
    credits: {
        enabled: false,
    },
    legend: {
        enabled: true,
        itemStyle: {
            color: '#000000',
            fontWeight: 'normal',
            fontSize: '24px',
        }
    },
    tooltip: {
        headerFormat: '<span style = "margin:0, padding:0"></span><br>',
        pointFormat: '<b>{point.name}:{point.y:.1f}</b>',
        style: {
            fontSize: 24,
            fontWeight: 'normal',
        }
    },
    plotOptions: {
        series: {           // 针对所有数据列有效的配置
            dataLabels: {
                style: {
                    fontSize: 24,
                    fontWeight: "light",
                    color: '#666666',
                    textOutline: "0 0 black",
                },
                enabled: true,
                format: '{point.y:.1f}', // :.1f 为保留 1 位小数
            }
        }
    },
    series:null,
}

/**
 * @param {Object} barChart: 需要修改的柱图对象
 * @param {String} flag: 横向柱状图 bar 纵向柱状图 column
 * @param {String} title: 重置表格标题
 * @param {String} subtitle: 重制表格副标题
 * @param {String} unit: 图表在坐标轴上的单位
 * @param {Array}  category: 多组数据时的图表类别分类， 单组数据置空
 * @param {long}   animation: 动画效果持续时间，为0则无动画效果 
 * @param {Array}  dataset: 饼图数据
 */
function barChartSetting(barChart, flag, title, subtitle, unit, category, animation, dataSet) {

    // 若未取得数据 直接返回
    if (dataSet === undefined || dataSet === null) {
        alert("未取得到数据");
        return;
    }
    for (var i = 0; i < dataSet.length; i++) {    
        barChart.addSeries(dataSet[i]);
    }

    // 横向/纵向柱状图 默认为纵向
    if (flag === "bar" || flag === "column") {
        barChart.update({
            chart: {
                type: flag,
            },
        })
    }

    //若title不为空， 重写title
    if (title !== "" && title !== undefined && title !== null) {
        var newTitle = {
            text: title,
        };
        barChart.setTitle(newTitle);
    }

    //若subtitle不为空， 重写subtitle
    if (subtitle !== "" && subtitle !== undefined && subtitle !== null) {
        var newTitle = {
            text: subtitle,
        };
        barChart.setTitle(null, newTitle);
    }

    // 动画持续效果
    if (animation >= 0) {
        barChart.update({
            series: [{
                animation: {
                    duration: animation,
                }
            }]
        });
    }
    // 图表在坐标轴上的单位
    if(unit !== null && unit !== undefined){
         barChart.update({
            yAxis: {
                title: {
                    text: unit,
                }
            }
        })
    }
   
    // 组别分类 多组数据时有效
    if (category !== null && category !== undefined) {
        barChart.update({
            xAxis: {
                categories: category,
            }
        })
    }
}

// ---------------------- 初始化纵向柱状图 ----------------------
var title = "全球各大城市人口排行";
var subtitle = "数据截止 2017-03，来源:Wikipedia"
var dataSet = [{
    name: "总人口",
    data: [['上海', 24.25],['卡拉奇', 23.50],['北京', 21.51],
    ['德里', 16.78],['拉各斯', 16.06],['天津', 15.20],['伊斯坦布尔', 14.16],
    ['东京', 13.51],['广州', 13.08],['孟买', 12.44],['莫斯科', 12.19],
    ['圣保罗', 12.03],['深圳', 10.46],['雅加达', 10.07]],
}];

var barChart = Highcharts.chart('barChart', Object.assign({}, barChartAttribute));

/**
 * @param {Object} 参数0: 需要修改的柱图对象
 * @param {String} 参数1: 横向柱状图 bar 纵向柱状图 column
 * @param {String} 参数2: 图表名字 
 * @param {String} 参数3: 图表副标题，若不需要标题 参数2置空
 * @param {String} 参数4: 图表单位
 * @param {Array}  参数5: 多组数据时的图表类别分类，单组数据置空
 * @param {long}   参数6: 动画效果持续时间，为0则无动画效果 
 * @param {Array}  参数7: 饼图数据
 */
barChartSetting(barChart, "column", title, subtitle, "人口(百万）", null, 1000, dataSet);


// ---------------------- 初始化横向柱状图 ----------------------
var rowBarChart = Highcharts.chart('rowBarChart', Object.assign({}, barChartAttribute));
barChartSetting(rowBarChart, "bar", title, subtitle, "人口(百万)", null, 1000, dataSet);



// ---------------------- 初始化横向多条例柱状图 ----------------------
var multiBarChart = Highcharts.chart('multiBarChart', Object.assign({}, barChartAttribute));
title = "各大洲人口变化";
var category = ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'];

dataSet = 
[{
    name: '1800 年',
    data: [107, 31, 635, 203, 2],
}, {
    name: '1900 年',
    data: [133, 156, 947, 408, 6]
}, {
    name: '2008 年',
    data: [973, 914, 4054, 732, 34]
}];

barChartSetting(multiBarChart, "bar", title, subtitle, "人口(百万)", category, 1000, dataSet);

// ---------------------- 初始化纵向多条例柱状图 ----------------------
var multiRowBarChart = Highcharts.chart('multiRowBarChart', Object.assign({}, barChartAttribute));
barChartSetting(multiRowBarChart, "column", title, subtitle, "人口(百万)", category, 1000, dataSet);
