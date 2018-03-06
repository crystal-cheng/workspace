



const echartsmodel = require('../echartmodel/all');
const nodeEcharts = require('../echartmodel/index.js');
const path = require('path');
const reportTable = require('./reportTable.js');
const fs = require('fs');
const svg2png = require('svg2png');

class App extends Model {

    /**
     * node生成图片
     */
    echarts(req) {
        // let param = {
        //     showCategoryId: req.query.showCategoryId || 'bar',
        //     page: req.query.page || 3
        // };

        return http.get(...this._appendCookie('/api2/dashboard/lists', req, {
            showCategoryId: req.query.id,
            page: req.query.page
        })).then(result => {
            var base64str = '', modelObj = {}, option = '', imgarr = [], imgjson;

            fs.mkdir(path.join(__dirname, '/echartsImg'));

            // 图片转base64
            function encode(file) {
                const bitmap = fs.readFileSync(file);

                return new Buffer(bitmap).toString('base64');
            }
            _.each(result.result, function(val, index) {
                switch (val.type) {
                    case 'form': // 表格
                        const $ = require('jquery')(require('node-jsdom').jsdom().defaultView);
                        reportTable.init($, _);

                        const tableSvg = $('<div style="float:center;margin: 0 auto"></div>').reportTable({
                            title: '',
                            titles: val.data.titles,
                            xTitles: val.data.xTitles,
                            yTitles: val.data.yTitles,
                            data: val.data.reportData,
                            isAppTab: true
                        });
                        
                        const outputBuffer = svg2png.sync(tableSvg, { filename: path.join(__dirname, '/echartsImg', 'table.png') });
                        fs.writeFileSync(path.join(__dirname, '/echartsImg', 'table.png'), outputBuffer);
                        base64str = 'data:image/png;base64,' + encode(path.join(__dirname, '/echartsImg', 'table.png'));
                        break;
                    case 'total': // 总值图
                        modelObj = {
                            title: '',
                            seriesData: val.data.seriesData
                        };
                        option = echartsmodel.createZongZhiTu(modelObj);
                        break;
                    case 'controlChart': // 控制图
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createKongZhiTu(modelObj);
                        break;
                    case 'bar':  // 柱状图
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createZhuZhuangTu(modelObj);
                        break;
                    case 'line':
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createQuShiTu(modelObj);
                        break; // 趋势图
                    case 'barchart':  // 条形图
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.yAxisName,
                            yAxisData: val.data.yAxisData,
                            yAxisName: val.data.xAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createTiaoXingTu(modelObj);
                        break;
                    case 'stackColumn':
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createDuiJiZhuZhuangTu(modelObj);
                        break; // 堆积图
                    case 'pie': // 扇形图
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createShanXingTu(modelObj);
                        break;
                    case 'circlePie':
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createYuanHuanTu(modelObj);
                        break;// 环形图
                    case 'histogram': // 直方图
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesName: val.data.seriesName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createZhiFangTu(modelObj);
                        break;
                    case 'scatter':
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            xAxisName: val.data.xAxisName,
                            xAxisData: val.data.xAxisData,
                            yAxisName: val.data.yAxisName,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createSanDianTu(modelObj);
                        break; // 散点图
                    case 'map':
                        modelObj = {
                            title: '',
                            legendData: val.data.legendData,
                            seriesData: val.data.seriesData,
                            showLegend: val.data.showLegend
                        };
                        option = echartsmodel.createDiTu(modelObj);
                        break; // 地图
                    default: break;
                }
                if (option && val.type !== 'form') {
                    nodeEcharts({
                        path: path.join(__dirname, '/echartsImg', val.type + '.png'),
                        option: option,
                        width: 500,
                        height: 500
                    });
                    base64str = 'data:image/png;base64,' +
                        encode(path.join(__dirname, '/echartsImg', val.type + '.png'));
                }
                val.title = val.data.title;
                val.data = base64str;
                // imgjson = {
                //     id: val.id,
                //     title: val.data.title,
                //     grouptype: val.groupByType,
                //     type: val.type,
                //     mode: val.mode,
                //     isDel: val.isDel,
                //     data: base64str
                // };
                // imgarr.push(imgjson);
            });

            // return {status: 200, result: imgarr, count: result.count};
            return result;
        });
    }
}

module.exports = new App();
