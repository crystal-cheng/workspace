(function($, window) {
    var TEMPLATE = {
        FRAME:
                '<div class="c-head clearfix">' +
                '</div>' +
                '<div class="c-body clearfix">' +
                '</div>',
        OPERATE:
                '<table class="c-operate-table">' +
                    '<tbody>' +
                        '<tr>' +
                            '<td style="width: 40%">' +
                                '<div class="c-group-mid c-year">' +
                                    '<div class="c-group">' +
                                        '<div class="yearOperate yearDown c-group-left fa fa-angle-left"></div>' +
                                            '<div class="c-group-mid">' +
                                                '<div class="c-group-mid-content">' +
                                                    '<span class="c-dis-year">2015年</span>' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '<div class="yearOperate yearUp c-group-right fa fa-angle-right"></div>' +
                                            '<ul class="c-year-list c-list">' +
                                            '</ul>' +
                                    '</div>' +
                                    '<div class="c-group-space"></div>' +
                                '</div>' +
                                '<div class="c-group-mid c-month">' +
                                    '<div class="c-group">' +
                                        '<div class="monthOperate monthDown c-group-left fa fa-angle-left"></div>' +
                                            '<div class="c-group-mid">' +
                                                '<div class="c-group-mid-content">' +
                                                    '<span class="c-dis-month">1月</span>' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '<div class="monthOperate monthUp c-group-right fa fa-angle-right"></div>' +
                                            '<ul class="c-month-list c-list">' +
                                            '</ul>' +
                                    '</div>' +
                                    '<div class="c-group-space"></div>' +
                                '</div>' +
                            '</td>' +
                            '<td style="width: 60%">' +
                                '<div class="c-festival c-group-mid">' +
                                    '<div class="c-group-mid-content">' +
                                        '<div class="c-group">' +
                                            '<span class="c-dis-festival">选择假期</span>' +
                                            '<span class="fa fa-angle-down c-dropDown"></span>' +
                                        '</div>' +
                                        '<ul class="c-festival-list c-list">' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="c-group c-today">' +
                                '返回今天' +
                                '</div>' +
                                '<div class="c-workday c-group">' +
                                    '<span class="dropdown-toggle dropdown" data-toggle="dropdown">设置工作时间</span>' +
                                    '<div class="c-workday-list c-list dropdown-menu">' +
                                    '</div>' +
                                '</div>' +
                            '</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>',
        SETWORKTIME:
                    '<div data-stopPropagation="true">' +
                        '<div class="job">' +
                            '<span>每周工作时间:</span>' +
                        '</div>' +
                        '<div class="jobTime">' +
                            '<select class="startTime" name="startTime"  id = "startTime">' +
                            '<option value="1" selected>周一</option>' +
                            '<option value="2">周二</option>' +
                            '<option value="3">周三</option>' +
                            '<option value="4">周四</option>' +
                            '<option value="5">周五</option>' +
                            '<option value="6">周六</option>' +
                            '<option value="7">周日</option>' +
                            '</select> &nbsp; - &nbsp; ' +
                            '<select name="finishTime" id = "finishTime">' +
                            '<option value="1">周一</option>' +
                            '<option value="2">周二</option>' +
                            '<option value="3">周三</option>' +
                            '<option value="4">周四</option>' +
                            '<option value="5" selected>周五</option>' +
                            '<option value="6">周六</option>' +
                            '<option value="7">周日</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="moring">' +
                            '<span>上午工作时间:</span>' +
                        '</div>' +
                        '<div class="moringTime">' +
                            '<input type="text" name="moringStartTime" value="#{moringStartTime}"' +
                            ' id="moringStartTime" placeholder="开始时间"/> - ' +
                            '<input type="text" name="moringEndTime" value="#{moringEndTime}"' +
                            ' id="moringEndTime" placeholder="结束时间"/>' +
                        '</div>' +
                        '<div class="afternoon">' +
                            '<span>下午工作时间:</span>' +
                        '</div>' +
                        '<div class="afternoonTime">' +
                            '<input type="text" name="afternoonStartTime" value="#{afternoonStartTime}"' +
                            ' id="afternoonStartTime" placeholder="开始时间"/> - ' +
                            '<input type="text" name="afternoonEndTime" value="#{afternoonEndTime}"' +
                            ' id="afternoonEndTime" placeholder="结束时间"/>' +
                        '</div>' +
                        '<div class="range">' +
                            '<span>运用到以下日期:</span>' +
                        '</div>' +
                        '<div class="timeRange">' +
                            '<input type="text" name="rangeStartTime" value="#{rangeStartTime}"' +
                            ' id="rangeStartTime" placeholder="开始日期"/> - ' +
                            '<input type="text" name="rangeEndTime" value="#{rangeEndTime}"' +
                            ' id="rangeEndTime" placeholder="结束日期"/>' +
                        '</div>' +
                        '<div class="t-bottom">' +
                            '<button class="revoke">取消</button>' +
                            '<button class="save">确定</button>' +
                        '</div>' +
                    '</div>',
        ITEM:
                '<td>' +

                    '<div class="c-item-date #{#isToday}c-item-today#{/isToday}"' +
                    ' data-date="#{year}-#{month}-#{date}">' +
                        '<div class="c-item-flag" style="display:none;"></div>' +
                        '<div class="c-item-disDate #{#other}c-item-other#{/other}">#{date}' +
                            '&nbsp' +
                            '#{#work}' +
                                '<span class="c-item-pos c-item-work">班</span> ' +
                            '#{/work}' +
                            '#{#rest}' +
                                '<span class="c-item-pos c-item-rest">休</span> ' +
                            '#{/rest}' +
                        '</div>' +
                        '<div class="c-item-lunar" title="#{o_lunar}">' +
                        '#{dis_lunar}</div>' +
                    '</div>' +

                '</td>',
        CALENDAR:
                '<table class="c-table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>周日</th>' +
                            '<th>周一</th>' +
                            '<th>周二</th>' +
                            '<th>周三</th>' +
                            '<th>周四</th>' +
                            '<th>周五</th>' +
                            '<th>周六</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody></tbody>' +
                '</table>' +
                '<div id="s-body">' +
                    '<div class="s-head">' +
                        '<span class="s-select">请选择</span>' +
                        '<div class="destroy"></div>' +
                    '</div>' +
                    '<div class="s-middle">' +
                        '<input type="radio" name="set" value=1 id="wk">' +
                        '<span class="s-state">班</span>' +
                        '<input type="radio" name="set" value=0 id="rs">' +
                        '<span class="s-state">休</span>' +
                        '<input type="radio" name="set" value=2 id="no">' +
                        '<span class="s-state">无</span>' +
                    '</div>' +
                    '<div class="s-bottom">' +
                        '<button class="cancel btn btn-default">取消</button>' +
                        '<button class="confirm btn btn-primary">确定</button>' +
                    '</div>' +
                '</div>',
        YEAROPTIONS:
                '#{#year}' +
                '<li class="c-year-list-item" data-value="#{value}">#{value}年</li>' +
                '#{/year}',
        MONTHOPTIONS:
                '#{#month}' +
                '<li class="c-month-list-item" data-value="#{value}">#{value}月</li>' +
                '#{/month}',
        SOLARFESTIVALOPTIONS:
                '#{#festival}' +
                '<li class="c-festival-list-item" data-value="#{value}">#{dis_value}</li>' +
                '#{/festival}'
    },
    //1900-2050年农历信息
    LUNARINFO = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ],
    LEAPLUNAR = {
        '01': '闰正月',
        '02': '闰二月',
        '03': '闰三月',
        '04': '闰四月',
        '05': '闰五月',
        '06': '闰六月',
        '07': '闰七月',
        '08': '闰八月',
        '09': '闰九月',
        '010': '闰十月',
        '011': '闰冬月',
        '012': '闰腊月'
    },
    LUNARMONTH = [
        '正月', '二月', '三月', '四月', '五月',
        '六月', '七月', '八月', '九月', '十月',
        '冬月', '腊月'
    ],
    LUNARDATE = [
        '初一', '初二', '初三', '初四', '初五',
        '初六', '初七', '初八', '初九', '初十',
        '十一', '十二', '十三', '十四', '十五',
        '十六', '十七', '十八', '十九', '二十',
        '廿一', '廿二', '廿三', '廿四', '廿五',
        '廿六', '廿七', '廿八', '廿九', '三十', '卅一'
    ],
    SOLARFESTIVAL = {
        '1 1': '元旦',
        '2 14': '情人节',
        '3 8': '妇女节',
        '3 12': '植树节',
        '3 15': '消费者权益日',
        '4 1': '愚人节',
        '5 1': '劳动节',
        '5 4': '青年节',
        '6 1': '儿童节',
        '7 1': '建党节',
        '8 1': '建军节',
        '9 10': '教师节',
        '10 1': '国庆节',
        '12 24': '平安夜',
        '12 25': '圣诞节'
    },
    LUNARFESTIVAL = {
        '1 1': '春节',
        '1 15': '元宵节',
        '5 5': '端午节',
        '7 7': '七夕情人节',
        '7 15': '中元节',
        '8 15': '中秋节',
        '9 9': '重阳节',
        '12 8': '腊八节'
    },

    aMonth = function(opt) {
        opt = opt || {};
        _.extend(this, opt);
    };

    $.fn.aCalendar = function(opt) {
        var self = this,
            minYear = 2000,
            maxYear = 2025,
            today = {
                y: '',
                m: '',
                d: ''
            },
            calendar = {
                y: '',
                m: '',
                d: ''
            },
            monthList = [],
            ajaxInfo = true,
            authority = false,
            getDate = '',
            allSetFest = [];
        method = {
            // 判断是否是润年
            isLeapYear: function(y) {
                y = +y;
                return ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0);
            },
            // 判断是不是大月
            isMonthOfThirtyOne: function(m) {
                m = +m;
                var month = [1, 3, 5, 7, 8, 10, 12];
                return (_.indexOf(month, m) !== -1);
            },
            // 获取前一个月和后一个月
            getPrevAndNextMonth: function(y, m) {
                y = +y;
                m = +m;
                var prev = {
                    y: y,
                    m: m - 1,
                    length: ''
                },
                next = {
                    y: y,
                    m: m + 1,
                    length: ''
                };
                if (m === 1) {
                    prev.y -= 1;
                    prev.m = 12;
                }
                if (m === 12) {
                    next.y += 1;
                    next.m = 1;
                }
                prev.length = method.getMonthLength(prev.y, prev.m);
                next.length = method.getMonthLength(next.y, next.m);
                return {
                    prev: prev,
                    next: next
                };
            },
            // 得到某天的星期信息
            getWeek: function(year, m, d) {
                var week,
                    mydate = new Date(year, m - 1, d);
                week = mydate.getDay();
                return week === 0 ? 7 : week;
            },
            // 获取某月的长度
            getMonthLength: function(y, m) {
                var result = 30;
                if (+m === 2) {
                    result = 28;
                    if (method.isLeapYear(y)) {
                        result = 29;
                    }
                } else {
                    if (method.isMonthOfThirtyOne(m)) {
                        result = 31;
                    }
                }
                return result;
            },
            getMonthList: function(y, m, d, act) {
                var monthLength = method.getMonthLength(y, m), str,
                    monthList = [], i, j, k, exMonth, week, result = [],
                    month, day, date;
                ajaxAction();
                if (+d > +monthLength) {
                    d = monthLength;
                }
                for (i = 1; i <= monthLength; i++) {
                    date = {
                        year: y,
                        month: m,
                        date: i,
                        isToday: false
                    };

                    // 标记今天
                    if (y === today.y && m === today.m && i === today.d) {
                        date.isToday = true;
                    }

                    date.lunar = method.getLunarMonth({
                        y: date.year,
                        m: date.month,
                        d: date.date
                    });
                    date.festival = method.getFestival(date);
                    monthList.push(date);
                }
                if (act === 1) {
                    _.each(monthList, function(month) {
                        result.push(new aMonth(month));
                    });
                    return result;
                } else {
                    week = method.getWeek(y, m, 1);
                    exMonth = method.getPrevAndNextMonth(y, m);

                    //填充上个月日期
                    for (i = exMonth.prev.length, j = week % 7; j > 0; j--) {
                        date = {
                            year: exMonth.prev.y,
                            month: exMonth.prev.m,
                            date: i
                        };
                        date.lunar = method.getLunarMonth({
                            y: date.year,
                            m: date.month,
                            d: date.date
                        });
                        date.festival = method.getFestival(date);
                        date.other = true;
                        monthList.unshift(date);
                        i--;
                    }
                    week = method.getWeek(y, m, monthLength);

                    //填充下个月日期
                    for (i = 1, j = week % 7; j < 6 && i <= exMonth.next.length || monthList.length < 35; j++) {
                        date = {
                            year: exMonth.next.y,
                            month: exMonth.next.m,
                            date: i
                        };
                        date.lunar = method.getLunarMonth({
                            y: date.year,
                            m: date.month,
                            d: date.date
                        });
                        date.festival = method.getFestival(date);
                        date.other = true;
                        monthList.push(date);
                        i++;
                    }

                    _.each(monthList, function(month) {
                        result.push(new aMonth(month));
                    });

                    for (i = 0; i < result.length; i++) {
                        month = result[i]['month'];
                        day = result[i]['date'];
                        if (day.toString().length === 1) {
                            result[i]['date'] = '0' + result[i]['date'];
                        }

                        if (month.toString().length === 1) {
                            result[i]['month'] = '0' + result[i]['month'];
                        }

                        str = result[i]['year'] + '-' + result[i]['month'] + '-' + result[i]['date'];
                        for (k = 0; k < allSetFest.length; k++) {
                            if (allSetFest[k].date === str) {
                                if (+allSetFest[k].state === 1) {
                                    result[i].work = true;
                                } else if (+allSetFest[k].state === 0) {
                                    result[i].rest = true;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            lYearDays: function(y) {
                var i, sum = 348;

                for (i = 0x8000; i > 0x8; i >>= 1) {
                    sum += (LUNARINFO[y - 1900] & i) ? 1 : 0;
                }
                return (sum + method.leapDays(y));
            },
            //返回农历y年闰月的天数
            leapDays: function(y) {
                if (method.leapMonth(y)) {
                    return ((LUNARINFO[y - 1900] & 0x10000) ? 30 : 29);
                } else {
                    return (0);
                }
            },
            //判断y年的农历中那个月是闰月,不是闰月返回0
            leapMonth: function(y) {
                return (LUNARINFO[y - 1900] & 0xf);
            },
            //返回农历y年m月的总天数
            monthDays: function(y, m) {
                return ((LUNARINFO[y - 1900] & (0x10000 >> m)) ? 30 : 29);
            },
            //算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
            Dianaday: function(objDate) {
                var i, result, leap = 0, temp = 0,
                    baseDate = new Date(1900, 0, 31),
                    offset = (objDate - baseDate) / 86400000;
                this.dayCyl = offset + 40;
                this.monCyl = 14;
                for (i = 1900; i < 2050 && offset > 0; i++) {
                    temp = method.lYearDays(i);
                    offset -= temp;
                    this.monCyl += 12;
                }
                if (offset < 0) {
                    offset += temp;
                    i--;
                    this.monCyl -= 12;
                }
                this.year = i;
                this.yearCyl = i - 1864;
                leap = method.leapMonth(i); //闰哪个月
                this.isLeap = false;
                for (i = 1; i < 13 && offset > 0; i++) {
                    if (leap > 0 && i === (leap + 1) && this.isLeap === false) {	//闰月
                        --i;
                        this.isLeap = true;
                        temp = method.leapDays(this.year);
                    } else {
                        temp = method.monthDays(this.year, i);
                    }

                    if (this.isLeap === true && i === (leap + 1)) {
                        this.isLeap = false;	//解除闰月
                    }

                    offset -= temp;

                    if (this.isLeap === false) {
                        this.monCyl++;
                    }
                }
                if (offset === 0 && leap > 0 && i === leap + 1) {
                    if (this.isLeap) {
                        this.isLeap = false;
                    }
                    else {
                        this.isLeap = true;
                        --i;
                        --this.monCyl;
                    }
                }
                if (offset < 0) {
                    offset += temp;
                    --i;
                    --this.monCyl;
                }
                this.month = i;
                this.day = offset + 1;
                result = {month: this.month, day: this.day};
                return result;
            },
            getLunarMonth: function(solar) {
                solar.m -= 1;
                sDObj = new Date(solar.y, solar.m, solar.d);
                lDObj = method.Dianaday(sDObj);
                result = {};
                result.m = lDObj.month;
                result.d = lDObj.day;
                return result;
            },
            // 获取农历显示值(如果是节日则用对应名称进行替换)
            getDisplayLunar: function(date) {
                var result = '';
                if (date.festival) {
                    return date.festival;
                }

                if (+date.lunar.d === 1) {
                    // 判断是不是润月
                    if (date.lunar.m.toString()[0] === '0') {
                        result = LEAPLUNAR[date.lunar.m];
                        return result;
                    }

                    result = LUNARMONTH[date.lunar.m - 1];
                    return result;
                }

                result = LUNARDATE[date.lunar.d - 1];
                return result;
            },
            //设置节假日时间
            getFestival: function(date) {
                var result = '';
                if (SOLARFESTIVAL[date.month + ' ' + date.date]) {
                    result = SOLARFESTIVAL[date.month + ' ' + date.date];
                }
                if (LUNARFESTIVAL[date.lunar.m + ' ' + date.lunar.d]) {
                    result = LUNARFESTIVAL[date.lunar.m + ' ' + date.lunar.d];
                }
                return result;
            }
        };

        function create() {
            var date = new Date();
            calendar.y = today.y = date.getFullYear();
            calendar.m = today.m = date.getMonth() + 1;
            calendar.d = today.d = date.getDate();

            self.addClass('c-calendar').html(TEMPLATE.FRAME);

            $('.c-head', self).html(TEMPLATE.OPERATE);

            $('.c-body', self).html(TEMPLATE.CALENDAR);

            init();

            if (authority === true) {
                $('.c-today', self).css('width', '30%');
                $('.c-festival', self).css('width', '30%');
                $('.c-workday', self).css('width', '32%');
                $('.c-workday', self).show();
            }

            addEvent();
        }

        function ajax(type, url, async, dataType, data, cbfSuccess, cbfError) {
            var ajaxResult = false;
            $.ajax({
                type: type,
                url: encodeURI(url),
                async: async,
                dataType: dataType,
                data: data,
                success: function(obJson, status) {
                    ajaxResult = typeof cbfSuccess === 'function' ? cbfSuccess(obJson, status) : true;
                },
                error: function(obJson, status) {
                    ajaxResult = typeof cbfError === 'function' ?  cbfError(obJson, status) : false;
                }
            });
            return ajaxResult;
        }

        function checkAuthority() {
            ajax(
                    'get',
                    '/api/calendar/checkAuthority',
                    false,
                    'json',
                    {},
                    function(result) {
                        if (result.status === 200) {
                            authority = true;
                        }
                    }
            );
        }



        function init() {
            ajaxInfo = true;
            var c = calendar,
                monthList = method.getMonthList(c.y, c.m, c.d),
                length = monthList.length,
                tr = '',
                td = '',
                data = {
                    admin: '',
                    end: '',
                    start: ''
                };
            list = returnAllFest();

            checkAuthority();

            _.each(monthList, function(date, index) {

                date['o_lunar'] = method.getDisplayLunar(date);

                date['dis_lunar'] = date['o_lunar'].length > 3 ?
                        date['o_lunar'].substr(0, 2) + '..' :
                        date['o_lunar'];
                td += Mustache.to_html(TEMPLATE.ITEM, date);

                if ((index + 1) % 7 === 0 || (index + 1) === length) {
                    td = '<tr>' + td + '</tr>';
                    tr += td;
                    td = '';
                }
            });

            $('.c-dis-year', self).html(calendar.y + '年');
            $('.c-dis-month', self).html(calendar.m + '月');
            if (list[calendar.m + ' ' + calendar.d]) {
                $('.c-dis-festival', self).html(
                        list[calendar.m + ' ' + calendar.d]
                        );
            }


            $('.c-table tbody', self).html(tr);

            if ($.cookie('identify') === 'company') {
                data.admin = 'company';
            }

            data.start = Date.parse(
                    monthList[0].year + '/' +
                    monthList[0].month + '/' +
                    monthList[0].date
                    );

            data.end = Date.parse(
                    monthList[monthList.length - 1].year + '/' +
                    monthList[monthList.length - 1].month + '/' +
                    monthList[monthList.length - 1].date
                    );
        }
        function ajaxAction() {
            if (ajaxInfo === true) {
                $.ajax({
                    type: 'get',
                    url: '/api/calendar',
                    async: false,
                    dataType: 'Json',
                    success: function(result) {
                        allSetFest = [];
                        for (var i = 0; i < result.length; i++) {
                            allSetFest[i] = result[i];
                        }
                    }
                });
                ajaxInfo = false;
            }
        }
        function returnAllFest() {
            var y, m, d, k, v, tmp, i, j,
                result = [],
                info = {},
                lunar = {};
            y = $('.c-group-mid-content .c-dis-year', self).html().substr(0, 4);

            for (i = 1; i <= 12; i++) {

                result[i - 1] = method.getMonthList(y, i, 1, 1);
            }

            for (j = 0; j < result.length; j++) {
                for (m = 0; m < result[j].length; m++) {
                    if (+result[j][m].year === +y) {
                        k = result[j][m].month + ' ' + result[j][m].date;
                        v = result[j][m].lunar;
                        info[k] = v;
                    }

                }
            }

            _.each(LUNARFESTIVAL, function(fo, ko) {
                _.each(info, function(f, k) {
                    tmp = f.m + ' ' + f.d;
                    if (ko === tmp) {
                        lunar[k] = fo;

                    }
                });

            });
            _.each(SOLARFESTIVAL, function(f, k) {
                lunar[k] = f;
            });
            return lunar;
        }
        function addEvent() {

            $('.monthOperate', self).on('click', function(e) {
                if ($(e.target).hasClass('monthDown')) {
                    calendar.m -= 1;
                } else {
                    calendar.m += 1;
                }

                if (calendar.m === 0) {
                    calendar.m = 12;
                    if (calendar.y > minYear) {
                        calendar.y -= 1;
                    }
                }
                if (calendar.m === 13) {
                    calendar.m = 1;
                    if (calendar.y < maxYear) {
                        calendar.y += 1;
                    }
                }

                $('#s-body').hide();
                init();
            });
            $('.yearOperate', self).on('click', function(e) {
                if ($(e.target).hasClass('yearDown')) {
                    if (+calendar.y <= minYear) {
                        return;
                    }
                    calendar.y -= 1;
                } else {
                    if (+calendar.y >= maxYear) {
                        return;
                    }
                    calendar.y += 1;
                }
                $('#s-body').hide();
                init();
            });

            $('.c-today', self).on('click', function() {
                calendar.y = today.y;
                calendar.m = today.m;
                calendar.d = today.d;
                $('#s-body').hide();
                init();
            });

            $('.c-year .c-group-mid-content', self).on('click', function() {
                var year = [],
                    $ul, i, isHidden;

                for (i = minYear; i <= maxYear; i++) {
                    year.push({
                        value: i
                    });
                }
                $ul = $('.c-year-list', self);
                isHidden = $ul.is(':hidden');

                $('.c-list', self).hide();

                $ul[isHidden ? 'show' : 'hide']();

                $ul.html(Mustache.to_html(TEMPLATE.YEAROPTIONS, {
                    year: year
                }));
                $('#s-body').hide();
            });
            $('.c-month .c-group-mid-content', self).on('click', function() {
                var startMonth = 1,
                    endMonth = 12,
                    month = [], $ul, i, isHidden;

                for (i = startMonth; i <= endMonth; i++) {
                    month.push({
                        value: i
                    });
                }

                $ul = $('.c-month-list', self);
                isHidden = $ul.is(':hidden');

                $('.c-list', self).hide();

                $ul[isHidden ? 'show' : 'hide']();

                $ul.html(Mustache.to_html(TEMPLATE.MONTHOPTIONS, {
                    month: month
                }));
                $('#s-body').hide();
            });

            $('.c-festival .c-group-mid-content .c-group ', self).on('click', function() {
                var festival = [],
                    isHidden,
                    list = returnAllFest();

                _.each(list, function(f, k) {
                    festival.push({
                        value: k,
                        dis_value: f
                    });
                });

                $ul = $('.c-festival-list', self);
                isHidden = $ul.is(':hidden');

                $('.c-list', self).hide();

                $ul[isHidden ? 'show' : 'hide']();
                $ul.html(Mustache.to_html(TEMPLATE.SOLARFESTIVALOPTIONS, {
                    festival: festival
                }));
                $('#s-body').hide();
            });

            //设置工作时间段
            self.delegate('.c-workday', 'click', function() {
                $('.c-workday-list').html(TEMPLATE.SETWORKTIME);

                var isBlock = '',
                    myDate = new Date(),
                    today = Common.dateFormat(myDate, 'yyyy-MM-dd'),
                    msTime = '',
                    meTime = '',
                    asTime = '',
                    aeTime = '',
                    rsTime = '',
                    reTime = '',
                    sTime = '',
                    fTime = '',
                    data = [],
                    rr,
                    $workdayList = $('.c-workday-list'),
                    $startTime = $workdayList.find('.startTime'),
                    obj = document.getElementById('finishTime'),
                    options = obj.options;

                if ($workdayList.css('display') === 'none') {
                    $('.c-workday-list').show();
                } else {
                    $('.c-workday-list').hide();
                    return;
                }

                //获取上次设置的工作时间
                $.ajax({
                    type: 'get',
                    url: '/api/calendar/getWorkTime',
                    async: false,
                    success: function(response) {
                        rr = response.result;
                        if (rr) {
                            $('input[name=moringStartTime]').val(rr.moring_start);
                            $('input[name=moringEndTime]').val(rr.moring_end);
                            $('input[name=afternoonStartTime]').val(rr.afternoon_start);
                            $('input[name=afternoonEndTime]').val(rr.afternoon_end);
                            $('input[name=rangeStartTime]').val(rr.date_start);
                            $('input[name=rangeEndTime]').val(rr.date_end);
                            $('select[name=startTime]').val(rr.worktime_start);
                            $('select[name=finishTime]').val(rr.worktime_end);
                        }
                        if (_.isEmpty(response.result)) {
                            $('select[name=startTime]').val('1');
                            $('select[name=finishTime]').val('5');
                        }
                    }
                });

                $startTime.select2({
                    width: '43%'
                });

                $('select[name=finishTime]').select2({
                    width: '43%'
                });

                $('.dropdown-menu').on('click', '[data-stopPropagation]', function(e) {
                    e.stopPropagation();
                });

                $('.moringTime input').prop('readonly', true).calendar({
                    minDate: today + ' 00:00',
                    maxDate: today + ' 12:01',
                    format: 'HH:mm'
                });

                $('.afternoonTime input').prop('readonly', true).calendar({
                    minDate: today + ' 12:00',
                    maxDate: today + ' 24:00',
                    format: 'HH:mm'
                });

                $('.timeRange input, .timeRange input').prop('readonly', true).calendar({
                    minDate: today,
                    format: 'yyyy-MM-dd',
                    onSetDate: function() {
//                        $('.timeRange input, .timeRange input').blur();
                    }
                });
                $('select[name=startTime]', self).on('change', function() {
                    var obj = document.getElementById('finishTime'),
                        opt,
                        options = obj.options;
                    for (i = 0, len = options.length; i < len; i++) {
                        opt = options[i];
                        if (opt.value < $('select[name=startTime]').val()) {
                            $(opt).attr('disabled', 'disabled');
                        } else {
                            $(opt).removeAttr('disabled', 'disabled');
                        }
                    }
                });
                for (i = 0, len = options.length; i < len; i++) {
                    if (options[i].value < $('select[name=startTime]').val()) {
                        $(options[i]).attr('disabled', 'disabled');
                    } else {
                        $(options[i]).removeAttr('disabled', 'disabled');
                    }
                }
                //点保存时的判断逻辑
                $('.save', self).on('click', function() {
                    msTime = $('#moringStartTime').val();
                    meTime = $('#moringEndTime').val();
                    asTime = $('#afternoonStartTime').val();
                    aeTime = $('#afternoonEndTime').val();
                    rsTime = $('#rangeStartTime').val();
                    reTime = $('#rangeEndTime').val();
                    sTime = $('select[name=startTime]').val();
                    fTime = $('select[name=finishTime]').val();
                    if (_.isEmpty(msTime) || _.isEmpty(meTime) || _.isEmpty(asTime) ||
                             _.isEmpty(aeTime) || _.isEmpty(rsTime) || _.isEmpty(reTime)) {
                        $.alert('时间、日期不能为空');
                        return false;
                    }
                    if (msTime >= meTime || asTime >= aeTime || rsTime >= reTime || sTime > fTime) {
                        if (aeTime !== '00:00') {
                            $.alert('结束时间、日期要大于开始时间、日期');
                            return false;
                        }
                    }
                    data = {
                        moringStart: msTime,
                        moringEnd: meTime,
                        afternoonStart: asTime,
                        afternoonEnd: aeTime,
                        rangeStart: rsTime,
                        rangeEnd: reTime,
                        workday: {
                            workday: [sTime, fTime]
                        }
                    };
                    $.ajax({
                        type: 'post',
                        url: '/api/calendar/workTime',
                        async: true,
                        data: data,
                        success: function(result) {
                            if (result.status === 200) {
                                $.confirm({
                                    content: '设置成功',
                                    buttons: {
                                        '关闭': function() {
                                            location.reload();
                                        }
                                    }
                                });
                                $('.c-workday-list').hide();
                            } else {
                                $.alert('设置失败');
                            }
                        }
                    });
                });
                $('.revoke', self).on('click', function() {
                    $('.c-workday-list').hide();
                });
            });

            self.delegate('.c-item-date', 'click', function(e) {
                var $target = $(e.target).closest('.c-item-date'),
                    isHidden = false;
                $('.c-item-select').removeClass('c-item-select');
                $('.c-flag-select').removeClass('c-flag-select');

                if ($target.hasClass('c-item-today')) {
                    $target.removeClass('c-item-today-unselect');
                    $target.parent().find('.c-item-flag').addClass('c-flag-today');
                } else {
                    $('.c-item-today').addClass('c-item-today-unselect');
                    $('.c-item-today').parent().find('.c-item-flag').removeClass('c-flag-today');
                    $target.addClass('c-item-select');
                    $target.parent().find('.c-item-flag').addClass('c-flag-select');
                }
            });

            self.delegate('.c-year-list-item', 'click', function(e) {
                var value = $(e.target).data('value');
                $('.c-list').hide();
                calendar.y = value;
                init();
            });

            self.delegate('.c-month-list-item', 'click', function(e) {
                var value = $(e.target).data('value');
                $('.c-list').hide();
                calendar.m = value;
                init();
            });

            self.delegate('.c-festival-list-item', 'click', function(e) {
                var value = $(e.target).data('value');
                $('.c-list').hide();
                calendar.m = +value.split(' ')[0];
                calendar.d = +value.split(' ')[1];
                init();
            });

            //右击编辑班，休状态

            self.delegate('.c-item-date').bind('contextmenu', function(e) {   //禁止鼠标右键弹出的默认菜单
                return false;
            });
            self.delegate('.c-item-date', 'mousedown', function(e) {
                if (authority === false) {
                    return;
                }
                getDate = $(this).attr('data-date');
                var offset = self.offset(),
                    X = (e.pageX - offset.left),
                    Y = (e.pageY - offset.top),
                    $target = $(e.target).closest('.c-item-date');
                if (e.which === 3) {
                    $('.c-item-select').removeClass('c-item-select');
                    $('.c-flag-select').removeClass('c-flag-select');
                    if ($target.hasClass('c-item-today')) {
                        $target.removeClass('c-item-today-unselect');
                        $target.parent().find('.c-item-flag').addClass('c-flag-today');
                    } else {
                        $('.c-item-today').addClass('c-item-today-unselect');
                        $('.c-item-today').parent().find('.c-item-flag').removeClass('c-flag-today');
                        $target.addClass('c-item-select');
                        $target.parent().find('.c-item-flag').addClass('c-flag-select');
                    }
                    if ((X + $('#s-body').width()) > $('.c-calendar').width()) {
                        X = $('.c-calendar').width() - $('#s-body').width();
                    }
                    if ((Y + $('#s-body').height()) > $('.c-calendar').height()) {
                        Y = $('.c-calendar').height() - $('#s-body').height();
                    }

                    $('#s-body').css('left', X + 'px');
                    $('#s-body').css('top', Y + 'px');
                    $('#s-body').show();
                    $('.destroy', self).on('click', function() {
                        $('#s-body').hide();
                    });
                    $('.cancel', self).on('click', function() {
                        $('#s-body').hide();
                    });
                    $('.c-list').hide();
                    if ($(this).children('.c-item-disDate').children('.c-item-pos').is('.c-item-work')) {
                        $('#wk').prop('checked', true);
                    } else if ($(this).children('.c-item-disDate').children('.c-item-pos').is('.c-item-rest')) {
                        $('#rs').prop('checked', true);
                    } else {
                        $('#no').prop('checked', true);
                    }
                } else {
                    $('#s-body').hide();
                }
            });

            //事件
            self.delegate('.confirm', 'click', function() {
                var selectDate = getDate,
                    selectState = +$('input:radio[name=set]:checked').val();

                $.ajax({
                    type: 'post',
                    url: '/api/calendar',
                    data: {
                        state: selectState,
                        date: selectDate
                    },
                    success: function(result) {
                        if (result.status === 200) {
                            init();
                        }
                    }
                });
                $('#s-body').hide();

            });
        }

        create();
    };

})(jQuery, window);
$('body').bind('click', function(e) {
    var $target = $(e.target);

    setTimeout(function() {
        if (!$target.closest('.c-festival').length) {
            $('.c-festival-list').hide();
        }

        if (!$target.closest('.c-month').length) {
            $('.c-month-list').hide();
        }

        if (!$target.closest('.c-year').length) {
            $('.c-year-list').hide();
        }
    }, 0);
});
