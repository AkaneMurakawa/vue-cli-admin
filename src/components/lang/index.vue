<template>
    <el-select v-model="language" size="small" placeholder="选择语言">
        <el-option :selected="item.value == language" :label="item.label" :value="item.value" v-for="item in locale"
            :key="item.value"></el-option>
    </el-select>
</template>

<script>
import { getLanguage, getLocale } from '@/plugin/i18';
export default {
    name: 'Lang',
    data() {
        return {
            isRefreshing: false,
            language: getLanguage(),
            locale: getLocale(),
        }
    },
    watch: {
        language(newVal, oldVal) {
            if (newVal != oldVal) {
                // 语言切换，发布刷新语言事件
                this.$bus.$emit('refreshLang', newVal);
            }
        }
    },
    methods: {
        reloadLocale() {
            this.locale = getLocale();
        }
    },
    mounted() {
        this.$bus.$on('reloadLocale', this.reloadLocale);
    }
}
</script>