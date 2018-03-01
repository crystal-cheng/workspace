/**
* admin-tab
*
* 初始化参数说明：
*   tabs [Array](必须)
*       {
*           id: tab的id值,
*           title: tab的title
*       }
*   value [Number, String] 组件v-model的绑定值
*
*   使用方法：
＊　<component v-model="actived" :tabs="" ></component>
*/
<template>
    <section>
        <ul class="item">
            <li v-for="tab in tabs" class="item-list" :class="{'active': tab.id === focused}" @click="toggleTab(tab.id)">
                {{tab.title}}
            </li>
        </ul>
    </section>
</template>

<style>
    .item {
        height: 41px;
        border-bottom: 1px solid #ddd;

        .item-list:first-child {
            border-left: 1px solid #ddd;
        }

        .item-list {
            float: left;
            padding: 0px 20px;
            line-height: 40px;
            border-top: 1px solid #e7e9ed;
            border-right: 1px solid #e7e9ed;
            font-size: 14px;
            cursor: pointer;
        }
        .item-list.active {
            margin-top: -1px;
            background: #fff;
            color: #4680ff;
            border-top: 2px solid #4680ff;
        }
    }
</style>

<script>
    export default {
        data() {
           return {
               focused: this.value
           }
        },
        props: {
            tabs: {
                type: Array,
                required: true
            },
            value: {
                type: [String, Number]
            }
        },
        methods: {
            toggleTab(tabId) {
                this.focused = tabId;
                this.$emit('input', this.focused);
            }
        }
    }
</script>