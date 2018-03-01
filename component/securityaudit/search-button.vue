<template>
    <section>
        <button class="btn-clear condition-btn" @click="clearCondition">清空</button>
        <button class="btn-search condition-btn" @click="searchByCondition">查询</button>
        <button class="btn-export condition-btn" @click="exportRecords">导出</button>
    </section>
</template>

<style>
    .condition-btn {
        width: 85px;
        height: 32px;
        line-height: 32px;
        background: #fff;
        color: #4680ff;
        border: 1px solid #4680ff;
    }
    .btn-search, .btn-export {
        color: #fff;
        background-color: #4680ff;
    }
</style>

<script>
    import {mapState} from 'vuex';
    import _ from 'lodash';

    export default {
        computed: {
            ...mapState([
                'actived',
                'condition',
                'loginCondition',
                'limit',
                'page',
                'searchStatus',
                'checkIds',
            ])
        },
        methods: {
            clearCondition() {
                let _condition = this.actived === 'userlogin' ? this.loginCondition : this.condition;
                _condition = _.mapValues(_condition, (val, key) => {
                    return key === 'endTime' || key === 'startTime' ? null : '';
                });
                this.$store.commit('updateCondition', _condition);
                this.$store.commit('changeSearchStatus', false);
                this.$store.dispatch('getData');
            },
            searchByCondition() {
                this.$store.commit('changeSearchStatus', true);
                this.$store.dispatch('getData');

            },
            exportRecords() {
                let vm = this;
                let url = '/logger/ExportLoginLog';
                let {limit, page, searchStatus, condition, loginCondition, actived, checkIds} = this;
                let params = {
                    limit,
                    page,
                    id: checkIds
                };
                if (actived === 'userlogin') {
                    if (searchStatus) {
                        params.search = loginCondition;
                    }
                } else {
                    url = '/logger/ExportSafeLog';
                    if (searchStatus) {
                        params.search = _.extend(condition, {
                            userType: actived === 'useroperate' ? 0: 1
                        });
                    } else {
                        params.search = {
                            userType: actived === 'useroperate' ? 0: 1
                        };
                    }
                }

                $.ajax({
                    url,
                    data: params,
                    dataType: 'JSON',
                    success(res) {
                        if (res.status === 200) {
                            vm.$store.commit('updateAlertInfo', {
                                show: true,
                                alert: {
                                    type: 'success',
                                    text: '导出成功'
                                }
                            });
                        } else {
                            vm.$store.commit('updateAlertInfo', {
                                show: true,
                                alert: {
                                    type: 'danger',
                                    text: '导出失败'
                                }
                            });
                        }
                    },
                    error(error) {
                        throw error.responseText;
                    }
                });
            }
        }
    }
</script>