/*
 说明：此插件用于绘图,
 参数：defaults = {
 type: '',
 data: []
 } type为必须参数
 total: '总值图',
 line: '折线图',
 bar: '柱状图',
 pie: '饼状图',
 form / table: '表格显示',
 radar: '雷达图',
 barchart: '条形图',
 stackColumn: '堆积柱形图',
 circlePie: '圆环图',
 scatter: '散点图',
 map: '地图',
 histogram: '直方图',
 controlChart: '控制图'
 data为绘图所需参数,callback为点击统计图时触发的回调函数
 */
(function($) {
    var getOption = {},
        myTheme = Safirst.user.theme ? Safirst.user.theme : 'blue';
    $.fn.appAnalysisChart = function(options) {
        var defaults = {
                config: {
                    type: 'total'
                },
                data: '',
                lablestyle: '14px',
                callback: function() {}
            }, method, url, self = this, data,
            originMychart = {},
            maxWidth = this.width() > 600 ? 380 : this.width();
        options = $.extend(defaults, options);
        this.id = options.config.id || '';
        url = '/api/dashboard/svg';
        method = {
            chartData: '',
            config: {},
            x_line: [],
            flag: 0,
            come: 1,
            xlength: 0,
            ylength: 0,
            index: 0,
            datatable: {},
            target: {},
            gaugeData: '',
            xIncType: '',
            formIncYoY: '',
            formIncMoM: '',
            redLight: '#C23531',
            greenLignt: '#91C7AE',
            yellowLight: '#DD883C',
            chartTypes: {
                total: '总值图',
                line: '折线图',
                bar: '柱状图',
                pie: '饼状图',
                table: '表格显示',
//                radar: '雷达图',
                barchart: '条形图',
                stackColumn: '堆积柱形图',
                circlePie: '圆环图',
                scatter: '散点图',
                map: '地图',
                histogram: '直方图',
                controlChart: '控制图'
            },
            chartmapType: '',
            init: function() {
                if (_.isEmpty(options.data)) {
                    options.data.data = [0];
                }
                method.target = options.config.target ? options.config.target : '';
                method.xIncType = options.config.xIncType ? options.config.xIncType : '';
                method.formIncYoY = options.config.formIncYoY || '';
                method.formIncMoM = (options.config.formIncMoM === 'MoM') ? 'MoM' : '';
                data = options.data;

                if (typeof options.config !== 'undefined') {
                    options.config.id = typeof options.config.id === 'undefined' ? '' : options.config.id;
                } else {
                    options.config.id = '';
                }

//                myChart = originMychart[options.config.id];
                if (myTheme === 'black' && location.pathname === '/dashboard') {
                    originMychart[options.config.id] = echarts.init(self[0], 'dark');
                    method.title = {
                        text: _.has(options.config, 'title') ? options.config.title : '',
                        textAlign: 'left',
                        x: '20px',
                        y: '20px',
                        textStyle: {
                            fontWeight: 'bold',
                            fontSize: '18',
                            color: '#fff'
                        }
                    };
                } else {
                    originMychart[options.config.id] = echarts.init(self[0], 'macarons');
                    method.title = {
                        text: _.has(options.config, 'title') ? options.config.title : '',
                        textAlign: 'left',
                        x: '20px',
                        y: '20px',
                        textStyle: {
                            fontWeight: 'bold',
                            fontSize: '18',
                            color: '#333'
                        }
                    };
                }
                var date = new Date(),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate(),
                    hour = date.getHours(),
                    minute = date.getMinutes(),
                    second = date.getSeconds(),
                    nametime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                method.toolBox = {
                    show : false,
                    itemSize: 18,
                    right: '3%',
                    feature : {
                        saveAsImage : {
                            show : false,
                            title : '保存为图片',
                            name: method.chartTypes[options.data.type] + '_' + nametime,
                            type : 'png',
                            lang : ['点击保存']
                        }
                    }
                };
                addEvent();
                return method.renderChart(data);
            },
            renderChart: function(data) {
                var option, cityMap, proviceMap,
                    originType = options.data.type;
                switch (options.data.type) {
                    case 'total':
                        method.renderTotalChart(data);
                        break;
                    case 'form':
                    case 'table':
                        return method.renderTable();
                    case 'line':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        option = method.renderAngleChart(data, options.data.type);
                        break;
                    case 'bar':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        option = method.renderAngleChart(data, options.data.type);
                        break;
                    case 'pie':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        option = method.renderCircleChart(data, options.data.type);
                        break;
                    case 'radar':
                        option = method.renderRadarChart(data);
                        break;
                    case 'barchart':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        options.data.type = 'bar';
                        option = method.renderAngleChart(data, 'barchart');
                        break;
                    case 'stackColumn':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        options.data.type = 'bar';
                        option = method.renderAngleChart(data, 'stackColumn');
                        break;
                    case 'circlePie':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        options.data.type = 'pie';
                        option = method.renderCircleChart(data, 'circlePie');
                        break;
                    case 'map':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        option = method.renderMapChart(data, options.data.type);
                        break;
                    case 'scatter':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        option = method.renderScatterChart(data);
                        break;
                    case 'histogram':
                        options.data.type = 'bar';
                        option = method.renderAngleChart(data, 'histogram');
                        break;
                    case 'controlChart':
                        originMychart[options.config.id].on('click', function(e) {
                            options.callback(e);
                        });
                        options.data.type = 'line';
                        option = method.renderControlChart(data, 'controlChart');
                        break;
                    default:
                        break;
                }

                if (option) {
                    originMychart[options.config.id].setOption(option);

                    setTimeout(function() {
                        getOption[options.config.id + '_' + originType] =
                            'a=' + originMychart[options.config.id].getDataURL({
                                pixelRatio: 2,
                                backgroundColor: '#fff'
                            });
                    }, 5000);
                    window.onresize = originMychart[options.config.id].resize;
                    if (options.data.type === 'map') {
                        cityMap = { //市区对应邮政编码
                            '北京市': '110100',
                            '天津市': '120100',
                            '上海市': '310100',
                            '重庆市': '500100',
                            '崇明县': '310200',
                            '潜江市': '429000',
                            '天门市': '429000',
                            '神农架林区': '429000',
                            '仙桃市': '429000',
                            '铜仁市': '522200',
                            '毕节市': '522400',
                            '石家庄市': '130100',
                            '唐山市': '130200',
                            '秦皇岛市': '130300',
                            '邯郸市': '130400',
                            '邢台市': '130500',
                            '保定市': '130600',
                            '张家口市': '130700',
                            '承德市': '130800',
                            '沧州市': '130900',
                            '廊坊市': '131000',
                            '衡水市': '131100',
                            '太原市': '140100',
                            '大同市': '140200',
                            '阳泉市': '140300',
                            '长治市': '140400',
                            '晋城市': '140500',
                            '朔州市': '140600',
                            '晋中市': '140700',
                            '运城市': '140800',
                            '忻州市': '140900',
                            '临汾市': '141000',
                            '吕梁市': '141100',
                            '呼和浩特市': '150100',
                            '包头市': '150200',
                            '乌海市': '150300',
                            '赤峰市': '150400',
                            '通辽市': '150500',
                            '鄂尔多斯市': '150600',
                            '呼伦贝尔市': '150700',
                            '巴彦淖尔市': '150800',
                            '乌兰察布市': '150900',
                            '兴安盟': '152200',
                            '锡林郭勒盟': '152500',
                            '阿拉善盟': '152900',
                            '沈阳市': '210100',
                            '大连市': '210200',
                            '鞍山市': '210300',
                            '抚顺市': '210400',
                            '本溪市': '210500',
                            '丹东市': '210600',
                            '锦州市': '210700',
                            '营口市': '210800',
                            '阜新市': '210900',
                            '辽阳市': '211000',
                            '盘锦市': '211100',
                            '铁岭市': '211200',
                            '朝阳市': '211300',
                            '葫芦岛市': '211400',
                            '长春市': '220100',
                            '吉林市': '220200',
                            '四平市': '220300',
                            '辽源市': '220400',
                            '通化市': '220500',
                            '白山市': '220600',
                            '松原市': '220700',
                            '白城市': '220800',
                            '延边朝鲜族自治州': '222400',
                            '哈尔滨市': '230100',
                            '齐齐哈尔市': '230200',
                            '鸡西市': '230300',
                            '鹤岗市': '230400',
                            '双鸭山市': '230500',
                            '大庆市': '230600',
                            '伊春市': '230700',
                            '佳木斯市': '230800',
                            '七台河市': '230900',
                            '牡丹江市': '231000',
                            '黑河市': '231100',
                            '绥化市': '231200',
                            '大兴安岭地区': '232700',
                            '南京市': '320100',
                            '无锡市': '320200',
                            '徐州市': '320300',
                            '常州市': '320400',
                            '苏州市': '320500',
                            '南通市': '320600',
                            '连云港市': '320700',
                            '淮安市': '320800',
                            '盐城市': '320900',
                            '扬州市': '321000',
                            '镇江市': '321100',
                            '泰州市': '321200',
                            '宿迁市': '321300',
                            '杭州市': '330100',
                            '宁波市': '330200',
                            '温州市': '330300',
                            '嘉兴市': '330400',
                            '湖州市': '330500',
                            '绍兴市': '330600',
                            '金华市': '330700',
                            '衢州市': '330800',
                            '舟山市': '330900',
                            '台州市': '331000',
                            '丽水市': '331100',
                            '合肥市': '340100',
                            '芜湖市': '340200',
                            '蚌埠市': '340300',
                            '淮南市': '340400',
                            '马鞍山市': '340500',
                            '淮北市': '340600',
                            '铜陵市': '340700',
                            '安庆市': '340800',
                            '黄山市': '341000',
                            '滁州市': '341100',
                            '阜阳市': '341200',
                            '宿州市': '341300',
                            '六安市': '341500',
                            '亳州市': '341600',
                            '池州市': '341700',
                            '宣城市': '341800',
                            '福州市': '350100',
                            '厦门市': '350200',
                            '莆田市': '350300',
                            '三明市': '350400',
                            '泉州市': '350500',
                            '漳州市': '350600',
                            '南平市': '350700',
                            '龙岩市': '350800',
                            '宁德市': '350900',
                            '南昌市': '360100',
                            '景德镇市': '360200',
                            '萍乡市': '360300',
                            '九江市': '360400',
                            '新余市': '360500',
                            '鹰潭市': '360600',
                            '赣州市': '360700',
                            '吉安市': '360800',
                            '宜春市': '360900',
                            '抚州市': '361000',
                            '上饶市': '361100',
                            '济南市': '370100',
                            '青岛市': '370200',
                            '淄博市': '370300',
                            '枣庄市': '370400',
                            '东营市': '370500',
                            '烟台市': '370600',
                            '潍坊市': '370700',
                            '济宁市': '370800',
                            '泰安市': '370900',
                            '威海市': '371000',
                            '日照市': '371100',
                            '莱芜市': '371200',
                            '临沂市': '371300',
                            '德州市': '371400',
                            '聊城市': '371500',
                            '滨州市': '371600',
                            '菏泽市': '371700',
                            '郑州市': '410100',
                            '开封市': '410200',
                            '洛阳市': '410300',
                            '平顶山市': '410400',
                            '安阳市': '410500',
                            '鹤壁市': '410600',
                            '新乡市': '410700',
                            '焦作市': '410800',
                            '濮阳市': '410900',
                            '许昌市': '411000',
                            '漯河市': '411100',
                            '三门峡市': '411200',
                            '南阳市': '411300',
                            '商丘市': '411400',
                            '信阳市': '411500',
                            '周口市': '411600',
                            '驻马店市': '411700',
                            '省直辖县级行政区划': '469000',
                            '武汉市': '420100',
                            '黄石市': '420200',
                            '十堰市': '420300',
                            '宜昌市': '420500',
                            '襄阳市': '420600',
                            '鄂州市': '420700',
                            '荆门市': '420800',
                            '孝感市': '420900',
                            '荆州市': '421000',
                            '黄冈市': '421100',
                            '咸宁市': '421200',
                            '随州市': '421300',
                            '恩施土家族苗族自治州': '422800',
                            '长沙市': '430100',
                            '株洲市': '430200',
                            '湘潭市': '430300',
                            '衡阳市': '430400',
                            '邵阳市': '430500',
                            '岳阳市': '430600',
                            '常德市': '430700',
                            '张家界市': '430800',
                            '益阳市': '430900',
                            '郴州市': '431000',
                            '永州市': '431100',
                            '怀化市': '431200',
                            '娄底市': '431300',
                            '湘西土家族苗族自治州': '433100',
                            '广州市': '440100',
                            '韶关市': '440200',
                            '深圳市': '440300',
                            '珠海市': '440400',
                            '汕头市': '440500',
                            '佛山市': '440600',
                            '江门市': '440700',
                            '湛江市': '440800',
                            '茂名市': '440900',
                            '肇庆市': '441200',
                            '惠州市': '441300',
                            '梅州市': '441400',
                            '汕尾市': '441500',
                            '河源市': '441600',
                            '阳江市': '441700',
                            '清远市': '441800',
                            '东莞市': '441900',
                            '中山市': '442000',
                            '潮州市': '445100',
                            '揭阳市': '445200',
                            '云浮市': '445300',
                            '南宁市': '450100',
                            '柳州市': '450200',
                            '桂林市': '450300',
                            '梧州市': '450400',
                            '北海市': '450500',
                            '防城港市': '450600',
                            '钦州市': '450700',
                            '贵港市': '450800',
                            '玉林市': '450900',
                            '百色市': '451000',
                            '贺州市': '451100',
                            '河池市': '451200',
                            '来宾市': '451300',
                            '崇左市': '451400',
                            '海口市': '460100',
                            '三亚市': '460200',
                            '三沙市': '460300',
                            '成都市': '510100',
                            '自贡市': '510300',
                            '攀枝花市': '510400',
                            '泸州市': '510500',
                            '德阳市': '510600',
                            '绵阳市': '510700',
                            '广元市': '510800',
                            '遂宁市': '510900',
                            '内江市': '511000',
                            '乐山市': '511100',
                            '南充市': '511300',
                            '眉山市': '511400',
                            '宜宾市': '511500',
                            '广安市': '511600',
                            '达州市': '511700',
                            '雅安市': '511800',
                            '巴中市': '511900',
                            '资阳市': '512000',
                            '阿坝藏族羌族自治州': '513200',
                            '甘孜藏族自治州': '513300',
                            '凉山彝族自治州': '513400',
                            '贵阳市': '520100',
                            '六盘水市': '520200',
                            '遵义市': '520300',
                            '安顺市': '520400',
                            '黔西南布依族苗族自治州': '522300',
                            '黔东南苗族侗族自治州': '522600',
                            '黔南布依族苗族自治州': '522700',
                            '昆明市': '530100',
                            '曲靖市': '530300',
                            '玉溪市': '530400',
                            '保山市': '530500',
                            '昭通市': '530600',
                            '丽江市': '530700',
                            '普洱市': '530800',
                            '临沧市': '530900',
                            '楚雄彝族自治州': '532300',
                            '红河哈尼族彝族自治州': '532500',
                            '文山壮族苗族自治州': '532600',
                            '西双版纳傣族自治州': '532800',
                            '大理白族自治州': '532900',
                            '德宏傣族景颇族自治州': '533100',
                            '怒江傈僳族自治州': '533300',
                            '迪庆藏族自治州': '533400',
                            '拉萨市': '540100',
                            '昌都地区': '542100',
                            '山南地区': '542200',
                            '日喀则地区': '542300',
                            '那曲地区': '542400',
                            '阿里地区': '542500',
                            '林芝地区': '542600',
                            '西安市': '610100',
                            '铜川市': '610200',
                            '宝鸡市': '610300',
                            '咸阳市': '610400',
                            '渭南市': '610500',
                            '延安市': '610600',
                            '汉中市': '610700',
                            '榆林市': '610800',
                            '安康市': '610900',
                            '商洛市': '611000',
                            '兰州市': '620100',
                            '嘉峪关市': '620200',
                            '金昌市': '620300',
                            '白银市': '620400',
                            '天水市': '620500',
                            '武威市': '620600',
                            '张掖市': '620700',
                            '平凉市': '620800',
                            '酒泉市': '620900',
                            '庆阳市': '621000',
                            '定西市': '621100',
                            '陇南市': '621200',
                            '临夏回族自治州': '622900',
                            '甘南藏族自治州': '623000',
                            '西宁市': '630100',
                            '海东地区': '632100',
                            '海北藏族自治州': '632200',
                            '黄南藏族自治州': '632300',
                            '海南藏族自治州': '632500',
                            '果洛藏族自治州': '632600',
                            '玉树藏族自治州': '632700',
                            '海西蒙古族藏族自治州': '632800',
                            '银川市': '640100',
                            '石嘴山市': '640200',
                            '吴忠市': '640300',
                            '固原市': '640400',
                            '中卫市': '640500',
                            '乌鲁木齐市': '650100',
                            '克拉玛依市': '650200',
                            '吐鲁番地区': '652100',
                            '哈密地区': '652200',
                            '昌吉回族自治州': '652300',
                            '博尔塔拉蒙古自治州': '652700',
                            '巴音郭楞蒙古自治州': '652800',
                            '阿克苏地区': '652900',
                            '克孜勒苏柯尔克孜自治州': '653000',
                            '喀什地区': '653100',
                            '和田地区': '653200',
                            '伊犁哈萨克自治州': '654000',
                            '塔城地区': '654200',
                            '阿勒泰地区': '654300',
                            '自治区直辖县级行政区划': '659000',
                            '台湾省': '710000',
                            '香港特别行政区': '810100',
                            '澳门特别行政区': '820000'
                        };
                        proviceMap = {
                            '安徽': 'anhui',
                            '澳門': 'aomen',
                            '台湾': 'taiwan',
                            '北京': 'beijing',
                            '重庆': 'chongqing',
                            '福建': 'fujian',
                            '甘肃': 'gansu',
                            '广东': 'guangdong',
                            '广西': 'guangxi',
                            '贵州': 'guizhou',
                            '海南': 'hainan',
                            '河南': 'henan',
                            '河北': 'hebei',
                            '黑龙江': 'heilongjiang',
                            '宁夏': 'ningxia',
                            '青海': 'qianghai',
                            '山东': 'shandong',
                            '上海': 'shanghai',
                            '山西': 'shanxi1',
                            '陕西': 'shanxi2',
                            '四川': 'sichaun',
                            '天津': 'tianjin',
                            '香港': 'xianggang',
                            '新疆': 'xinjiang',
                            '西藏': 'xizang',
                            '云南': 'yunnan',
                            '浙江': 'zhejiang',
                            '内蒙古': 'neimenggu',
                            '湖南': 'hunan',
                            '湖北': 'hubei',
                            '江苏': 'jiangsu',
                            '辽宁': 'liaoning',
                            '江西': 'jiangxi',
                        };
                        originMychart[options.config.id].on('click', function(params) {
                            // console.log(params.name,1,option.series[0].mapType,2,method.chartmapType);
                            var optiontype = option.series[0].mapType;
                            if (option.series[0].mapType === 'china') { //全国到市
                                option = method.renderMapChart(options.data, 'map', 'notchina', params.name);
                                option.series[0].mapType = params.name;
                                originMychart[options.config.id].setOption(option);
                            } else if (!! cityMap[method.chartmapType] || optiontype === '北京' || optiontype === '重庆'
                                || optiontype === '天津'
                                || optiontype === '上海') { //区到全国
                                method.chartmapType = 'china';
                                option.series[0].mapType = 'china';
                                option = method.renderMapChart(options.data, 'map', 'china');
                                originMychart[options.config.id].setOption(option);
                            } else if (!! proviceMap[option.series[0].mapType]) { //市到区(安徽/江苏)
                                method.loadMap(cityMap[params.name], params.name, option);
                            }
                        });
                    }
                }
            },
            loadMap: function(mapCode, mapName, option) {
                $.get('/api/app/analysis/geoCity/' + mapCode, function(data) {
                    if (data) {
                        var zonedata = eval('(' + data.result + ')'), seledata = [];
                        echarts.registerMap(mapName, zonedata);
                        option.series[0].mapType = mapName;
                        _.each(options.data.data, function(val, text) {
                            if (text.split(' ').length > 1) {
                                seledata.push(
                                    {
                                        name: text.split(' ')[2],
                                        value: '6'
                                    });
                            } else {
                                _.each(val, function(cityval) {
                                    _.each(cityval, function(zone, text) {
                                        seledata.push(
                                            {
                                                name: text,
                                                value: '6'
                                            });
                                    });
                                });
                            }
                        });
                        option.series[0].data = seledata;
                        originMychart[options.config.id].setOption(option);
                        method.chartmapType = mapName;
                    } else {
                        alert('无法加载该地图');
                    }
                });

            },
            //总值动态图渲染
            renderTotalChart: function(data) {
                var maxHeight = 200,
                    myChart,
                    option,
                    row = maxHeight / 8,
                    col = maxWidth / 8,
                    gaugeheight = '',
                    gaugewidth = '',
                    svgheight = '',
                    svgewidth = '',
                    viewwidth = '',
                    viewheight = '',
                    polygonab = '',
                    polygonac = '',
                    polygonad = '',
                    polygonae = '',
                    polygonaf = '',
                    polygonag = '',
                    textx = '',
                    texty = '',
                    top = '',
                    viewBoxleft = '',
                    viewBoxtop = '',
                    svgTpl = '<div style="text-align: left;padding-top:20px;" > ' +
                        '<span class="totalChartTitle" style="font-weight:bold;' +
                        'font-size:18px;color:#333;margin-left:20px;"><%=title%></span>' +
                        '<a href="javascript:void(0)" class="saveTable saveTotal"></a>' +
                        '</div>' +
                        '<div class="pull-left tangle" style="margin-top:<%=top%>">' +
                        '<svg width="<%=svgewidth%>" height="<%= svgheight%>" ' +
                        'viewBox="<%=viewBoxleft%>,<%=viewBoxtop%>,<%=viewwidth%>,' +
                        '<%= viewheight%>">' + '<defs><style></style></defs>' +
                        '<polygon  points="<%=polygonab%>,<%=polygonac%> <%=polygonad%>,<%=polygonae%> ' +
                        '<%=polygonaf%>,<%=polygonag%>"' +
                        'style="fill:<%=color%>; stroke:#DCDCDC;stroke-width:1"/>' +
                        '<text x="<%=textx%>" y="<%=texty%>" font-size="18" ' +
                        'style="text-anchor:middle;">' +
                        '<%=data%>' +
                        '</text>' +
                        '</svg>' +
                        '</div>' +
                        '<div class="pull-right" id="gaugeChart" ' +
                        'style=" width: <%=gaugewidth%>; height: <%=gaugeheight%>"></div>';
                if ($(self).width() > 1000) {
                    gaugewidth = $(self).width() * 0.45;
                    gaugeheight = $(self).height() * 0.9;
                    svgewidth = $(self).width() * 0.4;
                    svgheight = $(self).height() * 0.6;
                    polygonab = 350;
                    polygonac = 100;
                    polygonad = 500;
                    polygonae = 380;
                    polygonaf = 200;
                    polygonag = 380;
                    viewwidth = 440;
                    viewheight = 440;
                    textx = 350;
                    texty = 420;
                    top = 4;
                    viewBoxleft = 60;
                    viewBoxtop = 0;
                    if ($(self).height() === 450) {
                        gaugewidth = $(self).width() * 0.6;
                        gaugeheight = $(self).height();
                        svgewidth = $(self).width() * 0.3;
                        svgheight = $(self).height() * 0.9;
                        polygonab = 350;
                        polygonac = 100;
                        polygonad = 500;
                        polygonae = 380;
                        polygonaf = 200;
                        polygonag = 380;
                        textx = 350;
                        texty = 400;
                        top = 0;
                    }

                } else if ($(self).width() <= 1000 && $(self).width() > 600) {
                    gaugewidth = ($(self).width() - 300);
                    gaugeheight = 410;
                    svgewidth = 280;
                    svgheight = 280;
                    polygonab = 175;
                    polygonac = 60;
                    polygonad = 250;
                    polygonae = 210;
                    polygonaf = 100;
                    polygonag = 210;
                    viewwidth = 280;
                    viewheight = 280;
                    textx = 170;
                    texty = 250;
                    top = 10;
                    viewBoxleft = 50;
                    viewBoxtop = 10;
                } else if ($(self).width() <= 600 && $(self).width() >= 0) {
                    gaugewidth = ($(self).width() - 300);
                    gaugeheight = 250;
                    svgewidth = 200;
                    svgheight = 200;
                    polygonab = 175;
                    polygonac = 60;
                    polygonad = 250;
                    polygonae = 210;
                    polygonaf = 100;
                    polygonag = 210;
                    viewwidth = 210;
                    viewheight = 210;
                    textx = 170;
                    texty = 230;
                    top = 4;
                    viewBoxleft = 40;
                    viewBoxtop = 30;
                }

                $('.canvasArea').css('margin-top', '2%');
                $(self).html(
                    _.template(svgTpl, {
                        color: '#79B2F2',
                        title: options.config.title || data['tableName'],
                        data: Number(data.data['total']).toFixed(2) || 0,
                        row: row,
                        col: col,
                        gaugewidth: gaugewidth + 'px',
                        gaugeheight: gaugeheight + 'px',
                        svgewidth : svgewidth + 'px',
                        svgheight : svgheight + 'px',
                        polygonab : polygonab,
                        polygonac : polygonac,
                        polygonad : polygonad,
                        polygonae : polygonae,
                        polygonaf : polygonaf,
                        polygonag : polygonag,
                        viewwidth :  viewwidth,
                        viewheight : viewheight,
                        textx : textx,
                        texty : texty,
                        top : top + '%',
                        viewBoxleft : viewBoxleft,
                        viewBoxtop : viewBoxtop

                    })
                );
                //检查当前主题色
                if (myTheme === 'black' && location.pathname === '/dashboard') {
                    originMychart[options.config.id] = echarts.init(self[0].childNodes[2], 'dark');
                    $('.boardList .board').css({
                        'background': '#1b2026'
                    });
                } else {
                    originMychart[options.config.id] = echarts.init(self[0].childNodes[2], 'macarons');
                }
                option = method.renderGaugeChart(data);
                originMychart[options.config.id].setOption(option);

                method.gaugeData = 'a=' + originMychart[options.config.id].getDataURL({
                        pixelRatio: 2,
                        backgroundColor: '#fff'
                    });
                id = typeof options.config.id === 'undefined' ? '' : options.config.id;
                getOption[id + '_total'] = method.gaugeData;
                getOption[id + 'total.title'] = method.title.text;
                window.onresize = originMychart[options.config.id].resize;
            },
            renderGaugeChart: function(data) {
                var min = 20, max = 80,
                    target = method.target[1],
                    total = Number(data.data['total']).toFixed(2) || 0,
                    maxTotal = 100, option = {};

                if (total > maxTotal) {
                    maxTotal = parseInt(total + total * 0.2, 10);
                }
                option = {
                    tooltip : {
                        confine: true,
                        formatter: '{a}：{c}'
                    },
                    series: [
                        {
                            name: '总数',
                            type: 'gauge',
                            min: 0,
                            max: maxTotal,
                            center: ['50%', '50%'],
                            detail: {formatter: '{value}'},
                            data: [{value: total, name: '总数值'}],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: [
                                        [0.2, '#91C7AE'],
                                        [0.8, '#DD883C'],
                                        [1, '#C23531']
                                    ]
                                }
                            }
                        }
                    ]
                };

                if (!_.isEmpty(target) && !_.isEmpty(target.minValue) && !_.isEmpty(target.maxValue)) {
                    min = parseInt(target.minValue, 10);
                    max = parseInt(target.maxValue, 10);
                    option.dataRange = {
                        x: 'center',
                        y: 'bottom',
                        orient: 'horizontal',
                        selectedMode: false,
                        splitList: [
                            {start: max},
                            {start: min, end: max},
                            {end: min}
                        ],
                        itemGap: 20,
                        color: ['#C23531', '#DD883C', '#91C7AE']
                    };

                    option.series[0].axisLine.lineStyle = {
                        color: [
                            [min / maxTotal, '#91C7AE'],
                            [max / maxTotal, '#DD883C'],
                            [1, '#C23531']
                        ]
                    };
                }

                return option;
            },
            //表格渲染
            renderTable: function() {
                var tableSvg = [];
                $('.chartBoxpp').css({
                    'overflow-y': 'auto'
                });
                $('.boardList .chartBox').css({
                    'overflow-x': 'auto',
                    'overflow-y': 'auto'
                });
                if (options.type === 'combine') {
                    tableSvg = method.formTableChart(options.data, method.target);
                    setTimeout(function() {
                        getOption[options.config.id + '_form'] = tableSvg;
                    }, 6000);
                    return tableSvg;
                } else {
                    getOption[options.config.id + '_form'] = method.formChart(options.data);
                    return getOption[options.config.id + '_form'];
                    // setTimeout(function(){
                    //     getOption[options.config.id + '_form'] = tableSvg;
                    // }, 6000);
                    // return tableSvg;
                }
            },
            //对直角系（line, bar, barchart, stackColumn, histogram）图形渲染
            renderAngleChart: function(data, originType) {
                var yInterval = ((originType === 'barchart' && method.getXline(data, true).length > 20) ? 'auto' : '0'),
                    option = {
                        title: method.title,
                        tooltip : {
                            trigger: 'item',
                            confine: true,
                            axisPointer: {
                                show: true,
                                type: 'line',
                                lineStyle: {
                                    type : 'dashed',
                                    width : 1
                                }
                            }
                        },
                        animation: true,
                        toolbox: method.toolBox,
                        legend: {
                            show: method.getKeys(data).length > 25 ? false : true,
                            x: 'center',
                            y: 'bottom',
                            data: method.getKeys(data)
                        },
                        grid: {
                            y2: '32%',
                            y: '100',
                            left: '12%',
                            right: '24%'
                        },
                        dataRange: method.getDataRange(),
                        xAxis: [
                            {
                                type: originType === 'barchart' ? 'value' : 'category',
                                name: originType === 'barchart' ? method.getYlineTitle() : method.getXlineTitle(),
                                nameLocation: 'middle',
                                nameGap: 60,
                                nameTextStyle: {
                                    fontWeight: 'bold',
                                    fontSize: '14',
                                    color: '#666'
                                },
                                position: 'bottom',
                                boundaryGap: options.data.type === 'line' ?
                                    false : (originType === 'barchart' ? [0, 0.1] : true),
                                data: originType === 'barchart' ? '' :
                                    (originType === 'histogram' ?
                                        method.getHistogramXline(data) : method.getXline(data)),
                                axisLabel : {
                                    show: true,
                                    margin: 10,
                                    interval: method.getXline(data).length > 25 ? 'auto' : 0,
                                    rotate: -30,
                                    formatter: function(param) {
                                        if (param.length > 7) {
                                            param = param.substr(0, 7) + '..';
                                        }
                                        return param;
                                    },

                                    textStyle: {
                                        fontSize: '14'
                                    }
                                },
                                axisTick: {
                                    inside: true
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: originType === 'barchart' ? 'category' : 'value',
                                name: originType === 'barchart' ? method.getXlineTitle() : method.getYlineTitle(),
                                data: originType === 'barchart' ? method.getXline(data, true) : '',
                                position: 'left',
                                nameLocation: originType === 'barchart' ? 'end' : 'end',
                                nameGap: '30',
                                alignWithLabel: true,
                                nameTextStyle: {
                                    fontWeight: 'bold',
                                    fontSize: '14',
                                    color: '#666'
                                },
                                boundaryGap: [0, 0.1],
                                axisLabel : {
                                    show: true,
                                    interval: yInterval,
                                    formatter: function(param) {
                                        if (param.length > 5) {
                                            param = param.substr(0, 5) + '..';
                                        }
                                        return param;
                                    },
                                    textStyle: {
                                        fontSize: '14'
                                    }
                                }
                            }
                        ],
                        series: method.setAngleChartData(data, originType)
                    };
                if (method.xIncType) {
                    // 暂时注销同比环比
                    option = method.renderIncreasingData(option);
                }
                return option;
            },
            //对圆环类（pie, circlePie）图形渲染
            renderCircleChart: function(data, originType) {
                var option = {
                    title: method.title,
                    dataRange: method.getDataRange(),
                    tooltip : {
                        trigger: 'item',
                        confine: true,
                        formatter: '{b} : {c} ({d}%)'
                    },
                    toolbox: method.toolBox,
                    calculable : true,
                    animation: true,
                    series: method.setAngleChartData(data, originType)
                };
                option.series[0].label = {
                    normal: {
                        show: option.series[0].data.length > 25 ? false : true,
                        formatter: function(param) {
                            return param.name + ' (' + param.percent + '%)';
                        }
                    }
                };
                return option;
            },
            renderMapChart: function(data, originType, paramtype, maptype) {
                var option = {
                    title: method.title,
                    dataRange: method.getDataRange(),
                    animation: true,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                        // confine: true,
                        // formatter: function(params) {
                        //     var i = 0,
                        //         res = params.name + '<br/>';
                        //     // for (; i < option.series.length; i++) {
                        //     //     _.each(option.series[i].data, function(item, key) {
                        //     //         if (params.name === item.name) {
                        //     //             res += data.yaxis[i] + '：' + item.value + '</br>';
                        //     //         }
                        //     //     });
                        //     // }
                        //     return res;
                        // }
                    },
                    toolbox: method.toolBox,
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: data.data.length === 0 ? [] : data.yaxis
                    },
                    visualMap: {
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true
                    },
                    series : method.setMapChartData(data, paramtype, maptype)
                };

                return option;
            },
            renderRadarChart: function(data) {
                var option = {
                    title : method.title,
                    tooltip: {
                        trigger: 'item',
                        confine: true
                    },
                    animation: true,
                    dataRange: method.getDataRange(),
                    toolbox: method.toolBox,
                    legend: {
                        show: method.getKeys(data).length > 25 ? false : true,
                        x: 'center',
                        y: 'bottom',
                        data: method.getKeys(data)
                    },
                    polar: [
                        {
                            indicator: method.getRadarXline(data)
                        }
                    ],
                    calculable: true,
                    series: method.setAngleChartData(data)
                };
                return option;
            },
            renderScatterChart: function(data) {
                var yTitle = typeof options.config.y[1] === 'undefined' ?
                        '' : method.getTitle(options.config.y[1].field),
                    yname = (options.type === 'combine') ? data.yaxis[0] :
                        ((options.config.x.length === 0) ? yTitle : ''),
                    option = {
                        title: method.title,
                        animation: true,
                        tooltip: {
                            trigger: 'axis',
                            confine: true,
                            showDelay: 0,
                            formatter: function(params) {
                                if (params.value.length > 1) {
                                    return params.seriesName + '<br/>' + params.value[0] + ':  ' + params.value[1];
                                } else {
                                    return method.getYlineTitle() + ': ' + params.value[0] + '<br/>' +
                                        method.getTitle(options.config.y[1].field) + ': ' + params.value[1];
                                }
                            },
                            axisPointer: {
                                show: true,
                                type : 'cross',
                                lineStyle: {
                                    type : 'dashed',
                                    width : 1
                                }
                            }
                        },
                        grid: {
                            right: '15%',
                            y2: '35%',
                            left: '12%'
                        },
                        toolbox: method.toolBox,
                        legend: {
                            x: 'center',
                            y: 'bottom',
                            data: (options.type === 'combine' ||
                            (options.config.hasOwnProperty('x') && options.config.x.length === 0)) ? [] : data.yaxis
                        },
                        dataRange: method.getDataRange(),
                        xAxis : [
                            {
                                type: (options.config.hasOwnProperty('x') && options.config.x.length === 0) ? 'value' :
                                    'category',
                                name: (options.type === 'combine') ? data.xaxis[0] :
                                    ((options.config.x.length === 0) ? method.getYlineTitle() :
                                        method.getXlineTitle()),
                                position: 'bottom',
                                boundaryGap: false,
                                data: method.getXline(data, true),
                                nameLocation: 'middle',
                                nameGap: 70,
                                nameTextStyle: {
                                    fontWeight: 'bold',
                                    fontSize: '14',
                                    color: '#666'
                                },
                                axisLabel : {
                                    show: true,
                                    rotate: -30,
                                    y: 20,
                                    formatter: function(param) {
                                        if (param.length > 7) {
                                            param = param.substr(0, 7) + '..';
                                        }
                                        return param;
                                    },
                                    textStyle: {
                                        fontWeight: 'normal',
                                        fontSize: '14'
                                    }
                                },
                                axisTick: {
                                    inside: true
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: yname,
                                nameTextStyle: {
                                    fontWeight: 'bold',
                                    fontSize: '14',
                                    color: '#666'
                                },
                                nameLocation: 'middle',
                                nameGap: 70,
                                data: '',
                                position: 'left',
                                boundaryGap: [0, 0.1],
                                axisLabel: {
                                    show: true,
                                    interval: 'auto',
                                    formatter: '{value}',
                                    textStyle: {
                                        fontWeight: 'normal',
                                        fontSize: '14px'
                                    }
                                }
                            }
                        ],
                        series: method.setScatterChartData(data)
                    };
                return option;
            },
            renderControlChart: function(data, originType) {
                var low = 0, top = 0,
                    option = {};
                if (!_.isEmpty(data)) {
                    low = data.data.low;
                    top = data.data.top;
                }

                option = {
                    title: method.title,
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            show: true,
                            type: 'line',
                            confine: true,
                            lineStyle: {
                                type : 'dashed',
                                width : 1
                            }
                        },
                        formatter: function(params) {
                            if (params[0]) {
                                return params[0]['name'] + ':  ' + params[0]['value'];
                            } else {
                                return params.name + ':  ' + params.value;
                            }

                        }
                    },
                    animation: true,
                    toolbox: method.toolBox,
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: method.getKeys(data)
                    },
                    grid: {
                        right: '15%',
                        y2: '26%',
                        left: '12%'
                    },
                    dataRange: method.getDataRange(),
                    xAxis: [
                        {
                            type: 'category',
                            name: method.getXlineTitle(),
                            position: 'bottom',
                            boundaryGap: false,
                            nameLocation: 'middle',
                            nameGap: 70,
                            nameTextStyle: {
                                fontWeight: 'bold',
                                fontSize: '14',
                                color: '#666'
                            },
                            data: method.getXline(data),
                            axisLabel : {
                                show: true,
                                margin: 0,
                                rotate: -30,
                                formatter: '{value}',
                                textStyle: {
                                    fontSize: '14px'
                                }
                            },
                            axisTick: {
                                inside: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: method.getYlineTitle(),
                            position: 'left',
                            alignWithLabel: true,
                            nameTextStyle: {
                                fontWeight: 'bold',
                                fontSize: '14',
                                color: '#666'
                            },
                            nameLocation: 'middle',
                            nameGap: 70,
                            min: data.data.min > low ? (low - 20) : (data.data.min - 20),
                            max: data.data.max > top ? (data.data.max + 20) : (top + 20),
                            axisLabel : {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}',
                                textStyle: {
                                    fontSize: '14'
                                }
                            }
                        }
                    ],
                    series: method.setControlChartData(data, originType, low, top)
                };
                return option;
            },
            setMapChartData: function(data, paramtype, maptype) {
                var series = [],
                    x_line,
                    result = [],
                    cityData = [
                        {name: '重庆市'},
                        {name: '北京市'},
                        {name: '东城区'},
                        {name: '天津市'},
                        {name: '上海市'},
                        {name: '香港'},
                        {name: '澳门'},
                        {name: '巴音郭楞蒙古自治州'},
                        {name: '和田地区'},
                        {name: '哈密地区'},
                        {name: '阿克苏地区'},
                        {name: '阿勒泰地区'},
                        {name: '喀什地区'},
                        {name: '塔城地区'},
                        {name: '昌吉回族自治州'},
                        {name: '克孜勒苏柯尔克孜自治州'},
                        {name: '吐鲁番地区'},
                        {name: '伊犁哈萨克自治州'},
                        {name: '博尔塔拉蒙古自治州'},
                        {name: '乌鲁木齐市'},
                        {name: '克拉玛依市'},
                        {name: '阿拉尔市'},
                        {name: '图木舒克市'},
                        {name: '五家渠市'},
                        {name: '石河子市'},
                        {name: '那曲地区'},
                        {name: '阿里地区'},
                        {name: '日喀则地区'},
                        {name: '林芝地区'},
                        {name: '昌都地区'},
                        {name: '山南地区'},
                        {name: '拉萨市'},
                        {name: '呼伦贝尔市'},
                        {name: '阿拉善盟'},
                        {name: '锡林郭勒盟'},
                        {name: '鄂尔多斯市'},
                        {name: '赤峰市'},
                        {name: '巴彦淖尔市'},
                        {name: '通辽市'},
                        {name: '乌兰察布市'},
                        {name: '兴安盟'},
                        {name: '包头市'},
                        {name: '呼和浩特市'},
                        {name: '乌海市'},
                        {name: '海西蒙古族藏族自治州'},
                        {name: '玉树藏族自治州'},
                        {name: '果洛藏族自治州'},
                        {name: '海南藏族自治州'},
                        {name: '海北藏族自治州'},
                        {name: '黄南藏族自治州'},
                        {name: '海东地区'},
                        {name: '西宁市'},
                        {name: '甘孜藏族自治州'},
                        {name: '阿坝藏族羌族自治州'},
                        {name: '凉山彝族自治州'},
                        {name: '绵阳市'},
                        {name: '达州市'},
                        {name: '广元市'},
                        {name: '雅安市'},
                        {name: '宜宾市'},
                        {name: '乐山市'},
                        {name: '南充市'},
                        {name: '巴中市'},
                        {name: '泸州市'},
                        {name: '成都市'},
                        {name: '资阳市'},
                        {name: '攀枝花市'},
                        {name: '眉山市'},
                        {name: '广安市'},
                        {name: '德阳市'},
                        {name: '内江市'},
                        {name: '遂宁市'},
                        {name: '自贡市'},
                        {name: '黑河市'},
                        {name: '大兴安岭地区'},
                        {name: '哈尔滨市'},
                        {name: '齐齐哈尔市'},
                        {name: '牡丹江市'},
                        {name: '绥化市'},
                        {name: '伊春市'},
                        {name: '佳木斯市'},
                        {name: '鸡西市'},
                        {name: '双鸭山市'},
                        {name: '大庆市'},
                        {name: '鹤岗市'},
                        {name: '七台河市'},
                        {name: '酒泉市'},
                        {name: '张掖市'},
                        {name: '甘南藏族自治州'},
                        {name: '武威市'},
                        {name: '陇南市'},
                        {name: '庆阳市'},
                        {name: '白银市'},
                        {name: '定西市'},
                        {name: '天水市'},
                        {name: '兰州市'},
                        {name: '平凉市'},
                        {name: '临夏回族自治州'},
                        {name: '金昌市'},
                        {name: '嘉峪关市'},
                        {name: '普洱市'},
                        {name: '红河哈尼族彝族自治州'},
                        {name: '文山壮族苗族自治州'},
                        {name: '曲靖市'},
                        {name: '楚雄彝族自治州'},
                        {name: '大理白族自治州'},
                        {name: '临沧市'},
                        {name: '迪庆藏族自治州'},
                        {name: '昭通市'},
                        {name: '昆明市'},
                        {name: '丽江市'},
                        {name: '西双版纳傣族自治州'},
                        {name: '保山市'},
                        {name: '玉溪市'},
                        {name: '怒江傈僳族自治州'},
                        {name: '德宏傣族景颇族自治州'},
                        {name: '百色市'},
                        {name: '河池市'},
                        {name: '桂林市'},
                        {name: '南宁市'},
                        {name: '柳州市'},
                        {name: '崇左市'},
                        {name: '来宾市'},
                        {name: '玉林市'},
                        {name: '梧州市'},
                        {name: '贺州市'},
                        {name: '钦州市'},
                        {name: '贵港市'},
                        {name: '防城港市'},
                        {name: '北海市'},
                        {name: '怀化市'},
                        {name: '永州市'},
                        {name: '邵阳市'},
                        {name: '郴州市'},
                        {name: '常德市'},
                        {name: '湘西土家族苗族自治州'},
                        {name: '衡阳市'},
                        {name: '岳阳市'},
                        {name: '益阳市'},
                        {name: '长沙市'},
                        {name: '株洲市'},
                        {name: '张家界市'},
                        {name: '娄底市'},
                        {name: '湘潭市'},
                        {name: '榆林市'},
                        {name: '延安市'},
                        {name: '汉中市'},
                        {name: '安康市'},
                        {name: '商洛市'},
                        {name: '宝鸡市'},
                        {name: '渭南市'},
                        {name: '咸阳市'},
                        {name: '西安市'},
                        {name: '铜川市'},
                        {name: '清远市'},
                        {name: '韶关市'},
                        {name: '湛江市'},
                        {name: '梅州市'},
                        {name: '河源市'},
                        {name: '肇庆市'},
                        {name: '惠州市'},
                        {name: '茂名市'},
                        {name: '江门市'},
                        {name: '阳江市'},
                        {name: '云浮市'},
                        {name: '广州市'},
                        {name: '汕尾市'},
                        {name: '揭阳市'},
                        {name: '珠海市'},
                        {name: '佛山市'},
                        {name: '潮州市'},
                        {name: '汕头市'},
                        {name: '深圳市'},
                        {name: '东莞市'},
                        {name: '中山市'},
                        {name: '延边朝鲜族自治州'},
                        {name: '吉林市'},
                        {name: '白城市'},
                        {name: '松原市'},
                        {name: '长春市'},
                        {name: '白山市'},
                        {name: '通化市'},
                        {name: '四平市'},
                        {name: '辽源市'},
                        {name: '承德市'},
                        {name: '张家口市'},
                        {name: '保定市'},
                        {name: '唐山市'},
                        {name: '沧州市'},
                        {name: '石家庄市'},
                        {name: '邢台市'},
                        {name: '邯郸市'},
                        {name: '秦皇岛市'},
                        {name: '衡水市'},
                        {name: '廊坊市',},
                        {name: '恩施土家族苗族自治州'},
                        {name: '十堰市'},
                        {name: '宜昌市'},
                        {name: '襄樊市'},
                        {name: '黄冈市'},
                        {name: '荆州市'},
                        {name: '荆门市'},
                        {name: '咸宁市'},
                        {name: '随州市'},
                        {name: '孝感市'},
                        {name: '武汉市'},
                        {name: '黄石市'},
                        {name: '神农架林区'},
                        {name: '天门市'},
                        {name: '仙桃市'},
                        {name: '潜江市'},
                        {name: '鄂州市'},
                        {name: '遵义市'},
                        {name: '黔东南苗族侗族自治州'},
                        {name: '毕节地区'},
                        {name: '黔南布依族苗族自治州'},
                        {name: '铜仁地区'},
                        {name: '黔西南布依族苗族自治州'},
                        {name: '六盘水市'},
                        {name: '安顺市'},
                        {name: '贵阳市'},
                        {name: '烟台市'},
                        {name: '临沂市'},
                        {name: '潍坊市'},
                        {name: '青岛市'},
                        {name: '菏泽市'},
                        {name: '济宁市'},
                        {name: '德州市'},
                        {name: '滨州市'},
                        {name: '聊城市'},
                        {name: '东营市'},
                        {name: '济南市'},
                        {name: '泰安市'},
                        {name: '威海市'},
                        {name: '日照市'},
                        {name: '淄博市'},
                        {name: '枣庄市'},
                        {name: '莱芜市'},
                        {name: '赣州市'},
                        {name: '吉安市'},
                        {name: '上饶市'},
                        {name: '九江市'},
                        {name: '抚州市'},
                        {name: '宜春市'},
                        {name: '南昌市'},
                        {name: '景德镇市'},
                        {name: '萍乡市'},
                        {name: '鹰潭市'},
                        {name: '新余市'},
                        {name: '南阳市'},
                        {name: '信阳市'},
                        {name: '洛阳市'},
                        {name: '驻马店市'},
                        {name: '周口市'},
                        {name: '商丘市'},
                        {name: '三门峡市'},
                        {name: '新乡市'},
                        {name: '平顶山市'},
                        {name: '郑州市'},
                        {name: '安阳市'},
                        {name: '开封市'},
                        {name: '焦作市'},
                        {name: '许昌市'},
                        {name: '濮阳市'},
                        {name: '漯河市'},
                        {name: '鹤壁市'},
                        {name: '大连市'},
                        {name: '朝阳市'},
                        {name: '丹东市'},
                        {name: '铁岭市'},
                        {name: '沈阳市'},
                        {name: '抚顺市'},
                        {name: '葫芦岛市'},
                        {name: '阜新市'},
                        {name: '锦州市'},
                        {name: '鞍山市'},
                        {name: '本溪市'},
                        {name: '营口市'},
                        {name: '辽阳市'},
                        {name: '盘锦市'},
                        {name: '忻州市'},
                        {name: '吕梁市'},
                        {name: '临汾市'},
                        {name: '晋中市'},
                        {name: '运城市'},
                        {name: '大同市'},
                        {name: '长治市'},
                        {name: '朔州市'},
                        {name: '晋城市'},
                        {name: '太原市'},
                        {name: '阳泉市'},
                        {name: '六安市'},
                        {name: '安庆市'},
                        {name: '滁州市'},
                        {name: '宣城市'},
                        {name: '阜阳市'},
                        {name: '宿州市'},
                        {name: '黄山市'},
                        {name: '巢湖市'},
                        {name: '亳州市'},
                        {name: '池州市'},
                        {name: '合肥市'},
                        {name: '蚌埠市'},
                        {name: '芜湖市'},
                        {name: '淮北市'},
                        {name: '淮南市'},
                        {name: '马鞍山市'},
                        {name: '铜陵市'},
                        {name: '南平市'},
                        {name: '三明市'},
                        {name: '龙岩市'},
                        {name: '宁德市'},
                        {name: '福州市'},
                        {name: '漳州市'},
                        {name: '泉州市'},
                        {name: '莆田市'},
                        {name: '厦门市'},
                        {name: '丽水市'},
                        {name: '杭州市'},
                        {name: '温州市'},
                        {name: '宁波市'},
                        {name: '舟山市'},
                        {name: '台州市'},
                        {name: '金华市'},
                        {name: '衢州市'},
                        {name: '绍兴市'},
                        {name: '嘉兴市'},
                        {name: '湖州市'},
                        {name: '盐城市'},
                        {name: '徐州市'},
                        {name: '南通市'},
                        {name: '淮安市'},
                        {name: '苏州市'},
                        {name: '宿迁市'},
                        {name: '连云港市'},
                        {name: '扬州市'},
                        {name: '南京市'},
                        {name: '泰州市'},
                        {name: '无锡市'},
                        {name: '常州市'},
                        {name: '镇江市'},
                        {name: '吴忠市'},
                        {name: '中卫市'},
                        {name: '固原市'},
                        {name: '银川市'},
                        {name: '石嘴山市'},
                        {name: '儋州市'},
                        {name: '文昌市'},
                        {name: '乐东黎族自治县'},
                        {name: '三亚市'},
                        {name: '琼中黎族苗族自治县'},
                        {name: '东方市'},
                        {name: '海口市'},
                        {name: '万宁市'},
                        {name: '澄迈县'},
                        {name: '白沙黎族自治县',},
                        {name: '琼海市'},
                        {name: '昌江黎族自治县'},
                        {name: '临高县'},
                        {name: '陵水黎族自治县'},
                        {name: '屯昌县'},
                        {name: '定安县'},
                        {name: '保亭黎族苗族自治县'},
                        {name: '五指山市'},
                    ],
                    values = [],
                    same;
                series = [{
                    type: options.data.type,
                    name: '数值',
                    mapType: 'china',
                    roam: false,
                    center: ['50%', '50%'],
                    mapLocation: {
                        x: 'center',
                        y: 'center'
                    },
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: []
                }];
                if (data.data.length === 0) {
                    return series;
                }
                if (options.type) {
                    _.each(data, function(value, name) {
                        if (name.length > 10) {
                            name = name.substr(0, 10) + '...';
                        }
                        if (options.type === 'combine') {
                            series[0].data.push({
                                name: name || '其它',
                                value: value[0] * 1
                            });
                        } else {
                            series[0].data.push([name, value]);
                        }
                    });

                } else {
                    x_line = method.getXline(data);
                    if (!!paramtype) { //true
                        if (paramtype === 'notchina') { //国到市
                            series[0].mapType = maptype;
                            _.each(data.sort, function(val, key) {
                                if (val.split(' ').length > 1) {
                                    if (same !== val.split(' ')[1]) {
                                        cityData.push({
                                            name: val.split(' ')[1],
                                            value: '4'
                                        });
                                    }
                                    same = val.split(' ')[1];

                                } else {
                                    _.each(data.data[val], function(cityval, key) {
                                        if (key === '北京市' || key === '上海市' || key === '重庆市' || key === '天津市') {
                                            _.each(cityval, function(spicalcity, text) {
                                                key = text;
                                                cityData.push({
                                                    name: text,
                                                    value: '5'
                                                });
                                            });
                                        }
                                        for (var c = 0; c <= cityData.length; c++) {
                                            _.each(cityData[c], function(valw) {
                                                if (valw === key) {
                                                    cityData[c].value = '6';
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            series[0].data = cityData;
                            series[0].name = data.yaxis[0];
                        } else if (paramtype === 'china') {//回到全国
                            _.each(data.yaxis, function(yaxis, ktitle) {
                                var itemData = [], matchName;
                                itemData = [
                                    {name: '北京'},
                                    {name: '天津'},
                                    {name: '上海'},
                                    {name: '重庆'},
                                    {name: '河北'},
                                    {name: '河南'},
                                    {name: '云南'},
                                    {name: '辽宁'},
                                    {name: '黑龙江'},
                                    {name: '湖南'},
                                    {name: '安徽'},
                                    {name: '山东'},
                                    {name: '新疆'},
                                    {name: '江苏'},
                                    {name: '浙江'},
                                    {name: '江西'},
                                    {name: '湖北'},
                                    {name: '广西'},
                                    {name: '甘肃'},
                                    {name: '山西'},
                                    {name: '内蒙古'},
                                    {name: '陕西'},
                                    {name: '吉林'},
                                    {name: '福建'},
                                    {name: '贵州'},
                                    {name: '广东'},
                                    {name: '青海'},
                                    {name: '西藏'},
                                    {name: '四川'},
                                    {name: '宁夏'},
                                    {name: '海南'},
                                    {name: '台湾'},
                                    {name: '香港'},
                                    {name: '澳门'}
                                ];

                                _.each(x_line, function(name) {
                                    var item = 0, i = 0, j = 0;
                                    values = _.values(data.data[name]);
                                    for (; i < values.length; i ++) {
                                        if (!_.isUndefined(values[i][ktitle])) {
                                            item += values[i][ktitle] * 1;
                                        }
                                    }
                                    matchName = name.match(/(\S*)(?=省|市|区)/);
                                    if (!_.isEmpty(matchName)) {
                                        name = matchName[1];
                                    }
                                    switch (name) {
                                        case '内蒙古自治':
                                            name = '内蒙古';
                                            break;
                                        case '广西壮族自治':
                                            name = '广西';
                                            break;
                                        case '西藏自治':
                                            name = '西藏';
                                            break;
                                        case '宁夏回族自治':
                                            name = '宁夏';
                                            break;
                                        case '新疆维吾尔自治':
                                            name = '新疆';
                                            break;
                                        case '香港特别行政':
                                            name = '香港';
                                            break;
                                        case '澳门特别行政':
                                            name = '澳门';
                                            break;
                                        default:
                                            name = name;
                                            break;
                                    }
                                    for (; j <= itemData.length; j++) {
                                        _.each(itemData[j], function(val) {
                                            if (val === name) {
                                                itemData[j].value = item;
                                            }
                                        });
                                    }
                                });
                                result.push({
                                    type: options.data.type,
                                    name: yaxis,
                                    mapType: 'china',
                                    roam: false,
                                    label: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    },
                                    data: itemData
                                });
                            });
                            series = result;
                        }
                    } else { //false
                        if (x_line.length === 1 && data.sort[0]) {
                            //以省展示
                            series[0].mapType = data.sort[0].match(/(\S*)(?=省|市)/)[1];
                            _.each(data.data[data.sort[0]], function(val, key) {
                                series[0].data.push({
                                    name: key,
                                    value: '6'
                                });
                            });
                            series[0].name = data.yaxis[0];
                        } else {
                            //以全国地图展示
                            _.each(data.yaxis, function(yaxis, ktitle) {
                                var itemData = [], matchName, samezone;

                                _.each(x_line, function(name) {
                                    var item = 0, i = 0;
                                    values = _.values(data.data[name]);
                                    for (; i < values.length; i ++) {
                                        if (!_.isUndefined(values[i][ktitle])) {
                                            item += values[i][ktitle] * 1;
                                        }
                                    }
                                    matchName = name.match(/(\S*)(?=省|市|区)/);
                                    if (!_.isEmpty(matchName)) {
                                        name = matchName[1];
                                    }
                                    switch (name) {
                                        case '内蒙古自治':
                                            name = '内蒙古';
                                            break;
                                        case '广西壮族自治':
                                            name = '广西';
                                            break;
                                        case '西藏自治':
                                            name = '西藏';
                                            break;
                                        case '宁夏回族自治':
                                            name = '宁夏';
                                            break;
                                        case '新疆维吾尔自治':
                                            name = '新疆';
                                            break;
                                        case '香港特别行政':
                                            name = '香港';
                                            break;
                                        case '澳门特别行政':
                                            name = '澳门';
                                            break;
                                        default:
                                            name = name;
                                            break;
                                    }
                                    if (samezone !== name) {
                                        itemData.push({
                                            name: name,
                                            value: item
                                        });
                                        samezone = name;
                                    }

                                });

                                result.push({
                                    type: options.data.type,
                                    name: yaxis,
                                    mapType: 'china',
                                    roam: false,
                                    label: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    },
                                    data: itemData
                                });
                            });
                            series = result;
                        }
                    }
                }
                return series;
            },
            //对数据处理（line, scatter, bar, radar, pie, circlepie, histogram, stackColumn, barchart）
            setAngleChartData: function(data, originType) {
                var keysArray,
                    series = [],
                    result = [],
                    x_line, values, xValues, combineData,
                    radarValues = [];
                series = [{
                    type: options.data.type,
                    radius : (originType === 'circlePie') ? ['50%', '60%'] : '75%',
                    center: ['50%', '55%'],
                    name: '数值',
                    data: [],
                    itemStyle: {
                        normal: {
                            color: (options.data.type !== 'pie' && options.data.type !== 'radar') ? '#4572A7' : ''
                        }
                    }
                }];
                if (options.type === 'dataSource') {
                    _.each(data.data, function(value, name) {
                        series[0].data.push({
                            name: name,
                            value: value
                        });
                    });
                } else {
                    //单应用且只有一个x轴
                    if (options.type === 'combine' ||
                        (options.config.hasOwnProperty('x') && options.config.x.length === 1)) {
                        //计算Ｘ轴　展示值
                        x_line = method.getXline(data);
                        if (originType === 'histogram') {
                            x_line = method.getHistogramXline(data);
                        }
                        _.each(x_line, function(name) {
                            var item = 0;
                            if (!_.isUndefined(data.data[name])) {
                                item = data.data[name][0] * 1;
                            } else if (name === '其它' &&
                                !_.isUndefined(data.data['']) &&
                                !_.isUndefined(data.data[''][0])
                            ) {
                                item = data.data[''][0] * 1;
                            }
                            radarValues.push(item);
                            series[0].data.push({
                                name: name,
                                value: item
                            });
                        });
                        if (options.data.type === 'radar') {
                            series[0].data = [];
                            series[0].data.push({
                                name: '数值',
                                value: radarValues
                            });
                        }
                    } else {
                        // 计算两个Ｘ轴　展示值
                        keysArray = this.getKeys(data);
                        x_line = method.getXline(data);
                        values = data.data;
                        _.each(keysArray, function(name) {
                            var itemData = [];
                            name = (name === '其它' ? '' : name);
                            _.each(x_line, function(firstKey) {
                                var item = 0;
                                if (!_.isUndefined(values[firstKey]) && !_.isUndefined(values[firstKey][name])) {
                                    item = values[firstKey][name][0] * 1;
                                } else if (firstKey === '其它' && !_.isUndefined(values[''][name])) {
                                    item = values[''][name][0] * 1;
                                }
                                itemData.push(item);
                            });

                            result.push({
                                name: name === '' ? '其它' : name,
                                stack: originType === 'stackColumn' ? keysArray[0] : '',
                                type: options.data.type,
                                data: itemData
                            });

                            //雷达图专用类型
                            series[0].data.push({
                                name: name === '' ? '其它' : name,
                                value: itemData
                            });
                        });
                        if (options.data.type !== 'radar') {
                            series = result;
                        }
                    }
                }

                return series;
            },
            setScatterChartData: function(data) {
                var keysArray,
                    series = [],
                    result = [],
                    itemData = [],
                    xValues = data.data,
                    i = 0,
                    index = 2,
                    x_line;
                if (xValues.length === 0) {
                    return series.push({
                        name: '数值',
                        type: options.data.type,
                        data: []
                    });
                }
                if (options.type === 'dataSource') {
                    _.each(data, function(value, name) {
                        series[0].data.push([name, value]);
                    });
                } else if (options.type === 'combine') {
                    x_line = method.getXline(data);
                    _.each(x_line, function(name) {
                        var item = 0;

                        if (!_.isUndefined(xValues[name])) {
                            item = xValues[name][0] * 1;
                        } else if (name === '其它') {
                            item = xValues[''][0] * 1;
                        }
                        itemData.push([name, item]);
                    });

                    series.push({
                        name: '数值',
                        type: options.data.type,
                        data: itemData
                    });
                } else {
                    if (options.config.x.length === 1) {
                        //单应用且只有一个x轴　且有两个Ｙ轴
                        //计算Ｘ轴　展示值
                        x_line = method.getXline(data);
                        for (; i < index; i ++) {
                            itemData = [];
                            _.each(x_line, function(name) {
                                var item = 0;

                                if (!_.isUndefined(xValues[name])) {
                                    item = xValues[name][i] * 1;
                                } else if (name === '其它') {
                                    item = xValues[''][i] * 1;
                                }
                                itemData.push([name, item]);
                            });
                            if (_.isUndefined(options.config.y[i])) {
                                break;
                            }
                            result.push({
                                type: options.data.type,
                                name: data.yaxis[i],
                                data: itemData
                            });
                        }
                        series = result;
                    } else {
                        // x轴为０，y轴两个
                        keysArray = this.getKeys(data);
                        itemData = [];
                        _.each(xValues, function(val, firstKey) {
                            var item = 0;
                            if (!_.isUndefined(xValues[firstKey])) {
                                item = xValues[firstKey][0] * 1;
                            }
                            itemData.push([firstKey * 1, item]);
                        });

                        series.push({
                            name: '数值',
                            type: options.data.type,
                            data: itemData
                        });
                    }
                }
                return series;
            },
            setControlChartData: function(data, originType, low, top) {
                var series = [], x_line, values = [];
                series = [
                    {
                        type: options.data.type,
                        name: '',
                        data: [],
                        markLine : {
                            data : [
                                {type : 'average', name: '理想状态', itemStyle: {normal: {color: '#457200'}}},
                                {
                                    yAxis: parseInt(top, 10),
                                    name: '上限（UCL）',
                                    itemStyle: {
                                        normal: {
                                            color: '#dc143c',
                                            lineStyle: {
                                                type : 'dashed',
                                                width : 2
                                            }
                                        }
                                    }
                                },
                                {
                                    yAxis: parseInt(low, 10),
                                    name: '下限（LCL）',
                                    itemStyle: {
                                        normal: {
                                            color: '#dc143c',
                                            lineStyle: {
                                                type : 'dashed',
                                                width : 2
                                            }
                                        }
                                    }
                                }
                            ],
                            lable: {
                                normal: {
                                    formatter: '{b}: {d}'
                                }
                            }
                        },
                        markPoint: {
                            clickable: false
                        },
                        itemStyle: {
                            normal: {
                                color: '#4572A7'
                            }
                        }
                    }
                ];
                if (options.type === 'dataSource') {
                    _.each(data, function(value, name) {
                        series[0].data.push([name, value]);
                    });
                } else {
                    //单应用且只有一个x轴
                    x_line = method.getXline(data);
                    values = data.data.data ? data.data.data : data.data;
                    _.each(x_line, function(name) {
                        var item = 0;
                        if (!_.isUndefined(values[name])) {
                            item = values[name][0] * 1;
                        } else if (name === '其它') {
                            item = values[''][0] * 1;
                        }
                        series[0].data.push({
                            name: name,
                            value: item
                        });
                    });
                }

                return series;
            },
            getDataRange: function() {
                var min, max, dataRange,
                    target = method.target[1];

                if (_.isEmpty(target) || _.isEmpty(target.minValue) || _.isEmpty(target.maxValue)) {
                    return;
                }

                dataRange = {
                    x: 'left',
                    y: '70%',
                    selectedMode: false,
                    splitList: [],
                    itemGap: 10,
                    color: ['#C23531', '#DD883C', '#91C7AE']
                };
                min = parseInt(target.minValue, 10);
                max = parseInt(target.maxValue, 10);
                dataRange.splitList.push(
                    {start: max},
                    {start: min, end: max},
                    {end: min}
                );
                return dataRange;
            },
            getHistogramXline: function(data) {
                var x_line = [];
                _.each(data.data, function(value, key) {
                    x_line.push($.trim(key) || '其它');
                });
                return !_.isEmpty(x_line) ? x_line : ['无数据'];
            },
            //获取x轴底部单位标题
            getXline: function(data) {
                var week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    x_line = [],
                    weekTarget = [],
                    result;
                _.each(data.sort, function(value) {
                    x_line.push($.trim(value) || '其它');
                });

                //判断是否为星期分类
                _.each(week, function(value) {
                    _.find(x_line, function(day) {
                        if (value === day) {
                            weekTarget.push(value);
                        }
                    });
                });
                return !_.isEmpty(weekTarget) ? weekTarget : (!_.isEmpty(x_line) ? x_line : ['无数据']);
            },
            //获取雷达图的Ｘ轴极坐标
            getRadarXline: function(data) {
                var x_line, Newx_line = [], i = 0, max = 0, series = [];
                x_line = method.getXline(data);

                series = method.setAngleChartData(data);

                _.each(x_line, function(value, i) {
                    max = 0;
                    _.each(series[0]['data'], function(item) {
                        max = max > item.value[i] ? max : item.value[i];
                    });

                    Newx_line.push({text: value, max: max});

                });

                return Newx_line;
            },
            dealWIthKeys: function(collection) {
                var keys = [];

                _.each(collection, function(value) {
                    keys.push($.trim(value) || '其它');
                });

                return keys;
            },

            getXlineTitle: function() {
                var xTitle = [],
                    result;

                if (options.data.type === 'pie') {
                    return;
                }

                if (options.type === 'combine') {
                    xTitle = _.map(options.xtitle, function(item) {
                        return method.getConditionTitle(item);
                    });
                    if (options.data.type === 'table') {
                        result = xTitle;
                    } else {
                        result = xTitle[0];
                    }
                } else {
                    result = method.getAppXlineTitle();
                }

                return result;
            },
            //获取单应用x轴总标题
            getAppXlineTitle: function() {
                var title = '',
                    typeTitle;

                if (options.config.x.length > 0) {
                    title = this.getTitle(options.config.x[method.index].field);
                    typeTitle = this.getTypeTitle(options.config.x[method.index].type);
                    if (typeTitle) {
                        title = title + '(' + typeTitle + ')';
                    }
                }
                return title;
            },
            //获取表名
            getTitle: function(field) {
                var dataArray = field.split('-'),
                    tableId = dataArray[0],
                    fieldId = dataArray[1],
                    title;

                if (!_.has(this.datatable, tableId)) {
                    this.getTable(tableId);
                }

                if (fieldId === 'id') {
                    title = this.datatable[tableId].title;
                } else {
                    title = this.datatable[tableId].schema[fieldId].title;
                }

                return title;
            },
            getTable: function(tableId) {
                this.datatable[tableId] = Common.getTable(tableId);
            },
            //获取表后的类型
            getTypeTitle: function(type) {
                var title = '总数';
                switch (type) {
                    case 'SUM':
                        title = '总和';
                        break;
                    case 'AVG':
                        title = '平均数';
                        break;
                    case 'MIN':
                        title = '最小值';
                        break;
                    case 'MAX':
                        title = '最大值';
                        break;
                    case 'YEAR':
                        title = '年';
                        break;
                    case 'QUARTER':
                        title = '季度';
                        break;
                    case 'MONTH':
                        title = '月';
                        break;
                    case 'WEEKDAY':
                        title = '周';
                        break;
                    case 'DAYOFMONTH':
                        title = '日';
                        break;
                    case 'HOUR':
                        title = '时';
                        break;
                    case 'BASIC':
                        title = '';
                        break;
                    default:
                        break;
                }
                return title;
            },
            getConditionTitle: function(str) {
                var fields = {},
                    parts,
                    labelId,
                    maxLen,
                    maxLenKey,
                    index = 1;

                _.each(_.union(str.match(/`(.*?)`/g)), function(item) {
                    parts = item.match(/`(.*?)\[(.*?)\]`/);
                    if (parts.length === 3) {
                        labelId = parts[1] + index;
                        if (typeof fields[labelId] === 'undefined') {
                            fields[labelId]   = [];
                        }
                        fields[labelId].push(parts[2]);
                        index++;
                    }
                });
                maxLen = 0;
                maxLenKey = '';
                _.each(fields, function(xs, labelId) {
                    if (xs.length > maxLen) {
                        maxLenKey = labelId;
                        maxLen = xs.length;
                    }
                });

                return fields[maxLenKey];
            },
            //获取y轴总标题
            getYlineTitle: function() {
                var result;

                if (options.data.type === 'pie') {
                    return;
                }

                if (options.type === 'combine') {
                    result = _.map(options.ytitle, function(item) {
                        var symbol = ['+', '-', '*', '/'],
                            express = item.match(/\[(.*?)\]|\+|\-|\*|\//g).join('').replace(/\[|\]/g, '');

                        return $.inArray(express[express.length - 1], symbol) === -1 ? express :
                            express.substr(0, express.length - 1);
                    });
                    if (options.data.type !== 'table') {
                        result = result[0];
                    }
                } else {
                    result = method.getTitle(options.config.y[0].field);
                }
                return result;
            },
            getKeys: function(data) {
                var week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    weekTarget = [],
                    keys = {};

                if (!_.isUndefined(data.callout) && data.callout.length === 1 && data.callout[0] === 0) {
                    return ['数值'];
                }
                _.each(data.callout, function(item, key) {
                    if (item === '') {
                        item = '其它';
                    }
                    if (key !== 'length') {
                        keys[item] = true;
                    }
                });

                _.each(week, function(value) {
                    _.find(keys, function(day, key) {
                        if (value === key) {
                            weekTarget.push(value);
                        }
                    });
                });

                if (!_.isEmpty(weekTarget)) {
                    return weekTarget;
                }
                return _.keys(keys).sort(function(a, b) {
                    a = a.length === 1 ? '0' + a : a;
                    b = b.length === 1 ? '0' + b : b;

                    return a - b;
                });
            },
            //获取目标值
            getTargetText: function() {
                var target = method.target[1],
                    text;
                if (_.isEmpty(target) || _.isEmpty(target.minValue) || _.isEmpty(target.maxValue)) {
                    return;
                }

                text = '报警值:' + '\n最小值为' + target.minValue + '\n最大值为' + target.maxValue;
                return text;
            },

            getHtmlInfo: function(data, isRoot, tdWidth) {
                var _this = this,
                    rows = [],
                    count = 0;
                if (_.isArray(data)) {
                    rows.push(
                        _.map(data, function(item) {
                            return '<td width="' + tdWidth + '" style="text-align:center">' + item + '</td>';
                        }).join('')
                    );
                    return {
                        rows: rows,
                        count: 1
                    };
                }

                _.each(data, function(children, thisValue) {
                    var htmlInfo = _this.getHtmlInfo(children);

                    htmlInfo.rows[0] = '<td width="' + tdWidth + '" style="text-align:center" rowspan="' +
                        htmlInfo.count + '">' + thisValue + '</td>' + htmlInfo.rows[0];

                    rows = rows.concat(htmlInfo.rows);
                    count += htmlInfo.count;
                });

                return {
                    rows: rows,
                    count: count
                };
            },
            formChart: function(data) {
                var titleList = [],
                    xTitles = [],
                    yTitles = [];
                _.each(options.config.x, function(item, key) {
                    titleList.push({
                        title: data.xaxis[key],
                        field: item.field,
                        type: item.type
                    });
                    xTitles.push({
                        title: data.xaxis[key],
                        field: item.field,
                        type: item.type
                    });
                    method.index++;
                });
                _.each(options.config.y, function(item) {
                    titleList.push({
                        title: method.getTitle(item.field) + '的' + method.getTypeTitle(item.type),
                        field: item.field,
                        type: item.type
                    });
                    yTitles.push({
                        title: method.getTitle(item.field) + '的' + method.getTypeTitle(item.type),
                        field: item.field,
                        type: item.type
                    });
                });

                //添加同比环比数据
                if (method.formIncYoY === 'YoY' || method.formIncMoM === 'MoM') {
                    method.addFormTitleList(titleList, yTitles, data);
                }

                return $(self).reportTable({
                    title: _.has(options.config, 'title') ? options.config.title : '',
                    titles: titleList,
                    xTitles: xTitles,
                    yTitles: yTitles,
                    data: data.data,
                    target: method.target,
                    clickCbf: options.callback,
                    isAppTab: options.config.isAppTab ? true : false
                });
            },

            formTableChart: function(data) {
                var titleList = [], xtitle, ytitle,
                    xTitles = [],
                    yTitles = [];

                xtitle = method.getXlineTitle();
                ytitle = method.getYlineTitle();
                if (xtitle[0] !== undefined) {
                    _.each(_.union(data.xaxis, data.yaxis), function(value) {
                        titleList.push({
                            title: value,
                            field: 'x',
                            type: 'x'
                        });
                    });
                    _.each(data.xaxis, function(value) {
                        xTitles.push({
                            title: value,
                            field: 'x',
                            type: 'x'
                        });
                    });
                    _.each(data.yaxis, function(value) {
                        yTitles.push({
                            title: value,
                            field: 'x',
                            type: 'x'
                        });
                    });
                }

                return $(self).reportTable({
                    title: _.has(options.config, 'title') ? options.config.title : '',
                    titles: titleList,
                    data: data.data,
                    xTitles: xTitles,
                    yTitles: yTitles,
                    target: method.target,
                    clickCbf: options.callback
                });
            },
            translateSymbol: function(symbol) {
                switch (symbol) {
                    case '>=':
                        symbol = '不低于';
                        break;
                    case '<=':
                        symbol = '不超过';
                        break;
                    case '>':
                        symbol = '超过';
                        break;
                    case '<':
                        symbol = '低于';
                        break;
                }
                return symbol;
            },
            //渲染同比环比数据
            renderIncreasingData: function(option) {
                option.yAxis = option.yAxis.concat({
                    axisLine: {
                        show: false
                    },
                    splitLine: {show: false},
                    type: 'value',
                    name: '环比增长率',
                    nameLocation: 'middle',
                    position: 'right',
                    nameGap: '50',
                    nameTextStyle: {
                        fontSize: '12',
                        color: '#89A54E',
                        fontWeight: 'bolder'
                    },
                    boundaryGap: ['20%', '20%'],
                    axisLabel : {
                        show: true,
                        interval: 'auto',
                        formatter: '{value}%',
                        textStyle: {
                            color: '#89A54E'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                });

                option.series = option.series.concat({
                    name: '环比增长率',
                    color: '#89A54E',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    data: method.dealMoMdata(option.series[0].data),
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dashed'
                            },
                            color: '#89A54E'
                        }
                    }
                });

                option.legend.data = option.legend.data.concat('环比增长率');

                if (method.xIncType === 'QUARTER' || method.xIncType === 'MONTH') {
                    option.yAxis = option.yAxis.concat({
                        axisLine: {
                            show: false
                        },
                        splitLine: {show: false},
                        type: 'value',
                        name: '同比增长率',
                        nameLocation: 'middle',
                        nameGap: '50',
                        nameTextStyle: {
                            fontSize: '12',
                            color: '#AA4643',
                            fontWeight: 'bolder'
                        },
                        boundaryGap: ['20%', '20%'],
                        offset: 60,
                        position: 'right',
                        axisLabel : {
                            show: true,
                            interval: 'auto',
                            formatter: '{value}%',
                            textStyle: {
                                fontSize: '12',
                                color: '#AA4643'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    });

                    option.series = option.series.concat({
                        name: '同比增长率',
                        type: 'line',
                        color: '#AA4643',
                        data: method.dealYoYdata(option.series[0].data),
                        yAxisIndex: 2,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#AA4643'
                            }
                        }
                    });
                    option.legend.data = option.legend.data.concat('同比增长率');
                }
                option.tooltip = {
                    trigger: 'axis',
                    confine: true,
                    formatter: function(params) {
                        var res = params[0].name + '<br/>';
                        for (i = 0; i < params.length; i++) {
                            if (i === 0) {
                                res += params[i].seriesName + ' : ' + params[i].value + '</br>';
                            } else {
                                res += params[i].seriesName + ' : ' + params[i].value + '%</br>';
                            }
                        }
                        return res;
                    },
                    axisPointer: {
                        show: true,
                        type: 'line',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    }
                };
                return option;
            },
            //计算图形环比增长
            dealMoMdata: function(data) {
                var result = [],
                    item;

                for (i = 0; i < data.length - 1; i++) {
                    item = (data[i + 1]['value'] === data[i]['value']) ?
                        0 : (data[i + 1]['value'] - data[i]['value']) / data[i]['value'] * 100;
                    item = Number(parseInt(item * 100, 10)) / 100;
                    result.push(item);
                }
                result.unshift(0);

                return result;
            },
            //计算图形同比增长
            dealYoYdata: function(data) {
                var result = [],
                    item;
                for (i = 0; i < data.length; i++) {
                    item = 100;

                    for (j = i - 1; j >= 0; j--) {
                        preYear = data[j]['name'].split('-')[0] * 1;
                        preSecond = data[j]['name'].split('-')[1] * 1;
                        currentYear = data[i]['name'].split('-')[0] * 1;
                        currentSecond = data[i]['name'].split('-')[1] * 1;

                        if (preYear + 1 === currentYear && preSecond === currentSecond) {
                            item = (data[i]['value'] - data[j]['value']) / data[j]['value'] * 100;
                            item = Number(parseInt(item * 100, 10)) / 100;
                            break;
                        }
                    }
                    result.push(item);
                }
                return result;
            },
            //增加同比、环比表格标题
            addFormTitleList: function(data, yTitles, originData) {
                var yaxis = originData.yaxis;

                if (yaxis.indexOf('同比增长率') !== -1 && method.formIncYoY === 'YoY') {
                    data.push({
                        title: '同比增长率'
                    });
                    yTitles.push({
                        title: '同比增长率'
                    });
                }
                if (yaxis.indexOf('环比增长率') !== -1 && method.formIncMoM === 'MoM') {
                    data.push({
                        title: '环比增长率'
                    });
                    yTitles.push({
                        title: '环比增长率'
                    });
                }
            },
            //还原数据格式
            regainMapData: function(dataMap, xFields) {
                var _this = this,
                    result = {},
                    pValue = result,
                    maxIndex = _.size(xFields) - 1;

                _.each(dataMap, function(itemData) {
                    pValue = result;
                    _.each(xFields, function(fieldId, index) {
                        var value = itemData[fieldId];
                        if (typeof pValue[value] === 'undefined') {
                            if (maxIndex !== index) {
                                pValue[value] = {};
                            } else {
                                pValue[value] = itemData.YFields;
                            }
                        }
                        pValue = pValue[value];
                    });
                });
                return result;
            },
            //拆分数据为可计算格式
            transFormData: function(data, groups, parents, result) {
                groups = _.clone(groups);
                var _this = this,
                    fieldKey = groups.shift(),
                    values,
                    valueKey;

                if (typeof parents === 'undefined') {
                    parents = [];
                }

                if (typeof result === 'undefined') {
                    result = {};
                }

                if (!_.isArray(data)) {
                    _.each(data, function(values, keyValue) {
                        var parent = _.clone(parents);

                        parent.push({
                            key: fieldKey,
                            value: keyValue
                        });
                        _this.transFormData(values, groups, parent, result);
                    });
                } else {
                    values = {
                        YFields: data
                    };
                    valueKey = _.map(parents, function(item) {
                        values[item.key] = item.value;

                        return item.value;
                    }).join('_');

                    result[valueKey] = values;
                }

                return result;
            },

            //计算仪表盘同比数据
            dealCombineFormYoY: function(data) {
                var YoY;
                if (method.formIncYoY !== 'YoY') {
                    return data;
                }
                _.each(data, function(value, key) {
                    var dateArr = key.split('-');
                    if (dateArr.length === 1) {
                        YoY = '-';
                    } else {
                        dateArr[0] = dateArr[0] - 1;
                        dateArr = dateArr.join('-');
                        if (data[dateArr]) {
                            YoY = (value[0] - data[dateArr][0]) / data[dateArr][0] * 100;
                            YoY = Number(parseInt(YoY * 100, 10)) / 100 + '%';
                        } else {
                            YoY = '-';
                        }
                    }
                    value.push(YoY);
                });
                return data;
            },
            //计算仪表盘环比数据
            dealCombineFormMoM: function(data) {
                var MoM,
                    monOfDateType = ['02', '04', '06', '09', '11'];

                if (method.formIncMoM !== 'MoM') {
                    return data;
                }
                _.each(data, function(value, key) {
                    var curDate = key.split('-'),
                        preDate;

                    if (curDate.length === 1) {
                        if (curDate[0].length === 4) {
                            preDate = curDate[0] - 1;
                        } else {
                            preDate = '';
                        }
                    } else if (curDate.length === 2) {
                        //年-季度
                        if (curDate[1].length === 1) {
                            if (curDate[1] === '1') {
                                curDate[0] = curDate[0] - 1;
                                curDate[1] = '4';
                            } else {
                                curDate[1] = curDate[1] - 1;
                            }
                        } else {
                            //年-月
                            if (curDate[1] - 1 === 0) {
                                curDate[0] = curDate[0] - 1;
                                curDate[1] = '12';
                            } else if (curDate[1] - 1 > 0 && curDate[1] - 1 < 10) {
                                curDate[1] = '0' + curDate[1] - 1;
                            } else {
                                curDate[1] = curDate[1] - 1;
                            }
                        }
                        preDate = curDate.join('-');
                    } else {
                        //年-月-日
                        if (curDate[2] === '01') {
                            if (curDate[1] === '01') {
                                preDate = (curDate[0] - 1) + '-12-31';
                            } else if (curDate[1] === '03') {
                                if (curDate[0] % 4 === 0) {
                                    preDate = curDate[0] + '-' + (curDate[1] - 1) + '29';
                                } else {
                                    preDate = curDate[0] + '-' + (curDate[1] - 1) + '28';
                                }
                            } else if (_.contains(monOfDateType, curDate[1])) {
                                preDate = curDate[0] + '-' + (curDate[1] - 1) + '31';
                            } else {
                                preDate = curDate[0] + '-' + (curDate[1] - 1) + '30';
                            }
                        } else if (curDate[2] - 1 > 0 && curDate[2] - 1 < 10) {
                            preDate = curDate[0] + '-' + curDate[1] + '-0' +  (curDate[2] - 1);
                        } else {
                            preDate = curDate[0] + '-' + curDate[1] + '-' + (curDate[2] - 1);
                        }
                    }
                    if (preDate && data[preDate]) {
                        MoM = (value[0] - data[preDate][0]) / data[preDate][0] * 100;
                        MoM = Number(parseInt(MoM * 100, 10)) / 100 + '%';
                    } else {
                        MoM = '-';
                    }
                    value.push(MoM);
                });

                return data;
            }
        };
        function addEvent() {
            self.delegate('.saveTotal', 'click', function() {
                $.ajax({
                    url: url,
                    type: 'post',
                    data: {
                        name: '总值图',
                        tangle: $(self).find('.tangle').html(),
                        gaugeData: method.gaugeData,
                        title: method.title.text
                    },
                    dataType: 'json',
                    success: function(obJson) {
                        if (obJson.status === 200) {
                            window.open(
                                url + '?fileName=' + obJson.fileName + '&filePath=' + obJson.filePath
                            );
                        }
                    }
                });
            });
        }
        return method.init();
    };
    $.fn.getOption = function() {
        return getOption;
    };
})(jQuery);
