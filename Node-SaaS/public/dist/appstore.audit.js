webpackJsonp([5],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['show', 'title', 'btns', 'mask', 'content'],
    methods: {
        pos: function pos() {
            var el = this.$el;

            el.style.marginLeft = -el.offsetWidth / 2;
            el.style.marginTop = -el.offsetHeight / 2;
        },
        dispatch: function dispatch(cb) {
            this.$emit('dialog', cb);
        }
    },
    watch: {
        show: function show(val) {
            val && this.pos();
        }
    }
});

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(1);
/**
 * 美洽客服模块
 * @author: wangkai<1021475334@qq.com>
 * @date: 2017/4/26
 */





// http request
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__["a" /* default */]);

function meiQiaAnimation() {
    var MEIQIA_BTN = document.getElementById('MEIQIA-BTN');
    var MEIQIA_BTN_TEXT = document.getElementById('MEIQIA-BTN-TEXT');

    if (MEIQIA_BTN_TEXT) {
        MEIQIA_BTN.onmousemove = function () {
            MEIQIA_BTN_TEXT.style.cssText = 'height: ' + (MEIQIA_BTN_TEXT.innerHTML.length * 20 + 5) + 'px !important';
        };

        MEIQIA_BTN.onmouseleave = function () {
            MEIQIA_BTN_TEXT.style.cssText = 'height: 0px!important';
        };
    }
}

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.get('/common/customer').then(function (response) {
    if (response.ok) {
        var _response$body$result = response.body.result,
            customerStatus = _response$body$result.customerStatus,
            customerToken = _response$body$result.customerToken,
            enterpriseName = _response$body$result.enterpriseName,
            userName = _response$body$result.userName,
            userId = _response$body$result.userId;


        var meiQiaId = 55929;

        if (customerToken && customerStatus === '1') {
            (function (m, ei, q, i, a, j, s) {
                m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
                j = ei.createElement(q);
                s = ei.getElementsByTagName(q)[0];
                j.async = true;
                j.charset = 'UTF-8';
                j.src = '//static.meiqia.com/dist/meiqia.js';
                s.parentNode.insertBefore(j, s);
            })(window, document, 'script', '_MEIQIA');

            _MEIQIA('entId', meiQiaId);
            _MEIQIA('allSet', meiQiaAnimation);
            _MEIQIA('metadata', {
                name: userName, // 美洽默认字段
                company: enterpriseName
            });
            _MEIQIA('clientId', userId);

            _MEIQIA('assign', {
                agentToken: customerToken
            });
        }
    }
});

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(12)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(14),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/anyuan/workspace/Node-SaaS/public/source/global/components/box.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] box.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d678afdc", Component.options)
  } else {
    hotAPI.reload("data-v-d678afdc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }]
  }, [(_vm.mask) ? _c('div', {
    staticClass: "boxmask"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "box",
    attrs: {
      "id": "box"
    }
  }, [(_vm.title) ? _c('header', {
    staticClass: "header"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('i', {
    staticClass: "close fa fa-times",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.dispatch('close')
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('span', [_vm._v(_vm._s(_vm.content))])]), _vm._v(" "), (_vm.btns) ? _c('footer', {
    staticClass: "footer"
  }, _vm._l((_vm.btns), function(btn) {
    return _c('span', {
      staticClass: "boxbtn",
      class: btn.class,
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.dispatch('close')
        }
      }
    }, [_vm._v("\n                " + _vm._s(btn.name) + "\n            ")])
  })) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d678afdc", module.exports)
  }
}

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['show', 'title', 'btns', 'mask'],
    methods: {
        pos: function pos() {
            var el = this.$el;

            el.style.marginLeft = -el.offsetWidth / 2;
            el.style.marginTop = -el.offsetHeight / 2;
        },
        dispatch: function dispatch(cb) {
            this.$emit('dialog', cb);
        }
    },
    watch: {
        show: function show(val) {
            val && this.pos();
        }
    }
});

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__global_global_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_global_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_audit_scss__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_audit_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_audit_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_resource__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_details_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_components_dialog_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_components_dialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__global_components_dialog_vue__);
/**
 * 应用市场 待审核
 * @author:zhuyingying
 * @date:2017.12.15
 */












// import VueSelect from '../global/components/vue-select.vue';
// import FileUpload from '../global/components/fileupload.vue';

__WEBPACK_IMPORTED_MODULE_3_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_resource__["a" /* default */]);

