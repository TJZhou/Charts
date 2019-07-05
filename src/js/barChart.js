export var barChartAttribute = {
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
export function barChartSetting(barChart, flag, title, subtitle, unit, category, animation, dataSet) {

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