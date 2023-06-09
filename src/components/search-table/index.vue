<template>
    <div>
        <!-- 查询条件 -->
        <div class="element-form">
            <!-- 查询条件配置 -->
            <div v-for="(item, index) in soptions" :key="index" class="element-form-item">
                <!-- label -->
                <el-tooltip v-if="showLabelTip(item)" :content="$t(item.i18) || item.label" placement="top">
                    <label :for="item.model" class="typeClass">
                        {{ labelFormat(item) }}
                    </label>
                </el-tooltip>
                <el-tooltip disabled v-else :content="$t(item.i18) || item.label" placement="top">
                    <label :for="item.model" class="typeClass">
                        {{ labelFormat(item) }}
                    </label>
                </el-tooltip>

                <!-- input -->
                <el-input v-if="item.type === 'input'" v-model.trim="form[item.model]" :id="item.model"
                    :maxlength="item.maxlength" :minlength="item.minlength" :placeholder="placeholderInput(item)"
                    clearable />

                <!-- number -->
                <el-input v-if="item.type === 'number'" v-model.number="form[item.model]" :id="item.model" :max="item.max"
                    :min="item.min" :placeholder="placeholderInput(item)" clearable />

                <!-- inputNumber -->
                <el-input-number v-if="item.type === 'inputNumber'" v-model.number="form[item.model]" :id="item.model"
                    type="number" :max="item.max" :min="item.min" :step="item.step" :precision="item.precision"
                    :placeholder="placeholderInput(item)" clearable />

                <!-- select -->
                <el-select v-if="item.type === 'select'" v-model="form[item.model]" :multiple="item.multiple"
                    :placeholder="placeholderSelect(item)" clearable>
                    <el-option v-for="option in item.options" :key="option.value" :label="$t(option.i18) || option.label"
                        :value="option.value" />
                </el-select>

                <!-- date -->
                <el-date-picker v-if="item.type === 'date'" v-model="form[item.model]" type="date" value-format="timestamp"
                    :format="item.format" :placeholder="placeholderDate(item)" clearable />

                <!-- dateTime -->
                <el-date-picker v-if="item.type === 'dateTime'" v-model="form[item.model]" type="datetime"
                    value-format="timestamp" :format="item.format" :placeholder="placeholderDate(item)" clearable />

                <!-- dateRange -->
                <el-date-picker v-if="item.type === 'dateRange'" v-model="form[item.model]" type="daterange"
                    value-format="timestamp" range-separator="-" :start-placeholder="$t('com_lab_009') || 开始日期"
                    :end-placeholder="$t('com_lab_010') || 结束日期" />

                <!-- dateTimeRange -->
                <el-date-picker v-if="item.type === 'dateTimeRange'" v-model="form[item.model]" type="datetimerange"
                    value-format="timestamp" range-separator="-" :start-placeholder="$t('com_lab_011') || 开始时间"
                    format="MM-dd HH:mm" :end-placeholder="$t('com_lab_012') || 结束时间" />
            </div>
            <!-- btn -->
            <div class="element-form-item">
                <div class="text-right element-form-item-btn-pr">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">
                        {{ $t('com_btn_003') || 查询 }}
                    </el-button>
                    <el-button type="primary" icon="el-icon-refresh-left" @click="handleReset()">
                        {{ $t('com_btn_004') || 重置 }}
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 表格头部操作配置 -->
        <div v-show="toptions && toptions.length > 0" class="element-tabel-header-option">
            <div class="element-tabel-header-option" v-for="(opt, index) in toptions" :key="index">
                <el-button :icon="opt.icon" size="mini" @click="handlerEvent(opt)" type="primary" plain>
                    {{ $t(opt.i18) || opt.label }}
                </el-button>
            </div>
        </div>

        <!-- 表格 -->
        <slot name="table"></slot>

        <!-- 分页 -->
        <el-pagination v-if="pagination" class="float-right mt-2" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="form.current" :page-sizes="[10, 20, 50, 100, 500]"
            :page-size="form.size" layout="prev, pager, next, jumper, sizes, total" :total="tableData.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'SearchTable',
    props: {
        // 查询条件配置
        soptions: {
            type: Array,
            require: true
        },
        // 表头配置
        toptions: {
            type: Array,
            require: false
        },
        // 查询条件
        form: {
            type: Object,
            require: true
        },
        // 分页数据，{current, size, pages, records}
        tableData: {
            type: Object,
            require: true
        },
        // 是否展示分页
        pagination: {
            type: Boolean,
            default: true,
        },
        // 首次加载是否查询
        immediate: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        /** $emit start */
        // 查询
        handleSearch(condition) {
            condition = this.conditionFormat(condition);
            this.$emit('handleSearch', { ... this.form, ...condition });
        },
        // 重置
        handleReset() {
            this.$emit('handleReset')
        },
        // 表头配置事件
        handlerEvent(opt) {
            if (opt.method) {
                this.$emit('handlerEvent', opt);
            }
        },
        /** $emit end */
        labelFormat(item) {
            let label = this.$t(item.i18) || item.label;
            return (label.length > 4 ? label.substring(0, 4).concat('...') : label).concat('：')
        },
        showLabelTip(item) {
            return (this.$t(item.i18) || item.label).length > 4;
        },
        placeholderInput(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '请输入内容';
        },
        placeholderSelect(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '请选择';
        },
        placeholderDate(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '选择日期';
        },
        handleSizeChange(size) {
            this.handleSearch({ size });
        },
        handleCurrentChange(current) {
            this.handleSearch({ current });
        },
        conditionFormat(condition) {
            this.soptions.forEach(item => {
                // range条件处理
                if (item.type === 'dateRange' || item.type === 'dateTimeRange') {
                    let arr = this.form[item.model];
                    if (arr) {
                        const from = item.from || 'from';
                        const to = item.to || 'to';
                        condition = { ...condition, [item.model + from]: arr[0], [item.model + to]: arr[1] };
                        return;
                    }
                }
            });
            return condition;
        },

    },
    mounted() {
        if (this.immediate) {
            this.handleSearch();
        }
    }
}
</script>

<style>
.element-form {
    /* 开启弹性盒模型 */
    display: flex;
    /* 设置主轴的方向和换行 */
    flex-flow: row wrap;
    /* 设置主轴的对齐方式 */
    justify-content: space-between;
    /* 设置侧轴的对齐方式 */
    align-items: center;
}

.element-form-item {
    margin-bottom: 18px;
    display: inline-block;
    width: 33.33%;
    --element-form-item-label-width: 25%;
    --element-form-item-label-form: 66%;
    /* 100% - var(--element-form-item-label-width) - var(--element-form-item-label-form); */
    --element-form-item-label-pr: 9%;
}

.element-form-item>label {
    display: inline-block;
    width: var(--element-form-item-label-width);
    text-align: right;
}

.element-form-item-btn-pr {
    padding-right: var(--element-form-item-label-pr);
}

.element-tabel-header-option {
    text-align: left;
    background: #f5f7fa;
    display: flex;
    line-height: 64px;
    padding: 10px 10px 10px 10px;
}

.element-form-item>.el-input,
.element-form-item>.el-input-number,
.element-form-item>.el-select,
.element-form-item>.el-date-editor.el-input,
.element-form-item>.el-date-editor.el-input__inner {
    width: var(--element-form-item-label-form);
}

.el-tooltip__popper {
    opacity: 0.8;
}
</style>