new __WEBPACK_IMPORTED_MODULE_3_vue___default.a({
    delimiters: ['[[', ']]'],
    el: '#audit-wrapper',
    components: {
        'app-details': __WEBPACK_IMPORTED_MODULE_5__components_details_vue___default.a,
        'x-dialog': __WEBPACK_IMPORTED_MODULE_6__global_components_dialog_vue___default.a
    },
    data: {
        auditApp: [{
            name: 'UED新申请1',
            desc: 'kdahfadghadfajksdhtguaeghajdfhjksahguidagshweuihfjaksdgfha',
            version: 'v1.0',
            creator: '信仰',
            published_at: '2017.11.12',
            auditStatus: 1
        }, {
            name: 'UED新申请2',
            desc: '哈哈哈哈哈哈哈爱的回复就爱看规划来看加热我哦我会发到数据库嘎哈噶接口的黄金卡嘎哈是健康的借口换房间卡号噶及控股哈空间爱等哈就看了都嘎哈可怜见对方哈根',
            version: 'v1.0',
            creator: '新阳',
            published_at: '2017.12.12',
            auditStatus: 1
        }, {
            name: 'UED新申请3',
            desc: '哈哈哈哈哈哈哈爱的回复就爱看规划来看加热我哦我会发到数据库嘎哈噶接口的黄金卡嘎哈是健康的借口换房间卡号噶及控股哈空间爱等哈就看了都嘎哈可怜见对方哈根',
            version: 'v1.0',
            creator: '新阳',
            published_at: '2017.12.12',
            auditStatus: 1
        }, {
            name: 'UED新申请4',
            desc: '哈哈哈哈哈哈哈爱的回复就爱看规划来看加热我哦我会发到数据库嘎哈噶接口的黄金卡嘎哈是健康的借口换房间卡号噶及控股哈空间爱等哈就看了都嘎哈可怜见对方哈根',
            version: 'v1.0',
            creator: '新阳',
            published_at: '2017.12.12',
            auditStatus: 1
        }],
        dialog: {
            title: null,
            mask: true,
            show: false
        },
        details: {}
    },
    methods: {
        showDetails: function showDetails(appid, key) {
            var dialog = document.getElementById('dialog'),
                app = document.querySelector('.audit-content'),
                left = app.offsetLeft + 100 + 'px',
                _this = this;

            dialog.style.left = left;
            dialog.style.width = '1000px';
            dialog.style.height = '815px';
            this.dialog.show = true;

            // this.$http.get('appContent').then(function(res) {
            //     if (res.status === 200 && res.ok) {
            //         _this.details.detailData = res.body;
            //     }
            // });
            this.details = this.auditApp[key];
        },

        // dialog event
        dialogEvent: function dialogEvent(type) {
            this[type]();
        },
        close: function close() {
            this.dialog.show = false;
        },
        cancel: function cancel() {
            this.close();
        }
    },
    mounted: function mounted() {},
    watch: {}
});

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }]
  }, [(_vm.mask) ? _c('div', {
    staticClass: "mask"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "dialog",
    attrs: {
      "id": "dialog"
    }
  }, [(_vm.title) ? _c('header', {
    staticClass: "header"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('i', {
    staticClass: "close fa fa-times",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.dispatch('close')
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.btns) ? _c('footer', {
    staticClass: "footer"
  }, _vm._l((_vm.btns), function(btn) {
    return _c('span', {
      staticClass: "btn",
      class: btn.class,
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.dispatch(btn.cb)
        }
      }
    }, [_vm._v("\n                " + _vm._s(btn.name) + "\n            ")])
  })) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8d16975e", module.exports)
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(44)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/anyuan/workspace/Node-SaaS/public/source/appstore/components/details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bdc623a8", Component.options)
  } else {
    hotAPI.reload("data-v-bdc623a8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tinycon__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tinycon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_tinycon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ellipsis_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ellipsis_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ellipsis_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_box_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_customer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_perfect_scrollbar_src_css_main_scss__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_perfect_scrollbar_src_css_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_perfect_scrollbar_src_css_main_scss__);








// import QRCode from 'qrcodejs2';




var icon = {
    checked: 'fa-check-square',
    unchecked: 'fa-square'
};

// http request
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__["a" /* default */]);

/**
 * 移除初始主题色
 */
var _removeDefTheme = function _removeDefTheme($dom) {
    $dom.className = $dom.className.replace(/\s+(black|purple|blue)/g, '');
};

var query = document.querySelector.bind(document);
var _ = __webpack_require__(23);

// side component
var side = void 0;

// header app
new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    el: '#x-header-app',
    data: {
        showSkinList: false,
        showUserSet: false,
        showSearchBox: false,

        showInform: false,

        sideOpen: false,

        theme: '',

        modules: [], // 搜索时可跳转的模块

        timer: '', // 运营通告周期性调用

        key: '', // 全局搜索关键词

        showHistory: false, // 全局搜索历史记录
        showModuleSearch: false, // 全局搜索模块智能提醒,

        countDown: '', // 倒计时，通知公告倒计时
        qrcodeShow: false,
        bothShow: false,
        qycodeFlag: '',
        qycode: false,
        safecode: false,
        qycodeShow: true,
        box: {
            title: '提示',
            mask: true,
            show: false,
            content: '该用户已经禁用托管功能!',
            btns: [{
                name: '关闭',
                cb: 'sure'
            }]
        }
    },
    components: {
        'x-box': __WEBPACK_IMPORTED_MODULE_5__components_box_vue___default.a
    },
    methods: {
        // 切换皮肤列表显示
        toggleSkinList: function toggleSkinList() {
            this.showSkinList = !this.showSkinList;

            //
            // if (this.showUserSet) {
            //     this.showUserSet = false;
            // }
        },

        // 切换用户设置显示
        toggleUserSet: function toggleUserSet() {
            this.showUserSet = !this.showUserSet;

            if (this.showSkinList) {
                this.showSkinList = false;
            }
        },

        // 切换皮肤
        toggleSkin: function toggleSkin(skin) {
            if (skin === this.theme) {
                return;
            }

            // toggle checked
            var origin = query('.skin-li .' + icon.checked).classList;
            var current = query('.skin-li .' + skin).classList;

            origin.add(icon.unchecked);
            origin.remove(icon.checked);

            current.add(icon.checked);
            current.add(icon.unchecked);

            // 切换header和side中的样式
            // 移除主题样式
            _removeDefTheme(this.$el.parentNode);

            this.theme = skin;
            side && side.$emit('theme', skin);

            // 隐藏皮肤列表
            this.showSkinList = false;

            // 更新数据(综合体验考虑，此处不考虑失败情况)
            this.$http.put('/common/theme', {
                theme: skin,
                userId: query('.changeTheme').dataset.trusterid
            });
        },

        // 切换搜索框的显示
        toggleSearchBox: function toggleSearchBox(show) {
            var _this = this;

            this.showSearchBox = show;

            if (show) {
                this.$nextTick(function () {
                    _this.$refs.search.focus();
                });
            } else {
                this.$refs.search.value = '';
            }
        },

        // 搜索
        search: function search() {
            // 添加搜索数据
            this.$http.get('/common/addHistory', {
                params: {
                    keyword: query('.search-input').value
                }
            });

            if (this.key) {
                location.href = '/globalsearch/#!/all/' + this.key;
            } else {
                location.href = '/globalsearch/suggestion/';
            }
        },

        // 历史记录中搜索
        histroySearch: function histroySearch(key) {
            location.href = '/globalsearch/#!/all/' + key;
        },

        // 模块搜索
        changeSearch: function changeSearch() {
            var _this = this;
            var value = this.$refs.search.value;

            if (value) {
                this.$http.get('/common/addHistory', {
                    params: {
                        keyword: value
                    }
                }).then(function (res) {
                    if (res.ok) {
                        if (res.body.result.data.length) {
                            _this.modules = res.body.result.data;
                            _this.showHistory = false;
                            _this.showModuleSearch = true;
                        } else {
                            _this.showModuleSearch = false;
                            _this.showHistory = false;
                        }
                    }
                });
            } else {
                _this.showModuleSearch = false;
                _this.showHistory = true;
            }
        },

        // 是否显示历史记录
        doHistory: function doHistory() {
            var value = this.$refs.search.value;

            if (!value) {
                this.showHistory = true;
            }
        },

        // 隐藏历史记录和模块搜索
        hideHistroy: function hideHistroy() {
            this.showHistory = false;
            this.showModuleSearch = false;
        },

        // 删除一条历史记录
        deleteOneHistory: function deleteOneHistory(e) {
            e.stopPropagation();
            var history = e.target.parentNode.querySelector('.history-content');

            this.$http.get('/common/clearOneHistory', {
                params: {
                    keyword: history.innerText
                }
            }).then(function (res) {
                if (res.ok) {
                    e.target.style.display = 'none';
                    history.parentNode.removeChild(history);
                }
            });
        },

        // 删除所有历史记录
        deleteAllHistory: function deleteAllHistory() {
            var _this = this;

            this.$http.get('/common/clearAllHistory').then(function (res) {
                if (res.ok) {
                    _this.showHistory = false;
                    query('.search-box').removeChild(query('.search-history'));
                }
            });
        },

        // 切换用户
        toggleRole: function toggleRole(id) {
            this.$http.get('/common/switchUser', {
                params: {
                    id: id
                }
            }).then(function (res) {
                if (res.body.success) {
                    window.location.href = '/user/workbench';
                } else if (res.body.error.indexOf('禁用') !== -1) {
                    // alert('您好，' + name + '的账号已被禁用，请切换到其它账号登录！');
                    this.box.show = true;
                } else {
                    history.go(0);
                }
            });
        },

        // 关闭提示弹框
        dialogEvent: function dialogEvent() {
            this.box.show = false;
        },

        // 切换企业
        toggleEnt: function toggleEnt(id) {
            this.$http.get('/common/switchEnterprise', {
                params: {
                    id: id
                }
            }).then(function (res) {
                if (res.ok) {
                    window.location.href = '/user/workbench';
                }
            });
        },

        // 关闭运营通告
        closeInform: function closeInform(informId, userId) {
            this.showInform = false;
            clearInterval(this.timer);

            if (window.localStorage) {
                window.localStorage.setItem(userId + '_closeIntroduceText', true);
                console.log(localStorage.getItem(userId + '_closeIntroduceText'));
                window.localStorage.setItem(userId + '_informId', informId);
            }
        },

        // 移入／出企业切换或账户切换展示／隐藏列表
        inLi: function inLi(type, inOrOut) {
            var $el = document.getElementsByClassName(type + '-list')[0];

            if (!$el) {
                return;
            }

            if (inOrOut) {
                $el.style.display = 'block';
            } else {
                this.time = setTimeout(function () {
                    $el.style.display = 'none';
                }, 100);
            }
        },

        // 移入子列表则取消消失的time
        // 某些浏览器滚动条不属于移入区域
        hoverList: function hoverList() {
            if (this.time) {
                clearTimeout(this.time);
            }
        },

        // 当前企业
        activeEnt: function activeEnt() {
            var _entid = query('.ent-list');

            if (_entid) {
                query('li[data-eid = "' + _entid.dataset.entid + '" ]').classList.add('active');
            }
        },

        // 当前用户
        activeUser: function activeUser(_userId) {
            var _user = query('li[data-uid = "' + _userId + '" ]');

            if (_user) {
                _user.classList.add('active');
            }
        },

        // 显示二维码
        qrcode: function qrcode() {
            if (this.qycodeFlag === 'one') {
                this.qrcodeShow = true;
                this.bothShow = false;
            } else if (this.qycodeFlag === 'both') {
                this.qrcodeShow = false;
                this.bothShow = true;
            }
        },

        // 隐藏二维码
        qrcodeNotshow: function qrcodeNotshow() {
            this.qrcodeShow = false;
            this.bothShow = false;
        },

        // 生成二维码
        setqrcode: function setqrcode() {
            var list = query('.changeTheme');
            var appId;
            var _this = this;

            if (list) {
                appId = list.dataset.entid;
                if (appId === 'TianJinJinAnZhongGo1') {
                    // 金岸重工二维码隐藏
                    this.qycodeShow = false;
                    this.qrcodeShow = false;
                    this.bothShow = false;
                }
                this.$http.get('/api/apk/getapk', {
                    params: {
                        ent: appId
                    }
                }).then(function (res) {
                    var apkent = res.body.apkent;

                    if (apkent === 'public_cloud') {
                        // 公有云
                        _this.qycodeFlag = 'one';
                        _this.qycode = true;
                        _this.safecode = false;
                    } else if (apkent === '51safety') {
                        // 私有云
                        _this.qycodeFlag = 'one';
                        _this.qycode = false;
                        _this.safecode = true;
                    } else {
                        _this.qycodeFlag = 'both';
                    }
                });
            }
        }
    },

    created: function created() {
        var _this2 = this;

        this.setqrcode();
        var _userId = query('.skin.tool').dataset.uid;

        var _number = query('.countdown-number');

        if (_number) {
            this.countDown = _number.dataset.count * 1;

            setInterval(function () {
                --_this2.countDown;
            }, 60000);
        }

        // 运营通告是否显示
        // 判断该运营通告是否已关闭过
        var _closeInfo = query('.close-inform');

        if (_closeInfo && localStorage.getItem(_userId + '_informId') !== _closeInfo.dataset.ifid) {
            localStorage.removeItem(_userId + '_closeIntroduceText');
        }

        // 判断是否显示运营通告
        if (!localStorage.getItem(_userId + '_closeIntroduceText')) {
            this.showInform = true;
        }

        // 当前企业
        this.activeEnt();

        // 当前用户
        this.activeUser(_userId);

        query('body').addEventListener('click', function () {
            _this2.showSkinList = false;
            _this2.showUserSet = false;
        });
    },

    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_3_ellipsis_js___default()({
            lines: 3,
            class: '.inform-intro'
        });

        var $ent = document.getElementById('ent-list');
        var $role = document.getElementById('role-list');

        $ent && __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar___default.a.initialize($ent);
        $role && __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar___default.a.initialize($role);
    },


    delimiters: ['[[', ']]']
});

// side app
side = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    el: '#x-aside-app',
    data: {
        isOne: false,
        isOpen: false,
        activeLink: window.location.pathname + window.location.hash,
        theme: '',
        menulist: [],
        secondlistShow: false,
        MenuShow: false,
        noticeList: [],
        noticeShow: false,
        target: '',
        hideTimer: null,
        itemList: [],
        delayShow: null
    },
    mounted: function mounted() {
        var $menu = document.getElementById('menu-content');
        var $second = document.getElementById('second-content');

        $menu && __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar___default.a.initialize($menu);
        $second && __WEBPACK_IMPORTED_MODULE_4_perfect_scrollbar___default.a.initialize($second);
    },

    methods: {
        // 全局菜单
        menuSwitch: function menuSwitch() {
            this.$http.get('/api2/appcenter/applist/id').then(function (res) {
                this.menulist = res.body.result;
            });
        },

        // menu通知显示
        showmenuNotices: function showmenuNotices() {
            var obj, objlist, noticecount, appid, node, nodeNotice, span, a;

            this.$http.get('/api2/notice/all', {
                params: {
                    url: this.activeLink.replace('app/#!', 'app/!')
                }
            }).then(function (res) {
                this.noticeList = res.body.result.menu.count;
                _.each(this.noticeList, function (id, count) {
                    appid = count;
                    obj = document.getElementsByClassName('menu-name');
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].dataset.appid === appid) {
                            node = document.createElement('em');
                            obj[i].appendChild(node);
                        }
                    }

                    objlist = document.getElementsByClassName('noticeMenu');
                    _.each(objlist, function (val) {
                        if (val.dataset.appid === appid) {
                            // nodeNotice = document.createElement('em');

                            nodeNotice = document.createElement('div');
                            nodeNotice.className = 'bubble';

                            noticecount = Number(id) > 99 ? 99 : Number(id);
                            nodeNotice.innerHTML = noticecount;
                            span = document.getElementById(appid);
                            a = span.getElementsByTagName('a')[0];

                            a.appendChild(nodeNotice);
                        }
                    });
                });
            });
        },
        btnleave: function btnleave(show) {
            if (show) {
                this.MenuShow = true;
            } else {
                query('.second-content').style.display = 'none';
                this.MenuShow = false;
            }
        },

        // 显示一级菜单
        showMenuList: function showMenuList(event, show) {
            var left = event.clientX,
                x,
                top = event.clientY;

            top = top > 172 || top < 112 ? false : true;
            if (top && left < 56) {
                this.MenuShow = true;
                query('.second-content').style.display = 'none';
                for (x = 0; x < this.itemList.length; x++) {
                    this.itemList[x].classList.remove('itemactive');
                }
            } else {
                this.MenuShow = show;
                if (!show) {
                    query('.second-content').style.display = 'none';
                    for (x = 0; x < this.itemList.length; x++) {
                        this.itemList[x].classList.remove('itemactive');
                    }
                }
            }
        },

        switchMenuDiv: function switchMenuDiv(event, show, level, index) {
            var _this = this;

            if (this.hideTimer !== null) {
                clearTimeout(this.hideTimer);
            }
            if (this.delayShow !== null) {
                clearTimeout(this.delayShow);
            }
            switch (level) {
                case 1:
                    if (show) {
                        // 一级菜单控制二三级菜单
                        _this.delayShow = setTimeout(function () {
                            _this.showSecondList(event, index, show);
                        }, 160);

                        // _this.showSecondList(event, index, show);
                    }
                    break;
                case 3:
                    if (show) {
                        // 二三级菜单显示或隐藏
                        _this.showLast(true);
                    } else {
                        this.hideTimer = setTimeout(function () {
                            query('.second-content').style.display = 'none';
                        }, 100);
                    }
                    break;
                default:
                    if (show) {
                        // 菜单消失
                        clearTimeout(_this.delayshow);
                        _this.showMenuList(event, true);
                    } else {
                        this.hideTimer = setTimeout(function () {
                            _this.showMenuList(event, false);
                        }, 100);
                    }
                    break;
            }
        },
        showLast: function showLast(flag) {
            if (flag) {
                query('.second-content').style.display = 'flex';
            }
        },
        changeActive: function changeActive(flag) {
            var activeList = document.querySelectorAll('.bt-img');

            for (var x = 0; x < activeList.length; x++) {
                activeList[x].classList.remove('bt-theme-active');
            }
            if (!flag) {
                if (this.activeLink.indexOf('user/workbench') > -1) {
                    query('.bt-workbench').className += ' bt-theme-active';
                } else if (this.activeLink.indexOf('dashboard') > -1) {
                    query('.bt-dashboard').className += ' bt-theme-active';
                } else {
                    query('.bt-appcenter').className += ' bt-theme-active';
                }
            }
        },

        // 二三级菜单显示
        showSecondList: function showSecondList(event, index, flag) {
            var itemlist = document.getElementsByClassName('second-content-wrap'),
                show = '#category-item-' + index,
                scrollWidth,
                clientWidth,
                actualWidth = document.documentElement.clientWidth || document.body.clientWidth,
                newWidth,
                leaveWidth;

            query('.second-content').style.display = 'flex';
            for (var i = 0; i < itemlist.length; i++) {
                itemlist[i].style.display = 'none';
            }
            if (flag) {
                this.itemList = document.querySelectorAll('.menu-list');
                for (var x = 0; x < this.itemList.length; x++) {
                    this.itemList[x].classList.remove('itemactive');
                }
                query('.fore-' + index).className += ' itemactive';
                query(show).style.display = 'flex';
                scrollWidth = query(show).scrollWidth;
                clientWidth = query('.second-content').offsetWidth;
                if (scrollWidth + 265 > actualWidth || scrollWidth + 30 > actualWidth) {
                    if (actualWidth <= 1500 && actualWidth >= 1200) {
                        newWidth = 959;
                    } else if (actualWidth > 1500 && actualWidth <= 1750) {
                        newWidth = 1150;
                    } else if (actualWidth > 1750) {
                        newWidth = 1528;
                    } else {
                        newWidth = 777;
                    }
                    leaveWidth = newWidth - 10;
                    query(show).style.width = newWidth + 'px';
                    query(show).style.minWidth = newWidth + 'px';
                    if (query(show).offsetLeft < 0) {
                        query('.leftButton').style.display = 'block';
                    } else {
                        query('.rightButton').style.display = 'block';
                    }

                    query('.rightButton').onclick = function () {
                        if (query(show).offsetLeft > -leaveWidth) {
                            query(show).style.position = 'relative';
                            query(show).style.left = -leaveWidth + 'px';
                        }
                        query('.rightButton').style.display = 'none';
                        query('.leftButton').style.display = 'block';
                        query('.leftButton').onclick = function () {
                            if (query(show).offsetLeft < 0) {
                                query(show).style.left = '0px';
                                query('.rightButton').style.display = 'block';
                                query('.leftButton').style.display = 'none';
                            }
                        };
                    };
                } else if (scrollWidth > clientWidth) {
                    query(show).style.width = scrollWidth + 16 + 'px';
                    query(show).style.minWidth = scrollWidth + 16 + 'px';
                    query('.rightButton').style.display = 'none';
                    query('.leftButton').style.display = 'none';
                } else if (scrollWidth + 16 === clientWidth) {
                    query('.rightButton').style.display = 'none';
                    query('.leftButton').style.display = 'none';
                } else {
                    query('.rightButton').style.display = 'none';
                    query('.leftButton').style.display = 'none';
                }
            } else {
                query('.second-content').style.display = 'none';
                for (var _x = 0; _x < this.itemList.length; _x++) {
                    this.itemList[_x].classList.remove('itemactive');
                }
            }
        }
    },
    filters: {
        filterFun: function filterFun(value) {
            return value.substr(0, 8);
        }
    },
    delimiters: ['[[', ']]'],
    created: function created() {
        var _this = this;

        this.menuSwitch();
        this.showmenuNotices();

        // 由header组件改变theme
        this.$on('theme', function (skin) {
            _removeDefTheme(this.$el.parentNode);
            _this.theme = skin;
        });
    }
});

