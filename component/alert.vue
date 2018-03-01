<template>
    <div class="alert" v-if="showAlert" :class="alert.type === 'success' ? 'success': 'danger'">
        <span class="alert-text">
            {{alert.text}}
        </span>
    </div>
</template>

<style>
    .alert {
        font-size: 16px;
        height: 44px;
        text-align: center;
    }
    .alert-text {
        margin: auto 0;
    }
    .success {
        background-color: #dff0d8;
        color: #98D29F;
    }
    .danger {
        background-color: #f2dede;
        color: #F2C1CA;
    }
</style>

<script>
    export default {
        props: {
            alert: {
                type: Object
            },
            show: {
                required: true,
                type: Boolean
            }
        },
        data() {
            return {
                showAlert: false
            }
        },
        watch: {
            show() {
                this.showAlert = this.show;
                setTimeout(() => {
                    this.showAlert = false;
                    this.$emit('updateShow');
                }, 1000);
            }
        }
    }
</script>