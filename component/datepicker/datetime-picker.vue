<template>
  <div class="input-group date">
    <input class="form-control" :name="name" type="text" />
    <span class="input-group-addon">
       <i class="icon iconfont icon-rili"></i>
    </span>
  </div>
</template>
<style>
  .input-group {
    width: 101%;
  }
</style>
<script>
//   import $ from 'jquery'
  import moment from 'moment'
  import momentLocals from 'moment/locale/zh-cn'
  import momentTimezone from 'moment-timezone/builds/moment-timezone-with-data'
  import bDatetimePicker from 'eonasdan-bootstrap-datetimepicker'
  import DEFAULT_I18N from './i18n/zh-CN'
//   require('./css/index.css');
  require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');
  require('./css/iconfont.css');

  var DEFAULT_LANGUAGE = "zh-CN";
  export default{
          replace: true,
          inherit: false,
          props: {
                 model: {
                   required: true,
                   twoWay: true
                   },
                 startDatetime: {
                   required: false,
                   default: null
                 },
                 endDatetime: {
                   required: false,
                   default: null
                 },
                 type: {
                   type: String,
                   required: false,
                   default: "datetime"
                   },
                 language: {
                   type: String,
                   required: false,
                   default: ""
                   },
                 datetimeFormat: {
                   type: String,
                   required: false,
                   default: "YYYY-MM-DD HH:mm:ss"
                   },
                 dateFormat: {
                   type: String,
                   required: false,
                   default: "YYYY-MM-DD"
                   },
                 timeFormat: {
                   type: String,
                   required: false,
                   default: "HH:mm:ss"
                   },
                 name: {
                   type: String,
                   required: false,
                   default: ""
                   },
                 onChange: {
                   required: false,
                   default: null
                   },
                 dateUpdateFn: {
                   required: false,
                   default: null
                   }
          },
          beforeCompile() {
              this.isChanging = false;
              this.control = null;
          },
          watch: {
              model(val, oldVal) {
                  if (! this.isChanging) {
                      this.isChanging = true;
                      this.control.date(val);
                      this.isChanging = false;
                      if (this.onChange) {
                          this.onChange(val);
                      }
                  }
              },
              startDatetime() {
                  this.ready();
              },
              endDatetime() {
                  this.ready();
              }

          },
          mounted() {
              this.ready();
          },
          methods: {
              ready() {
                  var options = {
                      useCurrent: false,
                      showClear: true,
                      showClose: false,
                      icons: {
                          time: 'icon iconfont icon-shijian',
                          date: 'icon iconfont icon-rili',
                          up: 'icon iconfont icon-xiangshang',
                          down: 'icon iconfont icon-xiangxia',
                          previous: 'icon iconfont icon-houtui',
                          next: 'icon iconfont icon-qianjin',
                          today: 'icon iconfont icon-circle',
                          clear: 'icon iconfont icon-shanchu',
                          close: 'icon iconfont icon-guanbi'
                      }
                  };
                  var language = this.language;
                  if (language === null || language === "") {
                      if (this.$language) {
                          language = this.$language;
                      } else {
                          langauge = DEFAULT_LANGUAGE;
                      }
                  }
                  options.locale = this.getLanguageCode(language);

                  switch (this.type) {
                      case "date":
                          options.format = this.dateFormat;
                          break;
                      case "time":
                          options.format = this.timeFormat;
                          break;
                      case "datetime":
                      default:
                          options.format = this.datetimeFormat;
                          break;
                  }
               
                //   if (DEFAULT_I18N && DEFAULT_I18N.datetime_picker) {
                //       options.tooltips = DEFAULT_I18N.datetime_picker;
                //   }
                  // create the control
                    
                  $(this.$el).datetimepicker(options);
           
                  
                  this.control = $(this.$el).data("DateTimePicker");
                  // set the date to the current value of the model
                  this.control.date(this.model);
                  if (this.startDatetime !== null && new Date(this.startDatetime)) {
                       this.control.minDate(new Date(this.startDatetime));
                  }
                  if (this.endDatetime !== null && new Date(this.endDatetime)) {
                       this.control.maxDate(new Date(this.endDatetime));
                  }

                  var me = this;

                  $(this.$el).on("dp.change", function () {
                
                      if (! me.isChanging) {
                          me.isChanging = true;
                         if (me.dateUpdateFn && me.dateUpdateFn.length>0) {
                             me.$emit(me.dateUpdateFn, me.control.date());
                          }
                          me.$nextTick(function () {
                              me.isChanging = false;
                              if (me.onChange) {
                                  me.onChange(me.model);
                              }
                          });
                      }
                  });
              },
              getLanguageCode(locale) {
                  if (locale === null || locale.length === 0) {
                      return "en";
                  }
                  if (locale.length <= 2) {
                      return locale;
                  } else {
                      switch (locale) {
                          case "zh-CN":
                          case "zh-TW":
                          case "ar-MA":
                          case "ar-SA":
                          case "ar-TN":
                          case "de-AT":
                          case "en-AU":
                          case "en-CA":
                          case "en-GB":
                          case "fr-CA":
                          case "hy-AM":
                          case "ms-MY":
                          case "pt-BR":
                          case "sr-CYRL":
                          case "tl-PH":
                          case "tzm-LATN":
                          case "tzm":
                              return locale.toLowerCase();
                          default:
                              // reserve only the first two letters language code
                              return locale.substr(0, 2);
                      }
                  }
              }
          }
  }
</script>