//  title气泡
var count = document.title.match(/^\((\d)*\)/);

if (count) {
    count = count[1];

    __WEBPACK_IMPORTED_MODULE_2_tinycon___default.a.setOptions({
        width: 4,
        height: 5,
        background: '#f00',
        color: '#f00'
    });

    __WEBPACK_IMPORTED_MODULE_2_tinycon___default.a.setBubble('.'); // . for placeholder
}

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_element_ui__["Carousel"]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_element_ui__["CarouselItem"]);

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['detailData'],
    created: function created() {
        console.log(this.detailData);
    }
});

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details"
  }, [_c('div', {
    staticClass: "details-top clearfix"
  }, [_c('div', {
    staticClass: "top-nav"
  }, [_c('i', {
    staticClass: "iconfont",
    class: _vm.detailData.icon ? 'icon-' + _vm.detailData.icon : 'xiugai',
    style: ({
      color: _vm.detailData.color
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "top-section"
  }, [_c('div', {
    staticClass: "app-name"
  }, [_vm._v(_vm._s(_vm.detailData.name))]), _vm._v(" "), _c('div', {
    staticClass: "app-desc"
  }, [_vm._v("\n                " + _vm._s(_vm.detailData.desc) + "\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "top-btns"
  }, [(_vm.detailData.status === 0) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("未安装")]) : _vm._e(), _vm._v(" "), (_vm.detailData.status === 1) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("安装中")]) : _vm._e(), _vm._v(" "), (_vm.detailData.status === 2) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("已安装")]) : _vm._e(), _vm._v(" "), (_vm.detailData.auditStatus === 1) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("通过")]) : _vm._e(), _vm._v(" "), (_vm.detailData.auditStatus === 1) ? _c('div', {
    staticClass: "btn-refuse"
  }, [_vm._v("驳回")]) : _vm._e(), _vm._v(" "), (_vm.detailData.auditStatus === 2) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("撤销申请")]) : _vm._e(), _vm._v(" "), (_vm.detailData.auditStatus === 3) ? _c('div', {
    staticClass: "btn-allow"
  }, [_vm._v("重新申请")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "details-middle"
  }, [_c('div', {
    staticClass: "middle-nav"
  }, [_vm._v("工作汇报下载信息")]), _vm._v(" "), _c('div', {
    staticClass: "middle-section"
  }, [_c('div', {
    staticClass: "app-creator"
  }, [_c('span', [_vm._v("发布者")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.detailData.creator))])]), _vm._v(" "), _c('div', {
    staticClass: "app-time"
  }, [_c('span', [_vm._v("发布时间")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.detailData.published_at))])]), _vm._v(" "), _c('div', {
    staticClass: "app-version"
  }, [_c('span', [_vm._v("版本号")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.detailData.version))])])])]), _vm._v(" "), _c('div', {
    staticClass: "details-footer"
  }, [_c('div', {
    staticClass: "footer-nav"
  }, [_vm._v("工作汇报应用截图")]), _vm._v(" "), _c('div', {
    staticClass: "footer-imgs"
  }, [_c('el-carousel', {
    attrs: {
      "trigger": "click",
      "height": "435px"
    }
  }, _vm._l((_vm.detailData.images), function(banner, index) {
    return _c('el-carousel-item', {
      key: index
    }, [_c('img', {
      staticClass: "image-content",
      attrs: {
        "src": banner.image,
        "title": banner.title
      }
    })])
  }))], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bdc623a8", module.exports)
  }
}

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(17)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/anyuan/workspace/Node-SaaS/public/source/global/components/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d16975e", Component.options)
  } else {
    hotAPI.reload("data-v-8d16975e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

},[176]);