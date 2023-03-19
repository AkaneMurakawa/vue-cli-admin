<template>
    <div>
        <div :model="form" :options="options" class="element-form">
            <div v-for="(item, index) in options" :key="index" class="element-form-item">
                <!-- label -->
                <el-tooltip class="item" effect="light" v-if="showLabelTip(item)" :content="$t(item.i18) || item.label"
                    placement="top">
                    <label :for="item.model">
                        {{ labelFormat(item) }}
                    </label>
                </el-tooltip>
                <el-tooltip class="item" effect="light" disabled v-else :content="$t(item.i18) || item.label"
                    placement="top">
                    <label :for="item.model">
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
                <el-date-picker v-if="item.type === 'date'" v-model="form[item.model]" type="date" :format="item.format"
                    :placeholder="placeholderDate(item)" clearable />

                <!-- dateTime -->
                <el-date-picker v-if="item.type === 'dateTime'" v-model="form[item.model]" type="datetime"
                    :format="item.format" :placeholder="placeholderDate(item)" clearable />

                <!-- dateRange -->
                <el-date-picker v-if="item.type === 'dateRange'" v-model="form[item.model]" type="daterange"
                    range-separator="-" :start-placeholder="$t('com_lab_009') || 开始日期"
                    :end-placeholder="$t('com_lab_010') || 结束日期" />

                <!-- dateTimeRange -->
                <el-date-picker v-if="item.type === 'dateTimeRange'" v-model="form[item.model]" type="datetimerange"
                    range-separator="-" :start-placeholder="$t('com_lab_011') || 开始时间" format="MM-dd HH:mm"
                    :end-placeholder="$t('com_lab_012') || 结束时间" />
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
        // search table option
        options: {
            type: Array,
            require: true
        },
        form: {
            type: Object,
            require: true
        },
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
        handleSearch(condition) {
            this.$emit('handleSearch', { ... this.form, ...condition });
        },
        handleReset() {
            this.$emit('handleReset')
        },
    },
    mounted() {
        if (this.immediate) {
            this.handleSearch();
        }
    }
}
</script>

<style scoped>
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
}

.element-form-item>label {
    display: inline-block;
    width: var(--element-form-item-label-width);
    text-align: right;
}

.element-form-item-btn-pr {
    /* 100% - var(--element-form-item-label-width) - var(--element-form-item-label-form); */
    padding-right: 9%;
}

.element-form-item>.el-input,
.element-form-item>.el-input-number,
.element-form-item>.el-select,
.element-form-item>.el-date-editor.el-input,
.element-form-item>.el-date-editor.el-input__inner {
    width: var(--element-form-item-label-form);
}
</style>