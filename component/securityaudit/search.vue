<template>
    <section class="condition-group">
        <ul class="input-group">
            <li>
                <label>操作人：</label>
                <input type="text" placeholder="请输入..." v-model="condition.operator"/>
            </li>
            <li>
                <label>操作类型：</label>
                <input type="text" placeholder="请输入..." v-model="condition.operationType"/>
            </li>
            <li>
                <label>操作模块：</label>
                <div class="select-content">
                    <select-module v-model="condition.operationModule" :options="selectOptions"></select-module>
                </div>
                <input type="text" placeholder="请输入..." v-model="condition.operationObject"/>
            </li>
            <li>
                <label>时间：</label>
                <div class="datepicker-content">
                    <start-datepicker
                            :name="startPicker.name"
                            :model="condition.startTime"
                            :type="startPicker.type"
                            :language="startPicker.language"
                            :datetime-format="startPicker.datetimeFormat"
                            :date-update-fn="startPicker.fn"
                            :start-datetime="startPicker.start"
                            :end-datetime="condition.endTime"
                            @update-start="updateStartTime"
                    >
                    </start-datepicker>
                </div>
                <label>至</label>
                <div class="datepicker-content">
                    <end-datepicker
                            :name="endPicker.name"
                            :model="condition.endTime"
                            :type="endPicker.type"
                            :language="endPicker.language"
                            :datetime-format="startPicker.datetimeFormat"
                            :date-update-fn="endPicker.fn"
                            :start-datetime="condition.startTime"
                            :end-datetime="startPicker.end"
                            @update-end="updateEndTime"
                    >
                    </end-datepicker>
                </div>
            </li>
            <li class="condition-btn-group">
                <search-button></search-button>
            </li>
        </ul>

    </section>
</template>

<style>
    .condition-group {
        .input-group {
            line-height: 80px;

            >li {
                 float: left;
                 margin-right: 16px;

                >input {
                     height: 34px;
                 }
             }
            .condition-btn-group {
                float: right !important;
            }
        }
        .datepicker-content {
            display: inline-block;
            width: 200px;
            position: relative;
            top: 12px;
        }
        .select-content {
            display: inline-block;
            position: relative;
            top: 12px;
        }


    }

</style>

<script>
    import Select from '../components/select2.vue';
    import Datepicker from '../components/datepicker/datetime-picker.vue';
    import SearchButton from './search-button.vue';
    import Moment from 'moment';

    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                selectOptions: [],
                startPicker: {
                    name: 'startPicker',
                    type: 'datetime',
                    language: 'zh-CN',
                    datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
                    start: null,
                    fn: 'update-start'
                },
                endPicker: {
                    name: 'endPicker',
                    type: 'datetime',
                    language: 'zh-CN',
                    datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
                    end: null,
                    fn: 'update-end'
                }
            }
        },
        computed: {
            ...mapState([
                'actived',
                'condition'
            ])
        },
        components: {
            selectModule: Select,
            startDatepicker: Datepicker,
            endDatepicker: Datepicker,
            SearchButton
        },
        watch: {
            actived() {
                let _condition = _.mapValues(this.condition, (val, key) => {
                    return key === 'endTime' || key === 'startTime' ? null : '';
                });
                this.$store.commit('updateCondition', _condition);
                this.getModules();
            },
            condition: {
                handler(val) {
                    this.$store.commit('updateCondition', val);
                },
                deep: true
            }
        },
        methods: {
            updateStartTime(startTime) {
                this.condition.startTime = startTime ? startTime.format('YYYY-MM-DD HH:mm:ss'): startTime;
            },
            updateEndTime(endTime) {
                this.condition.endTime = endTime ? endTime.format('YYYY-MM-DD HH:mm:ss'): endTime;
            },
            getModules() {
                let vm = this;
                $.ajax({
                    url: '/logger/GetOperationModules',
                    dataType: 'JSON',
                    data: {
                        userType: this.actived === 'useroperate' ? 0: 1
                    },
                    success(res) {
                        if (res.success) {
                            vm.selectOptions = res.data.rows.map(row => {
                               return {
                                   id: row._id,
                                   text: row._id
                               }
                            });
                        }
                    },
                    error(error) {
                        throw error;
                    }
                })
            }
        },
        created() {
            this.getModules();
        }

    }
</script>