<template>
    <section>
        <div class="security-search">
            <component :is="type"></component>
        </div>
        <div class="panel-table">
            <component :is="table"></component>
        </div>
    </section>
</template>

<style>
    .security-section {
        margin-top: 24px;
    }
</style>

<script>
    import SearchGroup from './search.vue';
    import LoginSearch from './login-search.vue';
    import LoginTable from './login-table.vue';
    import DefaultTable from './default-table.vue';

    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'actived'
            ]),
            type() {
                let _type = 'login-search';
                if (this.actived === 'userlogin') {
                    _type = 'login-search';
                } else {
                    _type = 'search-group';
                }
                return _type;
            },
            table() {
                let _table = "login-table";
                if (this.actived === 'userlogin') {
                    _table = 'login-table';
                } else {
                    _table = 'default-table';
                }
                return _table;
            }
        },
        components: {
            SearchGroup,
            LoginSearch,
            LoginTable,
            DefaultTable
        }
    }
</script>