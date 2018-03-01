/**
*databale
*
* 初始化参数说明：
* {
*   tableData [object] datatable的主体数据（必须）
*       {
*           aoData [array] 数据
*           aoCount [number] 数据总数
*       }
*   pageSize　[array] 设置每页显示的条数（有默认值）
*       [15, 20, 50, 100]
* }
*
*
* 使用方法
*   <datatable :table-data="tableData" @getDatatabledata="getDatatabledata">
*       <tr slot="datatable-head"></tr>
*       <tr slot="datatable-body"></tr>
*       <div slot="datatable-empty"></div>
*   </datatable>
*/
<template>
    <section>
        <table class="datatable">
            <thead class="datatable-head">
            <slot name="datatable-head"></slot>
            </thead>
            <tbody class="datatable-body">
            <slot name="datatable-body"></slot>
            </tbody>
        </table>
        <div class="datatable-empty" v-show="!tableData.aoData.length">
            <slot name="datatable-empty"></slot>
        </div>
        <div class="datatable-foot">
            <div class="datatable-info">共 {{tableData.aoCount}} 条</div>
            <div class="datatable-length">
                每页显示
                <select class="databale-perPage" v-model="perPage" @change="getDatatableData" >
                    <option v-for="size in pageSize" :value="size">{{size}}</option>
                </select>
                条
            </div>
            <div class="datatable-page">
                <ul class="pagination">
                    <li :class="{'no-allow': pageList.length === 1 || page === 1}">
                        <a class="paginate-button" @click="getPage('first')">
                            <i class="iconfont icon-houtuidaodi fa fa-angle-double-left"></i>
                        </a>
                    </li>
                    <li :class="{'no-allow': pageList.length === 1 || page === 1}">
                        <a class="paginate-button" @click="getPage('reduce')">
                            <i class="iconfont icon-houtui fa fa-angle-left"></i>
                        </a>
                    </li>
                    <li v-for="pageItem in pageShow" :class="{'active': pageItem === page}" @click.self="getPage(pageItem)">
                        <a @click="getPage(pageItem)">
                            {{pageItem}}
                        </a>
                    </li>
                    <li :class="{'no-allow': page === pageList.length}">
                        <a class="paginate-button" @click="getPage('add')">
                            <i class="iconfont icon-qianjin fa fa-angle-right"></i>
                        </a>
                    </li>
                    <li :class="{'no-allow': page === pageList.length}">
                        <a class="paginate-button" @click="getPage('last')">
                            <i class="iconfont icon-qianjindaodi fa fa-angle-double-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style>
    .datatable {
        width: 100%;
    }
    .datatable-head tr th {
        text-align: left;
        padding: 0 8px;
        height: 30px;
        color: #7f8fa4;
        font-size: 12px;
        border: 1px solid #e7e9ed;
        border-right: none;
        border-left: none;
        line-height: 30px;
    }
    .datatable-body tr td {
        font-size: 14px;
        color: #333;
        border-right: none!important;
        border-left: none!important;
        vertical-align: top;
        padding: 13px 10px;
        border-bottom: 1px solid #ddd;
    }
    .datatable-foot {
        height: 60px;
    }
    .datatable-info, .datatable-length {
        float: left;
        line-height: 60px;
        margin-right: 10px;
    }
    .datatable-page {
        float: right;
    }
    .databale-perPage {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #555;
        width: 75px;
        outline: none;
    }
    .pagination {
        overflow: hidden;
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    .pagination li {
        float: left;
    }
    .pagination li a {
        color: #c1c1c1;
        cursor: pointer;
        background-color: #fff;
        border: none;
        float: left;
        padding: 6px 12px;
        text-decoration: none;
    }
    .pagination li a:hover, .pagination li.active a {
        color: #575758;
        background-color: #ebecee;
    }
    li.no-allow a {
        cursor: not-allowed;
    }
    .datatable-empty {
        padding: 10px;
        border: 1px solid #e7e9ed;
        border-top: none;
    }

</style>

<script>
    export default {
        data() {
            return {
                perPage: 15,
                page: 1
            };
        },

        props: {
            tableData: {
                type: Object,
                required: true
            },
            pageSize: {
                type: Array,
                default: () => [15, 20, 50, 100]
            }

        },

        computed: {
            pageList() {
                let pageLength = Math.ceil(this.tableData.aoCount / this.perPage);
                let list = [];
                if (pageLength > 0) {
                    for (let i = 1; i <= pageLength; i++) {
                        list.push(i);
                    };
                }
                return list;
            },
            pageShow() {
                let show = [1, 2, 3, 4, 5];
                if (this.pageList.length > 5) {
                    if (this.page > 3) {
                        let start = this.page - 3;
                        if (start + 5 > this.pageList.length) {
                            show = this.pageList.slice(-5);
                        } else {
                            show = this.pageList.slice(start, 5 + start);
                        }
                    }
                } else {
                    show = this.pageList;
                }
                return show;
            }
        },
        watch: {
            page() {
                this.getDatatableData();
            }
        },
        methods: {
            getPage(type) {
                switch (type) {
                    case 'first':
                        this.page = 1;
                        break;
                    case 'reduce':
                        if (this.page > 1) {
                            this.page -= 1;
                        }
                        break;
                    case 'add':
                        if (this.page < this.pageList.length) {
                            this.page += 1;
                        }
                        break;
                    case 'last':
                        this.page = this.pageList.length;
                        break;
                    default:
                        this.page = type;
                }
            },
            getDatatableData() {
                this.$emit('getDatatabledata',
                    {
                        page: this.page,
                        perPage: this.perPage,
                        start: (this.page - 1) * this.perPage
                    }
                );
            }
        }
    }
</script>