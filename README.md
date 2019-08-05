## 图表展示界面: 

## 项目简介: 
* 使用highCharts api 封装饼图、柱状图、折线图、极地图
* 项目源码`/knowledge/apache-tomcat-6.0.44-pro/webapps/yango/dev/charts/sourceCode`
* 图表中给出的数据均为模拟数据，后续数据库设计以及数据传入、读取暂未完成设计

## 环境搭建要求 :
1. Visual Studio code/sublime/或其他文本编辑器
2. 已安装npm
3. webpack 服务器端口8088（可在webpack.config.js修改）

## 运行以及项目部署:
* STEPS :
1. 进入根目录
2. 控制台执行`npm install` 安装依赖
3. 在编辑器中打开要修改的文件
4. 运行`npm start`在浏览器中调试修改后的界面效果
5. 修改完成后在控制台运行`npm run build`将项目打包
6. 将打包后的项目（dist文件夹下）发布到192.168.26.42服务器， 
    目录 `/knowledge/apache-tomcat-6.0.44-pro/webapps/yango/dev/charts/view`