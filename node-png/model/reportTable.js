var reportTable = {
    init: function($, _) {
        $.fn.reportTable = function(conf) {
            var $self = this,
                confDefs = {
                    fontSize: 14,
                    titles: [],
                    data: {}, //map data
                    target: {},
                    rowHeight: 30,
                    clickCbf: function() {
                    }
                },
                tdTpl = _.template(
                  '<rect tid="<%=tid%>" ftitle="<%-ftitle%>" x="<%=x%>" y="<%=y%>" height="<%=h%>" width="<%=colW%>" ' +
                    'style="<%=tdStyle%>"/>' +
                   '<circle cx="<%=x+colW*0.75%>" cy="<%=y+h*0.5%>" r="6" stroke="<%=circleColor%>" stroke-width="1" ' +
                    'fill="<%=circleColor%>"/>' +
                    '<% if(!_.isArray(text)) { %>' +
                   '<text tid="<%=tid%>" ftitle="<%-ftitle%>" x="<%=colW/2+x%>" y="<%=h/2+y+fontH%>" font-size="14" ' +
                        'style="<%=tStyle%>"><%-text%></text>' +
                    '<% } else { %>' +
                        '<text tid="<%=tid%>" ftitle="<%-ftitle%>" x="<%=colW/2+x%>" y="<%=h/2+y+fontH-8%>"' +
                        'font-size="14" ' +
                        'style="<%=tStyle%>"><%-text[0]%></text>' +
                        '<text tid="<%=tid%>" ftitle="<%-ftitle%>" x="<%=colW/2+x%>" y="<%=h/2+y+fontH*2-2%>"' +
                        'font-size="14" ' +
                        'style="<%=tStyle%>"><%-text[1]%></text>' +
                    '<% } %>'
                ),
                funcs = {},
                canvas = '',
                tds = [],
                total = [],
                firstCol = [],
                firstColVal = '',
                firstCols = _.keys(conf.data),
                svg = '';
    

                tdDefs = {
                    tdStyle: 'fill:#fff;stroke:#ebeaee;stroke-width:1;',
                    tStyle: 'text-anchor:middle;fill:#8d97b8;'
                };
            conf = $.extend(confDefs, conf);
            tdDefs.fontH = conf.fontSize / 2;
    
            funcs.renderTd = function(posSize, text, opts, tid, cursor, ftitle, circleColor) {
                var tplData = _.extend(_.clone(tdDefs), posSize, {tid: tid, text: text, ftitle: ftitle});

                if (!circleColor) {
                    circleColor = '#fff';
                }
                if (!_.isUndefined(tplData)) {
                    _.each(opts, function(value, key) {
                        tplData[key] = value;
                        circleColor = '#f5f8fa';
                    });
                }
                if (cursor) {
                    tplData.tdStyle += 'cursor:pointer;';
                    tplData.tStyle += 'cursor:pointer';
                }
                tplData['circleColor'] = circleColor;
                canvas += tdTpl(tplData);
            };
    
            funcs.renderTitle = function(title, y) {
                if (_.isEmpty(title)) {
                    title = '    ';
                }
                
                var titleSize = 20,
                    titleHeight = titleSize + 40;
    
                if (!conf.isAppTab) {
                    y += titleHeight;
                }
    
                return y;
            };
    
            funcs.renderTitles = function(titles, x, y) {
                var maxLength;
    
                switch (conf.titles.length) {
                    case 1:
                        maxLength = 47;
                        break;
                    case 2:
                        maxLength = 23;
                        break;
                    case 3:
                        maxLength = 15;
                        break;
                    case 4:
                        maxLength = 11;
                        break;
                    case 5:
                        maxLength = 8;
                        break;
                    case 6:
                        maxLength = 6;
                        break;
                    default:
                        maxLength = 4;
                        break;
                }
    
                _.each(titles, function(title) {
                    var ftitle = title.title;
    
                    if (_.isArray(ftitle) && maxLength <= 6) {
                        ftitle = ftitle[0].substr(0, 4) + '...';
                    } else if (_.isString(ftitle) && ftitle.length > maxLength) {
                        ftitle = ftitle.substr(0, maxLength) + '...';
                    }

                    funcs.renderTd(
                        {x: x, y: y, h: conf.rowHeight},
                        ftitle,
                        {
                            tdStyle: 'fill:#f5f8fa;stroke:#ebeaee;stroke-width:1;',
                            tStyle: 'text-anchor:middle;fill:#6dc1f7;'
                        },
                        false,
                        '',
                        title.title
                    );
                    x += tdDefs.colW;
                });
                return y + conf.rowHeight;
            };
    
            funcs.renderData = function(data, x, y, parentId, firstColValue) {
                var _this = this,
                    baseX = x, circleColor = '',
                    count = 0, ftitle, maxLength,
                    childX = x + tdDefs.colW;
    
                switch (conf.titles.length) {
                    case 1:
                        maxLength = 47;
                        break;
                    case 2:
                        maxLength = 23;
                        break;
                    case 3:
                        maxLength = 15;
                        break;
                    case 4:
                        maxLength = 11;
                        break;
                    case 5:
                        maxLength = 8;
                        break;
                    case 6:
                        maxLength = 6;
                        break;
                    default:
                        maxLength = 4;
                        break;
                }
    
                if (_.isArray(data)) {
                    _.each(data, function(tdValue, key) {
    
                        if (conf.yTitles[key] && conf.yTitles[key]['title']) {
                            total['x'][conf.yTitles[key]['title']] = x;
                            total[conf.yTitles[key]['title']] += tdValue;
                        }
    
                        if (firstColValue && conf.yTitles[key] && conf.yTitles[key]['title']) {
                            firstCol[firstColValue][[conf.yTitles[key]['title']]] += tdValue;
                        }
    
                        ftitle = tdValue;
                        if (_.isString(tdValue) && tdValue.length > maxLength) {
                            if (funcs.chineseLength(tdValue) > 3) {
                                ftitle = tdValue.substr(0, maxLength) + '...';
                            } else if (tdValue.length > 7 && maxLength === 4) {
                                ftitle = tdValue.substr(0, 7) + '...';
                            }
                        }
    
                        if (conf.target[key + 1] && conf.target[key + 1]['minValue'] && conf.target[key + 1]['maxValue']) {
                            if (tdValue * 1 < conf.target[key + 1]['minValue']) {
                                circleColor = '#91C7AE';
                            } else if (tdValue * 1 > conf.target[key + 1]['maxValue']) {
                                circleColor = '#C23531';
                            } else {
                                circleColor = '#DD883C';
                            }
                            funcs.renderTd(
                                {x: x, y: y, h: conf.rowHeight},
                                ftitle,
                                false,
                                false,
                                '',
                                tdValue,
                                circleColor
                            );
                        } else {
                            funcs.renderTd({x: x, y: y, h: conf.rowHeight}, ftitle, false, false, '', tdValue);
                        }
                        x += tdDefs.colW;
                    });
                    return 1;
                }
    
                _.each(data, function(children, thisValue) {
                    var _count = 0,
                        tdInfo = {
                            tid: tds.length,
                            value: thisValue,
                            children: [],
                            parentId: parentId
                        };
    
                    if (!thisValue) {
                        thisValue = '-';
                    }
                    ftitle = thisValue;
    
                    if (_.isString(thisValue) && thisValue.length > maxLength) {
                        if (funcs.chineseLength(thisValue) > 3) {
                            ftitle = thisValue.substr(0, maxLength) + '...';
                        } else if (thisValue.length > 7 && maxLength === 4) {
                            ftitle = thisValue.substr(0, 7) + '...';
                        }
                    }
    
                    tds.push(tdInfo);
                    if (!_.isUndefined(parentId)) {
                        tds[parentId].children.push(tdInfo);
                    }
    
                    if (_.indexOf(firstCols, thisValue) !== -1) {
                        firstColVal = thisValue;
                    }
    
                    _count = _this.renderData(children, childX, y, tdInfo.tid, firstColVal);
    
                    if (typeof parentId === 'undefined' && _count >= 2 && conf.xTitles.length > 1) {
                        //只在第二列显示小计
                        funcs.getlittleSumValues(x + tdDefs.colW, y + _count * conf.rowHeight, children);
                        _count += 1;
                    }
    
                    _this.renderTd({x: baseX, y: y, h: _count * conf.rowHeight}, ftitle, {}, tdInfo.tid, true, thisValue);
                    y += _count * conf.rowHeight;
                    count += _count;
                });
    
                return count;
            };
    
            funcs.mapToArray = function(map, baseRow) {
                if (typeof baseRow === 'undefined') {
                    baseRow = [];
                }
    
                var data = [];
                _.each(map, function(children, item) {
                    var row = baseRow.concat([item]);
                    if (_.isArray(children)) {
                        data.push(row.concat(children));
                    } else {
                        data = data.concat(
                            funcs.mapToArray(children, row, data)
                        );
                    }
                });
    
                return data;
            };
    
            //总计
            funcs.getTotalValues = function(yTotal) {
                var x = 2;
                _.each(conf.yTitles, function(item) {
                    var xTotal = total['x'][item.title] || 2,
                    tdValue = Number(total[item.title]).toFixed(2);
                    if (xTotal === 2) {
                        tdValue = '总计';
                    }
                    if (item.title === '同比增长率' || item.title === '环比增长率') {
                        tdValue = '-';
                    }
                    funcs.renderTd({x: xTotal, y: yTotal, h: conf.rowHeight}, tdValue, false, false, '', tdValue);
                });
    
                _.each(conf.xTitles, function(item, key) {
                    var tdValue = '';
                    if (key === 0) {
                        tdValue = '总计';
                        funcs.renderTd({x: x, y: yTotal, h: conf.rowHeight}, tdValue, false, false, '', tdValue);
                        x += tdDefs.colW;
                    } else {
                        tdValue = '-';
                        funcs.renderTd({x: x, y: yTotal, h: conf.rowHeight}, tdValue, false, false, '', tdValue);
                        x += tdDefs.colW;
                    }
                });
            };
    
            //小计
            funcs.getlittleSumValues = function(x, y, data) {
                var tdValue = '小计',
                    titles = conf.xTitles.concat(conf.yTitles);
    
                titles = titles.slice(2, titles.length);
                data = funcs.mapToArray(data);
    
                funcs.renderTd({x: x, y: y, h: conf.rowHeight}, tdValue, false, false, '', tdValue);
                x += tdDefs.colW;
    
                _.each(titles, function(item, index) {
                    var dIndex = index + 1;
                    tdValue = '-';
    
                    switch (item.type) {
                        case 'COUNT':
                        case 'SUM':
                            tdValue = _.reduce(
                                data,
                                function(memo, row) {
                                    return memo + 1 * row[dIndex];
                                },
                                0
                            );
                            tdValue = Number(tdValue).toFixed(2);
                            break;
    
                        case 'MAX':
                            tdValue = _.reduce(
                                data,
                                function(memo, row) {
                                    return _.max([memo, row[dIndex]]);
                                },
                                0
                            );
                            tdValue = Number(tdValue).toFixed(2);
                            break;
    
                        case 'MIN':
                            tdValue = _.reduce(
                                data,
                                function(memo, row) {
                                    return _.min([memo, row[dIndex]]);
                                },
                                0
                            );
                            tdValue = Number(tdValue).toFixed(2);
                            break;
                        default:
                    }
    
                    funcs.renderTd(
                        {x: x + tdDefs.colW * index, y: y, h: conf.rowHeight}, tdValue, false, false, '', tdValue
                    );
                });
            };
    
            funcs.render = function() {
                var x = 2,
                    y = 1,
                    yTotal = 0,
                    count = 1,
                    width;
                _.each(conf.yTitles, function(title) {
                    total['x'] = [];
                    total[title.title] = 0;
                });
    
                _.each(firstCols, function(key) {
                    firstCol[key] = [];
                    _.each(conf.yTitles, function(title) {
                        firstCol[key][title.title] = 0;
                    });
                });
    
                tdDefs.colW = ($self.width() - 1) / conf.titles.length - 2;
                tdDefs.colW = tdDefs.colW < 65 ? 200 : tdDefs.colW;
                width = (tdDefs.colW + 2) * conf.titles.length;
    
                canvas = '';
                tds = [];
                svg = '';
    
                y = funcs.renderTitle(conf.title, y);
                y = funcs.renderTitles(conf.titles, x, y);
                count += funcs.renderData(conf.data, x, y);
    
                yTotal = (count - 1) * conf.rowHeight + y;
                if (conf.data.length !== 0) {
                    funcs.getTotalValues(yTotal);
                }
    
                svg = '<svg width="' + width + '" height="' + (count * conf.rowHeight + y) + '">' +
                    '<defs><style></style></defs>' +
                        canvas +
                    '</svg>';
    
                // if (navigator.userAgent.indexOf('MSIE') <= 0 || navigator.userAgent.indexOf('MSIE 8.0') <= 0) {
                    $self.html(svg);
                // }
    
                return svg;
            };
    
            funcs.getParentsValues = function(tid) {
                var _this = this,
                    tdInfo = tds[tid],
                    values = [tdInfo];
    
                if (!_.isUndefined(tdInfo) && !_.isUndefined(tdInfo.parentId)) {
                    values = _this.getParentsValues(tdInfo.parentId).concat(values);
                }
    
                return values;
            };
    
            funcs.chineseLength = function(str) {
                var count = 0,
                    re = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
                if (re.test(str)) {
                    //使用正则判断是否存在中文
                    count = str.match(re).length; //返回中文的个数
                }
                return count;
            };
    
            $self.off('click').on('click', 'rect,text', function(e) {
                var tid = $(this).attr('tid'),
                    $clickParam = $(e.target),
                    _selfParent = $($self).parent(),
                    colW = 0, xLength = 0,
                    values = [], y = 0, x = 0, width = 0, height = 0, svgwidth = 0;
    
                //处理的数据点击事件
                if (!_.isEmpty(tid) && tid !== 'false') {
                    if (e.target.localName === 'text') {
                        $clickParam = $(e.target).prev().prev();
                    }
    
                    height = $clickParam.attr('height');
                    x = $clickParam.attr('x');
                    y = $clickParam.attr('y');
    
                    //处理数据点击回调事件（把表单值传出去）
        //兼容titles 
                    values = _.map(funcs.getParentsValues(tid), function(value, index) {
                        value['title'] = conf.titles[index] ? conf.titles[index] : '';
                        return value;
                    });
                    conf.clickCbf({
                        tid: tid,
                        value: tds[tid],
                        values: values,
                        left: x,
                        top: y,
                        height: height,
                        titleLength: conf.titles.length
                    });
                                       
                    //处理点击的边框标蓝
                    setTimeout(function() {
                        //确定所描边框的宽度,_top为居上面的高度，需要加上筛选条件框高度
                        svgwidth = _selfParent.find('svg').width();
                        colW = (svgwidth - 1) / conf.titles.length - 2;
                        colW = colW < 65 ? 65 : colW;
                        xLength = parseInt(x / colW, 10);
    
                        width = (conf.titles.length - xLength) * colW;
                        _selfParent.find('.frameBorder').show();
                        _selfParent.parent().parent().show();
                        _extraHei = _selfParent.find('.filter-container_new').height();
                        if (_extraHei * 1 === 0) {
                            _top = parseInt(y, 10);
                        } else {
                            _top = parseInt(y, 10) + _extraHei + 30;
                        }
                        _selfParent.find('.frameBorder').css(
                            {
                                'left': x + 'px',
                                'top': _top + 'px',
                                'width': width + 'px',
                                'height': height + 'px'
                            }
                        );
                    });
                }
            });
    
            $self.delegate('text', 'mouseover', function(e) {
                var ftitle = $(this).attr('ftitle'), top, index;
    
                if (e.target && e.target.innerHTML.indexOf('...') === -1) {
                    return;
                }
    
                if (_.isEmpty(ftitle)) {
                    return;
                }
    
                top = e.target.y['animVal'][0]['value'];
                index = e.target.x['animVal'][0]['value'];
    
                $($self).parent().find('.chartNotice').html(ftitle).show().css({
                    left: index + 'px',
                    top: top
                });
            });
    
            $self.delegate('text', 'mouseleave', function() {
                var ftitle = $(this).attr('ftitle');
    
                if (_.isEmpty(ftitle)) {
                    return;
                }
    
                $($self).parent().find('.chartNotice').hide();
            });
    
            $self.svg = funcs.render();
            //增加自适应会出现单应用标签中图表来回切换之后表格莫名缩小现象,故去掉自适应
    //        $(window).bind('resize', funcs.render);
            return $self.svg;
        };
    }
};

module.exports = reportTable;