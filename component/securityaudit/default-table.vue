<template>
    <section>
        <datatable :table-data="tableData" @getDatatabledata="getPageInfo">
            <tr slot="datatable-head">
                <th class="datatable-checkbox">
                    <input type="checkbox" name="checkAll"
                           :checked="checkIds.length === prevData.length && prevData.length"
                           @change="toggleCheck"/>
                </th>
                <th v-for="(column, index) in aoColumns"
                    :style="{width: column.sWidth}"
                    :class="{sorting: column.bSortable}"
                >
                    {{column.sTitle}}
                    <i class="iconfont" :class="column.icon" v-if="column.bSortable" @click="sort(column)"></i>
                </th>
            </tr>

            <tr slot="datatable-body" v-for="(aData, ind) in tableData.aoData"
                v-show="aData.length && tableData.aoData[ind-1].details.isOpen || !aData.length">
                <td v-if="!aData.length">
                    <input type="checkbox" name="checkOne"
                           :checked="checkIds.indexOf(aData.id) > -1"
                           @change="toggleOne(aData.id)"
                    />
                </td>
                <td v-for="column in aoColumns" v-if="!aData.length">
                    <ul v-if="column.mDataProp === 'operator'">
                        <li v-for="opt in aData.operator">
                            {{opt}}
                        </li>
                    </ul>
                    <div v-if="['details', 'operationObject', 'operator'].indexOf(column.mDataProp) < 0">
                        {{aData[column.mDataProp]}}
                    </div>
                    <div v-if="column.mDataProp === 'operationObject'">
                        <operate-object :data="aData"></operate-object>
                    </div>
                    <div v-if="column.mDataProp === 'details'">
                        {{aData[column.mDataProp].title}}
                        <i class="icon-details iconfont" v-if="aData[column.mDataProp].isDetail"
                           :class="aData[column.mDataProp].isOpen ? 'icon-shouqi-' :'icon-xiala-'"
                           @click="showDetails(ind)"
                        ></i>
                    </div>
                </td>
                <td v-if="aData.length" v-for="(adata, index) in aData" :colspan="index > 0 ? 4: 5">
                    <operate-details :data="tableData.aoData[ind-1]" :details="adata" :num="index">
                    </operate-details>
                </td>
            </tr>

            <div slot="datatable-empty">
                <div>暂无数据</div>
            </div>
        </datatable>
    </section>
</template>

<style>
    .datatable-head .iconfont, .icon-details {
        font-size: 12px;
        cursor: pointer;
    }
</style>

