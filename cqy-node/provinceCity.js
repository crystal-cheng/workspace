/**
 * 省市区级联插件,改编自：
 * http://hi.baidu.com/dpxdqx/blog/item/0e6461df1446271b63279898.html
 * 例子:
 * 1.初始化
 * var testObj = $("#test").provinceCity({
 *     province:"江苏省",
 *     city:"南京市",
 *     country:"鼓楼区"
 *  });
 * 或
 * var testObj = $('#test').provinceCity({'江苏省 南京市 鼓楼区'});
 *
 * 2.获取选中信息
 * testObj.get(); //返回值如：{province: '江苏省', city: '南京市', country: '鼓楼区'}
 * testObj.getAsString(); //返回值如：江苏省 南京市 鼓楼区
 *
 * 3.设置选中信息
 * testObj.set({province: '江苏省', city: '南京市', country: '鼓楼区'});
 * 或
 * testObj.set('江苏省 南京市 鼓楼区');
 *
 * 4.验证是否已经设置相关信息
 * testObj.validate(true|false); //参数：是否必填
 *
 */
(function($) {
    $.fn.provinceCity = function(avg) {
        var self = this, sel, sProvince, sCity, sCounty, loc, instance, set;

        set = function(value) {
            if (typeof value === 'string') {
                value = value.split(' ');
                value = {
                    province: value[0] ? value[0] : null,
                    city: value[1] ? value[1] : null,
                    country: value[2] ? value[2] : null
                };
            }
            value = $.extend({province: null, city: null, country: null}, value || {});
            loc.fillOption(sProvince, '0', value.province);
            loc.fillOption(sCity, '0,' + sProvince.val(), value.city);
            loc.fillOption(sCounty, '0,' + sProvince.val() + ',' + sCity.val(), value.country);
        };

        self.html(
            '<select class="provinceCity form-control"><option value="-1">省</option></select>' +
            '<select class="provinceCity form-control"><option value="-1">市</option></select>' +
            '<select class="provinceCity form-control"><option value="-1">区/县</option></select>'
        );

		sel = $('select', $(this));
		sProvince = sel.eq(0);
		sCity = sel.eq(1);
		sCounty = sel.eq(2);
		loc	= new Location();
        if (_.isObject(avg)) {
            set(avg.value);
        } else {
            set(avg);
        }

		sProvince.change(function() {
            self.children(' span[class="error"]').remove();
            sCity.html('<option value="-1">市</option>');
            loc.fillOption(sCity, '0,' + sProvince.val());
            sCounty.html('<option value="-1">区/县</option>');
            loc.fillOption(sCounty, '0,' + sProvince.val() + ',' + sCity.val());
            // if (_.isObject(avg)) {
            //     avg.callback(avg.param);
            // }
        });

        sCity.change(function() {
            self.children(' span[class="error"]').remove('');
            sCounty.html('<option value="-1">区/县</option>');
            loc.fillOption(sCounty, '0,' + sProvince.val() + ',' + sCity.val());
            // if (_.isObject(avg)) {
            //     avg.callback(avg.param);
            // }
        });

        sCounty.change(function() {
            // if (_.isObject(avg)) {
            //     avg.callback(avg.param);
            // }
        });
        instance = {

            set: function(value) {
                set(value);
            },

            get: function() {
                var province = '', city = '', country = '';
                if (sProvince.val() > -1) {
                    province = sProvince.find('option:selected').text();
                }

                if (sCity.val() > -1) {
                    city = sCity.find('option:selected').text();
                }

                if (sCounty.val() > -1) {
                    country = sCounty.find('option:selected').text();
                }

                return {province: province, city: city, country: country};
            },

            getAsString: function() {
                var result = [],
                    value = instance.get(),
                    index;
                for (index in value) {
                    if (value.hasOwnProperty(index)) {
                        if (value[index]) {
                            result.push(value[index]);
                        }
                    }
                }
                return result.join(' ');
            },

            validate: function(isRequire) {
                self.children(' span[class="error"]').remove('');
                if (!isRequire) {
                    return true;
                }

                if (instance.getAsString()) {
                    return true;
                }
                self.append('<span class="error">地区选项不能为空，请选择。</span>');
                return false;
            }
        };


        return instance;
	};

})(jQuery);
