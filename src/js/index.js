import "../css/main.css";
import { barChartAttribute, barChartSetting } from "../js/barChart";
import { lineChartAttribute, lineChartSetting } from "../js/lineChart";
import { pieChartAttribute, pieChartSetting } from "../js/pieChart";
import { polygonChartSetting, polygonChartAttribute } from "../js/polygonChart";

// 在 Highcharts 加载之后加载功能模块
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

var data, dataSet, title, subtitle, category;

initBarChart();
function initBarChart() {
    // ---------------------- 初始化纵向柱状图 ----------------------
    title = "全球各大城市人口排行";
    subtitle = "数据截止 2017-03，来源:Wikipedia"
    dataSet = [{
        name: "总人口",
        data: [['上海', 24.25], ['卡拉奇', 23.50], ['北京', 21.51],
        ['德里', 16.78], ['拉各斯', 16.06], ['天津', 15.20], ['伊斯坦布尔', 14.16],
        ['东京', 13.51], ['广州', 13.08], ['孟买', 12.44], ['莫斯科', 12.19],
        ['圣保罗', 12.03], ['深圳', 10.46], ['雅加达', 10.07]],
    }];

    var barChart = Highcharts.chart('barChart', Object.assign({}, barChartAttribute));
    document.getElementById('barChart').style.display = 'block';

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
    document.getElementById('rowBarChart').style.display = 'block';
    barChartSetting(rowBarChart, "bar", title, subtitle, "人口(百万)", null, 1000, dataSet);

    // ---------------------- 初始化横向多条例柱状图 ----------------------
    var multiBarChart = Highcharts.chart('multiBarChart', Object.assign({}, barChartAttribute));
    document.getElementById('multiBarChart').style.display = 'block';
    title = "各大洲人口变化";
    category = ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'];

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
}


initPieChart();
function initPieChart() {
    //  ---------------------- 初始化饼图 ----------------------
    var pieChart = Highcharts.chart('pieChart', pieChartAttribute);
    document.getElementById('pieChart').style.display = 'block';

    // 饼图数据
    data = [['Chrome', 300], ['Chrome', 200], ['IE', 100],
    ['FireFox', 100], ['Edge', 80], ['Safari', 70], ['Sogou Explore', 60],
    ['Opera', 50], ['Other', 50]];

    /**
     * @param {Object} 参数0: 需要修改的饼图对象
     * @param {String} 参数1: 图表名字 
     * @param {String} 参数2: 图表副标题，若不需要标题 参数2置空
     * @param {long}   参数3: 动画效果持续时间，为0则无动画效果 
     * @param {int}    参数4: 内部圆环（innerSize）大小，大于 0 小于100 
     * @param {boolean}参数5: 是否展示图例 
     * @param {Array}  参数6: 饼图数据
     */
    pieChartSetting(pieChart, "浏览器访问量占比", "数据截止 2017-03", 1000, 0, true, data);


    // ---------------------- 初始化圈图 ----------------------
    var doughnutChart = Highcharts.chart('doughnutChart', pieChartAttribute);
    document.getElementById('doughnutChart').style.display = 'block';

    data = [['Chrome', 300], ['FireFox', 200], ['IE', 100]];

    pieChartSetting(doughnutChart, "浏览器访问量占比", "数据截止 2017-03", 1000, 50, true, data);
}

initLineChart();
function initLineChart() {
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

    var lineChart = Highcharts.chart('lineChart', Object.assign({}, lineChartAttribute));
    document.getElementById('lineChart').style.display = 'block';

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
    var lineChart2 = Highcharts.chart('lineChart2', Object.assign({}, lineChartAttribute));
    document.getElementById('lineChart2').style.display = 'block';
    lineChartSetting(lineChart2, true, title, subtitle, '温度', category, 2000, dataSet);

}

initPolygonChart();
function initPolygonChart() {
    // ---------------------- 初始化极地图 ----------------------
    dataSet = [{
        name: '预算拨款',
        data: [43000, 19000, 60000, 35000, 17000, 10000],
        pointPlacement: 'on'
    }, {
        name: '实际支出',
        data: [50000, 39000, 42000, 31000, 26000, 14000],
        pointPlacement: 'on'
    }, {
        name: '实际收入',
        data: [60000, 49000, 45000, 50000, 44000, 40000],
        pointPlacement: 'on'
    }];
    title = '预算与支出';
    subtitle = '数据来源: WorldClimate.com';
    category = ['销售', '市场营销', '发展', '客户支持',
        '信息技术', '行政管理'];
    var polygonChart = Highcharts.chart('polygonChart', Object.assign({}, polygonChartAttribute));
    document.getElementById('polygonChart').style.display = 'block';

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
    polygonChartSetting(polygonChart, false, title, subtitle, null, category, 2000, dataSet);
}