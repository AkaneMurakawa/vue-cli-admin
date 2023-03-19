import Constant from '@/common/constant'

export const options = [{
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
        options: Constant.workOrderLevel,
        multiple: false,
    },
    {
        type: 'select',
        label: '工单状态',
        i18: '',
        model: 'workOrderStatus',
        placeholder: '',
        placeholderI18: '',
        options: Constant.workOrderStatus,
        multiple: false,
    },
    {
        type: 'dateTime',
        label: '创建时间',
        i18: '',
        model: 'createTime',
        placeholder: '',
        placeholderI18: '',
        format: undefined,
    },
    {
        type: 'dateRange',
        label: '创建开始日期',
        i18: '',
        model: 'create',
        placeholder: '',
        placeholderI18: '',
        format: undefined,
    },
    {
        type: 'dateTimeRange',
        label: '创建开始时间',
        i18: '',
        model: 'create',
        placeholder: '',
        placeholderI18: '',
        format: undefined,
    },
]