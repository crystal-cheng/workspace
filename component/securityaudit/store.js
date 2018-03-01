import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        mongoId: '',
        limit: 15,
        page: 1,
        actived: 'userlogin',
        loginCondition: {
            user: '',
            endTime: null,
            startTime: null,
            address: '',
            operation: ''
        },
        condition: {
            operator: '',
            operationType: '',
            operationModule: '',
            operationObject: '',
            endTime: null,
            startTime: null
        },
        resData: {},
        searchStatus: false,
        checkIds: [],
        show: false,
        alert: {
            type: '',
            text: ''
        }

    },
    mutations: {
        updateActived(state, payload) {
            state.actived = payload;
            state.mongoId = '';
        },
        updateCondition(state, payload) {
            if (state.actived === 'userlogin') {
                loginCondition = payload;
            } else {
                state.condition = payload;
            }
        },
        updateResData(state, payload) {
            let {data} = payload;
            if (typeof data !== 'undefined') {
                state.mongoId =_.last(_.keys(data));
            }
            state.resData = payload;
        },
        updatePageInfo(state, payload) {
            let {page, perPage} = payload;
            state.limit = perPage;
            state.page = page;
        },
        changeSearchStatus(state, payload) {
            state.searchStatus = payload;
        },
        updateCheckIds(state, payload) {
            state.checkIds = payload;
        },
        //alert弹框数据
        updateAlertInfo(state, payload) {
            let {show, alert} = payload;
            state.show = show;
            state.alert = alert;
        }
    },
    actions: {
        getData({commit, state}) {
            let params = {
                mongoId: state.mongoId,
                limit: state.limit,
                page: state.page
            };
            let url = '/logger/GetLoginLogger';
            let _condition = state.actived === 'userlogin' ? state.loginCondition : state.condition;
            if (state.searchStatus && !_.isEmpty(_condition)) {
                params.search = _condition;
            };
            if (state.actived === 'userlogin') {
                url = '/logger/GetLoginLogger';
            } else {
                url = '/logger/GetLoger';
            }
            //用户操作日志需要加入userType参数
            if (state.actived === 'useroperate') {
                params.search = typeof params.search !== 'undefined' ? Object.assign(params.search, {
                    userType: 0
                }): {userType: 0};
            } else if (state.actived === 'adminoperate') {
                params.search = typeof params.search !== 'undefined' ? Object.assign(params.search, {
                    userType: 1
                }): {userType: 1};
            }

            $.ajax({
                url,
                data: params,
                dataType: 'JSON',
                success(res) {
                    commit('updateResData', res);
                },
                error(error) {
                    throw error.responseText;
                }
            });

        }
    }
});

export default store;