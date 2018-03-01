<template>
    <ul class="details-container">
        <li v-for="detail in detailsList" v-if="!detail.isChange">
            {{detail}}
        </li>
        <li v-for="detail in detailsList" v-if="detail.isChange">
           {{detail.title}}: <s class="old-value">{{detail.oldValue}}</s>{{detail.newValue}}
        </li>
    </ul>
</template>

<style>
    .details-container {
        padding-left: 40px;

        & >li {
            list-style: disc;
            color: #596b89;
        }
    }
    .old-value {
        margin-left: 5px;
        margin-right: 5px;
        color: #bbb;
    }
</style>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
            details: {
                required: true
            },
            num: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                org: {
                    login_user_id: '登录ID',
                    real_name: '姓名',
                    password: '密码',
                    birthday: '生日',
                    entry: '入职时间',
                    phone: '手机',
                    email: '邮箱',
                    sex: '性别',
                    isSecurity: '信息保密',
                    qq: 'QQ',
                    ext: '分机号',
                    idcard: '身份证',
                    addr: '联系地址',
                    jobdesc: '分工描述',
                    main_job: '主职'
                }
            }
        },
        computed: {
            detailsList() {
                let _details = this.getDetails();
                let _index = Math.ceil(_details.length / 2);
                return this.num > 0 ? _details.splice(_index) : _details.splice(0, _index);
            }

        },
        methods: {
            getDetails() {
                let _details = [];
                let type = this.data.optType;
                let tabArr = '数据权限:';
                let monitorsArr = [];
                let parseList, tableFields, conditionGroups;
                let monitored, monitoredArr = [];
                if (type.indexOf('-') > -1) {
                    type = type.split('-');
                    switch (_.first(type)) {
                        case '数据流':
                            switch (_.last(type)) {
                                case '新增':
                                     _.each(this.details, (detail, name) => {
                                        _.each(detail, child => {
                                            let val = this.parseValue(child.ty, child.v);
                                            _details.push(`${name}.${child.t}： ${val}`);
                                        });
                                    });
                                    break;
                                case '共享':
                                    _.each(this.details, (fields, share) => {
                                        _details.push(`接收人：${share}`);
                                        _.each(fields, (value, key) => {
                                            let text = key === '写' ? '可编辑': '可查看';
                                            _details.push(`${text}：${value}`);
                                        });
                                    });
                                    break;
                                case '导出':
                                    _details.push(`导出数据明细：${this.details.join(',')}`);
                                    break;
                                case '导入':
                                    _.each(this.details, tables => {
                                        if (_.isArray(tables)) {
                                            _.each(tables, table => {
                                                _.each(table, field => {
                                                    _details.push(`${field.t}：${field.v}`);
                                                });
                                            });
                                        } else {
                                            _.each(tables, field => {
                                                _details.push(`${field.t}：${field.v}`);
                                            });
                                        }
                                    });
                                    break;
                                case '修改':
                                    if (typeof this.details.data !== 'undefined') {
                                        _.each(this.details.data, field => {
                                            _details.push({
                                                isChange: true,
                                                title:  field.fieldName,
                                                newValue: field.newValue,
                                                oldValue: field.oldValue
                                            });
                                        });
                                    }
                            }
                            break;
                        case '组织架构':
                            switch (type[1]) {
                                case '新增':
                                case '新增节点':
                                    if (typeof this.details.info !== 'undefined') {
                                        _.each(this.details.info, (detail, name) => {
                                            if (name) {
                                                _details.push(`${name}：${detail}`);
                                            }
                                        });
                                    }
                                    break;
                                case '编辑':
                                case '新增节点':
                                    if (typeof this.details.diff !== 'undefined') {
                                        let diff = this.details.diff;
                                        _.each(diff.new, (val, key) => {
                                            if (diff.old && typeof diff.old[key] !== 'undefined') {
                                                _details.push({
                                                    isChange: true,
                                                    title:  key,
                                                    newValue: val,
                                                    oldValue: diff.old[key]
                                                });
                                            }
                                        });
                                    }
                                    break;
                            }

                            break;
                        case '工作流':
                            switch (type[1]) {
                                case '添加':
                                case '复制':
                                case '处理':
                                    _.each(this.details, detail => {
                                        if (typeof detail.operate !== 'undefined' && _.size(detail.operate)) {
                                            _.each(detail.operate, operate => {
                                                _.each(operate, field => {
                                                    if (typeof field.newValue !=='undefined') {
                                                        _details.push({
                                                            isChange: true,
                                                            title:  field.field_name,
                                                            newValue: field.newValue,
                                                            oldValue: field.oldValue
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    break;
                                case '导出':
                                    if (this.details.length) {
                                        _details.push(`导出数据明细：${this.details.join(',')}`);
                                    }
                                    break;
                            }
                        case '角色组任命':
                            if (typeof this.details.groupName !== 'undefined') {
                                _details.push(`应用角色组名称：${this.details.groupName}`);
                            }
                            if (typeof this.details.blacklist !== 'undefined'
                                && _.isArray(this.details.blacklist) && this.details.blacklist.length) {
                                let names = _.map(this.details.blacklist, blacklist => {
                                    return blacklist.name;
                                });
                                _details.push(`角色组成员：${names.join(',')}`);
                            }
                            break;
                        case '监控':
                            switch (type[1]) {
                                case '新增':
                                case '修改':
                                    if(this.data.operationObject.type === '数据监控'){
                                        _details.push(`${this.details.operator} ${this.details.operation}
                                        记录编号： ${this.details.recordId}`);
                                        _details.push(`操作时间：${this.details.createtime}`);
                                        _details.push(`监控者：${this.details.monitors}`);
                                        _details.push(`被监控者： ${this.details.monitoreds}`);
                                        _details.push(`监控表单：${this.details.tNames}`);

                                        _.each(this.details.tables, (table,name) => {
                                            tabArr += `【${name}】${table.delete}`;
                                            if (table.write.length !== 0) {
                                                _details.push(`【${name}】可写字段：${table.write}`);
                                            }
                                        });

                                        _details.push(`${tabArr}`);
                                        _details.push(`监控条件：`);

                                        _.each(this.details.conditions,(condition,name) => {
                                            _.each(condition, (combin,value) => {
                                                if(value !== 'groupRel') {
                                                    _details.push(`【${name}】组关系：${condition.groupRel}
                                                    条件关系: ${combin.rel} 条件限制:${combin.value}`);
                                                }
                                            });
                                        });
                                    } else if(this.data.operationObject.type === '流程监控') {
                                        //解析监控者
                                        if (this.details.rules.monitorList.new) {
                                            parseList = this.details.rules.monitorList.new;
                                        } else {
                                            parseList = this.details.rules.monitorList;
                                        }

                                        if (typeof parseList.type !== 'undefined' && parseList.type === 'group') {
                                            _.each(parseList, (namelist,name) => {
                                                monitorsArr = namelist ;
                                            });
                                        } else {
                                            _.each(parseList, (namelist,name) => {
                                                monitorsArr.push(namelist.name);
                                            });
                                        }
                                        _details.push(`监控者：${monitorsArr.join(',')}`);

                                        //解析被监控者
                                        if (this.details.rules.monitoredList.new) {
                                            monitored = this.details.rules.monitoredList.new;
                                        } else {
                                            monitored = this.details.rules.monitoredList;
                                        }

                                        if (monitored === 'all' || monitored === 'direct') {
                                            _details.push(`被监控者：${monitored === 'direct' ? '直接下级' : '所有下级'}`);
                                        } else if (typeof monitored.type !== 'undefined' && monitored.type === 'group') {
                                            _.each(monitored, (namelist,name) => {
                                                monitoredArr = namelist ;
                                            });
                                            _details.push(`被监控者：${monitoredArr.join(',')}`);
                                        } else {
                                            _.each(monitored, (namelist,name) => {
                                                monitoredArr.push(namelist.name);
                                            });
                                            _details.push(`被监控者：${monitoredArr.join(',')}`);
                                        }


                                        _details.push(`${this.details.operator} ${this.details.operation}
                                        记录编号： ${this.details.rules.id}`);
                                        _details.push(`操作时间：${this.data.dateTime}`);

                                        //监控流程.数据权限
                                        if(this.details.rules.workflow.new) {
                                            tableFields = this.details.rules.table_fields.new;
                                            _details.push(`监控流程：${this.details.rules.workflow.new.title}`);
                                            _details.push(`数据权限：${this.details.rules.delete_auth.new ? '可删除记录' :
                                                '不可删除记录'}`);
                                        } else {
                                            tableFields = this.details.rules.table_fields;
                                            _details.push(`监控流程：${this.details.rules.workflow.title}`);
                                            _details.push(`数据权限：${this.details.rules.delete_auth ? '可删除记录' :
                                                '不可删除记录'}`);
                                        }

                                        _.each(tableFields, (tablist, tabName) => {
                                            _details.push(`数据表：【${tablist.table_name}】`);
                                            var fieldList = [];
                                            _.each(tablist.all_fields, (alltable, field) => {
                                                if(_.indexOf(tablist.readable, field) > -1) {
                                                    fieldList.push(alltable.field_name);
                                                }
                                            });
                                            _details.push(`可编辑字段：${fieldList.join(',')}`);
                                        });

                                        if(this.details.rules.conditions.new) {
                                            if (this.details.rules.conditions.new.groups.length >= 1){
                                                _details.push(`监控条件： 组关系：${this.details.rules.conditions.new.type === 'AND' ? '与' : '或'}`);
                                                conditionGroups = this.details.rules.conditions.new.groups;
                                            }
                                        } else {
                                            if (this.details.rules.conditions.groups.length >= 1){
                                                _details.push(`监控条件： 组关系：${this.details.rules.conditions.type === 'AND' ? '与' : '或'}`);
                                                conditionGroups = this.details.rules.conditions.groups;
                                            }
                                        }

                                        _.each(conditionGroups, (condition,name) => {
                                            _.each(condition.conditions, (combin,value) => {
                                                if (typeof(combin.reference[0]) === 'object') {
                                                    _details.push(`条件关系：${condition.type === 'AND' ? '与' : '或'}
                                                        【${combin.table}】.${combin.fieldTitle} ${combin.typeTitle} ${combin.reference[0].table}.${combin.reference[0].field}`);
                                                } else {
                                                    _details.push(`条件关系：${condition.type === 'AND' ? '与' : '或'}
                                                        【${combin.table}】.${combin.fieldTitle} ${combin.typeTitle} ${combin.reference}`);
                                                }
                                            });
                                        });

                                    }
                                    break;
                                case '删除':
                                    _details.push(`${this.data.Operator.name} (${this.data.Operator.id}) 删除 记录编号：
                                    ${this.data.operationObject.recordIds}`);
                                    _details.push(`操作时间：${this.data.dateTime}`);
                                    break;
                            }
                    }
                }
                return _details;
            },
            parseValue(type, val) {
                let value = '';
                switch (type) {
                    case 'loc':
                       value = val.mark;
                       break;
                    case 'org':
                    case 'userinfo':
                        value = JSON.parse(val).displayValue;
                        break;
                    default:
                        value = val;
                        break;
                }
                return value;
            },
            parseOrgValue(type, val) {
                let value = '';
                switch(type) {
                    case 'password':
                        value = '*******';
                        break;
                    case 'sex':
                        value = val === '0' ? '男': '女';
                        break;
                    case 'isSecurity':
                        value = val === 'false' ? '否': '是';
                        break;
                    default:
                        value = val;
                        break;

                }
                return value;
            }
        },
        created() {

        }
    }
</script>