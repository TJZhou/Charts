export var lineChartAttribute = {
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
export function lineChartSetting(lineChart, showDataLabel, title, subtitle,  unit, category, animation, dataSet) {

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