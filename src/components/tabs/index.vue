<template>
    <el-tabs v-if="tabs.length > 0" v-model="activeTab" type="card" tab-position="top" closable
        @tab-click="handleAcitiveTab" @tab-remove="handleRemoveTab">
        <el-tab-pane v-for="(item) in tabs" :key="item.name" :label="item.title" :name="item.name">
            {{ item.content }}
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: 'Tabs',
    data() {
        return {
            activeTab: undefined
        }
    },
    methods: {
        handleAcitiveTab(vc) {
            // vc上可以获取激活的数据
            this.$bus.$emit("setActiveRouteKey", vc.name);
        },
        handleRemoveTab(name) {
            this.$store.dispatch('menu/removeHistoryRouteKey', name);
            // 默认激活最后一个，注意这里因为tabs用到了this，所以需要将当前this传入
            const tabs = this.$options.computed.tabs.call(this);
            this.$bus.$emit("setActiveRouteKey", tabs[tabs.length - 1].name);
        }
    },
    watch: {
        // activeTab调整为双向绑定，不使用计算属性的方式，会影响激活显示
        '$store.state.menu.activeRouteKey'(newVal) {
            this.activeTab = newVal;
        }
    },
    computed: {
        tabs() {
            return this.$store.state.menu.historyRoute.map(route => {
                return {
                    name: route.name,
                    title: this.$t(route.meta?.i18) || route.meta?.title
                }
            });
        }
    }
}
</script>