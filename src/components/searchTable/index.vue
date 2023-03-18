<template>
    <div :model="form" :options="options" class="element-form">
        <div v-for="(item, index) in options" :key="index" class="element-form-item">
            <label :for="item.model">
                {{ $t(item.i18) || item.label }}：
            </label>
            <!-- input -->
            <el-input v-if="item.type === 'input'" v-model.trim="form[item.model]" :id="item.model"
                :maxlength="item.maxlength" :minlength="item.minlength" :placeholder="placeholderInput(item)" clearable />

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
                <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>

            <!-- date -->
            <el-date-picker v-if="item.type === 'date'" v-model="form[item.model]" type="date" :format="item.format"
                :placeholder="placeholderDate(item)" clearable />

            <!-- dateTime -->
            <el-date-picker v-if="item.type === 'dateTime'" v-model="form[item.model]" type="datetime" :format="item.format"
                :placeholder="placeholderDate(item)" clearable />

            <!-- dateRange -->
            <el-date-picker v-if="item.type === 'dateRange'" v-model="form[item.model]" type="daterange" range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>

            <!-- dateTimeRange -->
            <el-date-picker v-if="item.type === 'dateTimeRange'" v-model="form[item.model]" type="datetimerange"
                range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间">
            </el-date-picker>
        </div>

        <div class="element-form-item">
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="primary" @click="reset()">重置</el-button>
        </div>

        <slot name="table"></slot>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'SearchTable',
    props: {
        options: {
            type: Array,
            require: true
        },
        form: {
            type: Object,
            require: true
        }
    },
    methods: {
        placeholderInput(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '请输入内容';
        },
        placeholderSelect(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '请选择';
        },
        placeholderDate(item) {
            return this.$t(item.placeholderI18) || item.placeholder || '选择日期';
        },
        search() {
            this.$emit('handleSearch')
        },
        reset() {
            this.$emit('handleReset')
        },
    }
}
</script>

<style>
.element-form {
    display: inline-block;
}

.element-form-item {
    margin-bottom: 22px;
    display: inline-block;
    width: 33.3%;
}

.el-input {
    max-width: 200px;
    min-width: 100px;
}
</style>