<template>
    <ul>
       <li v-for="item in objList">
           {{item}}
       </li>
    </ul>
</template>

<style>

</style>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            objList() {
                let optType = this.data.optType.split('-');
                let operationObject = this.data.operationObject;
                let list = [];
                switch (optType[0]) {
                    case '数据流':
                        switch(_.last(optType)) {
                            case '新增':
                            case '导入':
                            case '删除':
                            case '修改':
                            case '打印':
                                if (_.isArray(operationObject.name)) {
                                    list.push(operationObject.name.join(','));
                                } else {
                                    list.push(operationObject.name);
                                }
                                break;
                            case '共享':
                                list.push(operationObject.name.join(','));
                                list.push(`接收人：${operationObject.shares.join(',')}`);
                                break;
                            case '移交':
                                list.push(operationObject.name.join(','));
                                list.push(`接收人：${operationObject.receiver}`);
                                break;
                            case '导出':
                                list.push(`${this.data.operationModule}中导出条数：${operationObject.name.length}条`);
                                break;
                        }
                        break;
                    case '工作流':
                        switch (optType[1]) {
                            case '添加':
                            case '复制':
                            case '处理':
                            case '打印':
                            case '删除':
                            case '中断':
                            case '恢复':
                            case '回退':
                            case '取回':
                            case '提交':
                            case '保存':
                                if (_.isArray(operationObject.name)) {
                                    list.push(operationObject.name.join(','));
                                } else {
                                    list.push(operationObject.name);
                                }
                                break;
                            case '导出':
                                list.push(`${this.data.operationModule}中导出条数：${operationObject.name.length}条`);
                                break;
                            case '委托':
                            case '取消委托':
                                list.push(operationObject.name);
                                list.push(`接收人：${operationObject.assign}`);
                                break;
                            case '抄送':
                                list.push(operationObject.name);
                                list.push(
                                    `接收人：${_.isArray(operationObject.recipient) ?
                                        operationObject.recipient.join(',') : operationObject.recipient}`
                                );
                        }
                        break;
                    case '角色组任命':
                        list.push(_.isArray(operationObject.name) ? operationObject.name.join(','):
                            operationObject.name);
                        break;
                    case '应用查看权限':
                        list.push(_.isArray(operationObject.name) ? operationObject.name.join(',') :
                            operationObject.name);
                        list.push(`查看${operationObject.appName}`);
                        break;
                    case '监控':
                        switch(_.last(optType)) {
                            case '删除':
                                list.push(`${operationObject.type}：记录编号${operationObject.recordIds.join(',')}`);
                                break;
                            default:
                                list.push(`${operationObject.name}`);
                                break;
                        }
                        break;
                    case '组织架构':
                        switch(optType[1]) {
                            case '新增':
                            case '编辑':
                            case '禁用':
                            case '激活':
                                list.push(`用户：${operationObject.name}.${operationObject.id}`);
                                break;
                            case '任命':
                                list.push(`用户：${operationObject.name}.${operationObject.id}`);
                                list.push(`任命到：
                                    ${_.isArray(operationObject.roles) ? operationObject.roles.join(',') :
                                    operationObject.roles}`);
                                break;
                            case '托管':
                            case '取消托管':
                                list.push(`用户：${operationObject.name}.${operationObject.id}`);
                                list.push(`接收人：${operationObject.trustName}.${operationObject.trustId}`);
                                break;
                            case '新增节点':
                            case '编辑节点':
                            case '删除节点':
                                list.push(`部门/岗位：${operationObject.name}`);
                                break;
                            case '导入':
                            case '导出':
                                list.push(`${operationObject.object}`);
                                break;
                            case '层级查看权限':
                                list.push(`部门/岗位：${operationObject.name.join(',')}`);
                                let name = [];
                                if (typeof operationObject.assign !=='undefined') {
                                    if (_.isArray(operationObject.assign)) {
                                        name = _.map(operationObject.assign, assign => {
                                            return assign.name;
                                        });
                                    } else {
                                        name = [operationObject.assign.name];
                                    }
                                    list.push(`可查看用户：${name.join(',')}`);
                                }
                                break;
                        }
                        break;
                    case '账号托管':
                        list.push(operationObject.name.join(','));
                        if (typeof operationObject.trustName !== 'undefined') {
                            list.push(`接收人：${operationObject.trustName.join(',')}`);
                        }
                        break;
                    case '开启':
                    case '关闭':
                        list.push('两步验证');
                        break;
                    case '三员管理':
                        list.push(operationObject.name.join(','));
                        list.push(`${optType[1]}为：${operationObject.content}`)
                        break;
                    case '安全审计':
                        if (optType[1] === '查看') {
                            list.push(operationObject.name.join(','));
                        } else {
                            list.push('安全审计');
                        }
                        break;

                }
                return list;
            }
        },
        watch: {
            objList() {
            }
        }
    }
</script>