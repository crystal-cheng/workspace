<template>
    <input class="targetwidth" type="text" />
</template>
<style>
    .targetwidth {
        width: 150px;
        vertical-align: inherit;
    }
</style>

<script>
    export default{
        props: ['options', 'value','multiple'],

        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2({
                    data: this.options,
                    multiple:this.multiple,
                    placeholder:'请选择'
                })
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    vm.$emit('input', this.value)
                })
        },
        watch: {
            value: function (value) {
                // update value
                var _this = this
                $(this.$el).val(value).trigger('change');
            },
            options: function (options) {
                // update options
                $(this.$el).select2({ data: options })
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    }
</script>