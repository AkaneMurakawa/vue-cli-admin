import {
    workOrderLevel,
    workOrderStatus
} from '@/common/constant'

// 查询列表配置
export const soptions = [{
        type: 'input',
        label: '主题',
        i18: '',
        model: 'subject',
        placeholder: '',
        placeholderI18: '',
        maxlength: undefined,
        minlength: undefined,
    },
    {
        type: 'number',
        label: '编号',
        i18: '',
        model: 'no',
        placeholder: '',
        placeholderI18: '',
        max: undefined,
        min: undefined,
    },
    {
        type: 'inputNumber',
        label: '系统编号',
        i18: '',
        model: 'systemNo',
        placeholder: '',
        placeholderI18: '',
        max: undefined,
        min: 0,
        step: undefined,
        precision: 2,
    },
    {
        type: 'select',
        label: '工单级别',
        i18: '',
        model: 'workOrderLevel',
        placeholder: '',
        placeholderI18: '',
        options: workOrderLevel,
        multiple: false,
    },
    {
        type: 'select',
        label: '工单状态',
        i18: '',
        model: 'workOrderStatus',
        placeholder: '',
        placeholderI18: '',
        options: workOrderStatus,
        multiple: false,
    },
    {
        type: 'dateTime',
        label: '创建时间',
        i18: '',
        model: 'createTime',
        placeholder: '',
        placeholderI18: '',
    },
    {
        type: 'dateRange',
        label: '创建开始日期',
        i18: '',
        model: 'createDate',
        placeholder: '',
        placeholderI18: '',
        format: undefined,
        // model后缀，默认from、to
        from: 'from',
        to: 'to',
    },
    {
        type: 'dateTimeRange',
        label: '创建开始时间',
        i18: '',
        // 注意属性名称不要和上面dateTime的model重名，否则data-picker属性会覆盖值
        model: 'createTimeRange',
        placeholder: '',
        placeholderI18: '',
        format: undefined,
    },
]

// 表头配置
export const toptions = [{
    label: '新增',
    i18: '',
    icon: 'el-icon-circle-plus-outline',
    method: 'handleEventAdd'
}, {
    label: '取消',
    i18: '',
    icon: 'el-icon-circle-close',
    method: 'handleEventCancel'
}, ]