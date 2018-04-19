(function($) {
    $.fn.customerDatePicker = function(format, defaultValue, cbfSetDate, cbfSetDateParams) {
        var _format = format ? format : 'yyyy-MM-dd HH:mm',
            _interface,
            _self = this,
            _datePicker,
            _objReal = _self.clone();
        _objReal.attr('id', _self.attr('id') + '_real');
        _objReal.attr('name', _self.attr('name'));
        _self.removeAttr('name');
        _self.after(_objReal);
        _objReal.hide();
        _self.attr('readOnly', 'readOnly');
        _self.focus(function() {
            _interface.setFormat(_format);
        });
        _datePicker = _self.aCalendar({
            format: _format,
            real: '#' + _self.attr('id') + '_real',
            onSetDate: function()
            {
                if (typeof cbfSetDate === 'function') {
                    cbfSetDate(cbfSetDateParams);
                }
            }
        });

        _interface = {
            setFormat: function(format)
            {
                _format = format;
                _datePicker.setConfig({
                    format: _format
                });
            },

            getValue: function()
            {
                return _objReal.val();
            },

            setValue: function(value)
            {
                var reg = '^([0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|' +
                    '3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2]' +
                    '[0-9]|30))))\\s((([1-9]{1})|([0-1][0-9])|([1-2][0-3])):' +
                    '([0-5][0-9]):([0-5][0-9]))$';
                reg = new RegExp(reg);
                if (!reg.test(value)) {
                    return;
                }

                _objReal.val(value);
                _self.val(Common.dateFormat(Common.creatDateObj(value), format));
            },

            destroy: function()
            {
                _self.val('').removeAttr('readonly');
                _objReal.remove();
                _datePicker.destroy();
            }
        };

        if (defaultValue) {
            _interface.setValue(defaultValue);
        }

        return _interface;
    };
})(jQuery);