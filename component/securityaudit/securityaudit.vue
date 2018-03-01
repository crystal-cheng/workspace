<template>
    <section class="security-section">
        <alert :show="show" :alert="alert" @updateShow="updateShow"></alert>
        <div class="security-tab">
            <admin-tab v-model="actived" :tabs="tabs"></admin-tab>
        </div>

        <div class="security-panel">
           <tab-panel></tab-panel>
        </div>
    </section>
</template>

<style>
    .main-wrapper-content-body {
        position: relative;
    }
    .alert {
        width: 100%;
        top: 56px;
        position: absolute;
    }
    .security-section {
        margin-top: 24px;
    }
</style>

<script>
    import AdminTab from '../components/admin-tab.vue';
    import TabPanel from './tab-panel.vue';
    import Alert from '../components/alert.vue';
    import store from './store.js';
    import {mapState} from 'vuex';

    export default {
        store,
        data() {
            return {
                tabs: [
                    {id: 'userlogin', title: '用户登录日志'},
                    {id: 'useroperate', title: '用户操作日志'},
                    {id: 'adminoperate', title: '管理员操作日志'}
                ]
            }
        },
        computed: {
            ...mapState([
                'show',
                'alert'
            ]),
            actived: {
                get() {
                    return this.$store.state.actived;
                },
                set(val) {
                    this.$store.commit('updateActived', val);
                    this.$store.commit('changeSearchStatus', false);
                }
            }
        },
        methods: {
            updateShow() {
                this.$store.commit('updateAlertInfo', {
                    show: false,
                    alert: {
                        type: '',
                        text: ''
                    }
                });
            }
        },
        components: {
            AdminTab,
            TabPanel,
            Alert
        }
    }
</script>