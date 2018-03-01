<template>
    <section class="condition-group">
        <ul class="input-group">
            <li>
                <label>用户：</label>
                <input type="text" placeholder="请输入..." v-model="loginCondition.user"/>
            </li>
            <li>
                <label>时间：</label>
                <div class="datepicker-content">
                    <start-datepicker
                            :name="startPicker.name"
                            :model="loginCondition.startTime"
                            :type="startPicker.type"
                            :language="startPicker.language"
                            :datetime-format="startPicker.datetimeFormat"
                            :date-update-fn="startPicker.fn"
                            :start-datetime="startPicker.start"
                            :end-datetime="loginCondition.endTime"
                            @update-start="updateStartTime"
                    >
                    </start-datepicker>
                </div>
                <label>至</label>
                <div class="datepicker-content">
                    <end-datepicker
                            :name="endPicker.name"
                            :model="loginCondition.endTime"
                            :type="endPicker.type"
                            :language="endPicker.language"
                            :datetime-format="startPicker.datetimeFormat"
                            :date-update-fn="endPicker.fn"
                            :start-datetime="loginCondition.startTime"
                            :end-datetime="startPicker.end"
                            @update-end="updateEndTime"
                    >
                    </end-datepicker>
                </div>
            </li>
            <li>
                <label>参考地点：</label>
                <input type="text" placeholder="请输入..." v-model="loginCondition.address"/>
            </li>
            <li>
                <label>操作：</label>
                <input type="text" placeholder="请输入..." v-model="loginCondition.operation"/>
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
                'loginCondition'
            ])
        },
        components: {
            startDatepicker: Datepicker,
            endDatepicker: Datepicker,
            SearchButton
        },
        watch: {
            actived() {
                let _condition = _.mapValues(this.loginCondition, (val, key) => {
                    return key === 'endTime' || key === 'startTime' ? null : '';
                });
                this.$store.commit('updateCondition', _condition);
            },
            loginCondition: {
                handler(val) {
                    this.$store.commit('updateCondition', val);
                },
                deep: true
            }
        },
        methods: {
            updateStartTime(startTime) {
                this.loginCondition.startTime = startTime ? startTime.format('YYYY-MM-DD HH:mm:ss'): startTime;
            },
            updateEndTime(endTime) {
                this.loginCondition.endTime = endTime ? endTime.format('YYYY-MM-DD HH:mm:ss'): startTime;
            },
            searchByCondition() {
                this.$store.commit('updateCondition', this.loginCondition);
            }
        }

    }
</script>