<script>
    import Qs from 'querystring';
    import Moment from 'moment';
    import Vue from 'vue';
    import Axios from 'axios';
    import Datatable from '../components/datatable.vue';
    import OperateObject from './operate-object.vue';
    import OperateDetails from './operate-details.vue';

    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                tableData: {
                    aoData: [],
                    aoCount: 0
                },
                prevData: [],
                aoColumns: [
                    {sTitle: '操作人', mDataProp: 'operator', bSortable: false, icon: 'icon-paixu', sWidth: '10%'},
                    {sTitle: '操作时间', mDataProp: 'dateTime', bSortable: false, icon: 'icon-paixu', sWidth: '10%'},
                    {sTitle: '操作类型', mDataProp: 'operationType', bSortable: false, icon: 'icon-paixu',sWidth: '10%'},
                    {sTitle: '操作模块', mDataProp: 'operationModule', bSortable: false, icon: 'icon-paixu', sWidth: '20%'},
                    {sTitle: '操作对象', mDataProp: 'operationObject', bSortable: false, icon: 'icon-paixu', sWidth: '25%'},
                    {sTitle: 'IP地址', mDataProp: 'IP', bSortable: false, icon: 'icon-paixu', sWidth: '10%'},
                    {sTitle: '操作结果', mDataProp: 'operationResult', bSortable: false, icon: 'icon-paixu', sWidth: '5%'},
                    {sTitle: '详情', mDataProp: 'details', bSortable: false, icon: 'icon-paixu', sWidth: '5%'}
                ],
                checkIds: [],
                hasDetails: {
                    '数据流': ['新增', '导入', '修改', '共享', '导出'],
                    '工作流': ['添加', '复制', '处理', '导出'],
                    '组织架构': ['新增', '编辑', '新增节点','编辑节点'],
                    '角色组任命': ['新增','修改'],
                    '监控': ['新增', '修改','删除']
                }

            }
        },
        computed: {
            ...mapState([
                'actived',
                'condition',
                'resData'
            ])
        },
        watch: {
            resData(value) {
                this.parseData(value);
            },
            actived() {
                this.$store.commit('changeSearchStatus', false);
                this.$store.dispatch('getData');
            }
        },
        methods: {
            //checkbox选中的逻辑
            toggleCheck(event) {
                let checked = event.target.checked;
                if (checked) {
                    this.checkIds = this.prevData.map(aData => aData.id);
                } else {
                    this.checkIds = [];
                }
            },
            toggleOne(id) {
                if (_.includes(this.checkIds, id)) {
                    let index = this.checkIds.indexOf(id);
                    this.checkIds.splice(index, 1);
                } else {
                    this.checkIds.push(id);
                }
            },
            //排序的逻辑
            sort(column) {
                switch (column.icon) {
                    case 'icon-paixu':
                        column.icon = 'icon-zhengxu';
                        break;
                    case 'icon-zhengxu':
                        column.icon = 'icon-daoxu';
                        break;
                    case 'icon-daoxu':
                        column.icon = 'icon-zhengxu';
                        break;
                }
            },
            getPageInfo(pageInfo) {
                this.$store.commit('updatePageInfo', pageInfo);
                this.$store.dispatch('getData');
            },
            showDetails(ind) {
                _.each(this.tableData.aoData, (_data, _index) => {
                    if (typeof _data.details !== 'undefined' && _data.details.isDetail &&
                        _index !== ind && _data.details.isOpen) {
                        this.tableData.aoData[_index].details.isOpen = false;
                    }
                });
                this.tableData.aoData[ind].details.isOpen = !this.tableData.aoData[ind].details.isOpen;
            },
            parseData(data) {
                let aoData = [];
                this.tableData.aoCount = data.count;
                this.prevData = _.values(data.data);
                _.each(data.data, aData => {
                    //截取详情
                    let details = _.pick(aData, 'details');
                    details = typeof details.details !== 'undefined' ? details.details: details;
                    let operatorList = [];

                    //处理操作人
                    if (typeof aData.Operator.trustName !== 'undefined') {
                        operatorList.push(`${aData.Operator.name}(${aData.Operator.id})`);
                        operatorList.push(`代理：${aData.Operator.trustName}(${aData.Operator.trustId})`);
                    } else {
                        operatorList.push(`${aData.Operator.name}(${aData.Operator.id})`);
                    }
                    aData.operator = operatorList;

                    //处理操作结果, 因为现在只有成功才被获取
                    aData.operationResult = '成功';

                    //处理操作类型
                    aData.optType = aData.operationType;
                    if (aData.operationType.indexOf('-') > -1) {
                        let oType = aData.operationType.split('-');
                        if (oType.length > 2) {
                            aData.operationType = `${oType[1]}-${oType[2]}`;
                        } else {
                            aData.operationType = oType[1];
                        }
                    }

                    //处理时间
                    aData.dateTime = moment.unix(aData.dateTime).format('YYYY-MM-DD HH:mm:ss');

                    //处理详情列
                    if (aData.optType.indexOf('-') > -1) {
                        let optType = aData.optType.split('-');
                        if (typeof this.hasDetails[_.first(optType)] !=='undefined' &&
                            this.hasDetails[_.first(optType)].indexOf(optType[1]) > -1
                        ) {
                            aoData.push(_.extend(aData, {
                                details: {
                                    title: '详情',
                                    isOpen: false,
                                    isDetail: true
                                }
                            }));
                            aoData.push([details, details]);
                        } else {
                            aoData.push(_.extend(aData, {
                                details: {
                                    title: '-',
                                    isDetail: false
                                }
                            }));
                        }
                    } else {
                        aoData.push(_.extend(aData, {
                            details: {
                                title: '-',
                                isDetail: false
                            }
                        }));
                    }

                });
                this.tableData.aoData = aoData;
            }
        },
        components: {
            Datatable,
            OperateObject,
            OperateDetails
        },
        created() {
            this.$store.commit('changeSearchStatus', false);
            this.$store.dispatch('getData');
        }
    }


</script>