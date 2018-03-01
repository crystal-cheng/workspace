<template>
    <section>
        <datatable :table-data="tableData" @getDatatabledata="getPageInfo">
            <tr slot="datatable-head">
                <th class="datatable-checkbox">
                    <input type="checkbox" name="checkAll"
                           :checked="checkIds.length === tableData.aoData.length && tableData.aoData.length"
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
            <tr slot="datatable-body" v-for="aData in tableData.aoData">
                <td>
                    <input type="checkbox" name="checkOne"
                           :checked="checkIds.indexOf(aData.id) > -1"
                           @change="toggleOne(aData.id)"
                    />
                </td>
                <td v-for="column in aoColumns">
                    {{aData[column.mDataProp]}}
                </td>
            </tr>
            <div slot="datatable-empty">
                <div>暂无数据</div>
            </div>
        </datatable>
    </section>
</template>

<style>
    .datatable-head .iconfont {
        font-size: 12px;
        cursor: pointer;
    }
</style>

<script>
    import Vue from 'vue';
    import Moment from 'moment';
    import Datatable from '../components/datatable.vue';

    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                mongoId: '',
                limit: 15,
                page: 1,
                tableData: {
                    aoData: [
                    ],
                    aoCount: 1
                },
                aoColumns: [
                    {sTitle: '用户', mDataProp: 'user', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: '时间', mDataProp: 'dateTime', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: 'IP地址', mDataProp: 'IP', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: '参考地点', mDataProp: 'address', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: '平台', mDataProp: 'systemPlatform', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: '浏览器', mDataProp: 'browser', bSortable: false, icon: 'icon-paixu'},
                    {sTitle: '操作', mDataProp: 'operation', bSortable: false, icon: 'icon-paixu'}
                ],
                checkIds: [],
            }
        },
        computed: {
            ...mapState([
                'loginCondition',
                'resData'
            ])
        },
        methods: {
            //checkbox选中的逻辑
            toggleCheck(event) {
                let checked = event.target.checked;
                if (checked) {
                    this.checkIds = this.tableData.aoData.map(aData => aData.id);
                } else {
                    this.checkIds = [];
                }
                this.$store.commit('updateCheckIds', this.checkIds);
            },
            toggleOne(id) {
                if (_.includes(this.checkIds, id)) {
                    let index = this.checkIds.indexOf(id);
                    this.checkIds.splice(index, 1);
                } else {
                    this.checkIds.push(id);
                }
                this.$store.commit('updateCheckIds', this.checkIds);
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
            }
        },
        watch: {
            resData(value) {
                this.tableData.aoCount = value.count;
                this.tableData.aoData = _.map(_.values(value.data), data => {
                    data.dateTime = moment.unix(data.dateTime).format('YYYY-MM-DD HH:mm:ss');
                    return data;
                });
            }
        },
        components: {
            Datatable
        },
        created() {
            this.$store.commit('changeSearchStatus', false);
            this.$store.dispatch('getData');
        }
    }
</script>