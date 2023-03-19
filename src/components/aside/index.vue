<template>
    <el-aside>
        <el-row class="tac">
            <el-col :span="24">
                <div class="aside-title text-center">
                    <a href="/">{{ $t('com_lab_000') }}</a>
                </div>
                <el-menu class="el-menu-vertical-demo" @select="handleSelect" :default-openeds="defaultOpeneds">
                    <el-submenu :index="menu.name" v-for="menu in $store.state.menu.menu" :key="menu.id">
                        <template slot="title">
                            <span slot="title">{{ $t(menu.meta.i18) || menu.meta.title }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item :index="subMenu.name" v-for="subMenu in menu.children" :key="subMenu.id">
                                <i :class="subMenu.meta.icon"></i>
                                <span slot="title">{{ $t(subMenu.meta.i18) || subMenu.meta.title }}</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
import '@/assets/css/aside.css'
export default {
    name: 'Aside',
    data() {
        return {
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$bus.$emit("setActiveRouteKey", key);
        },
        // 初始化菜单，远程加载
        async initMenu() {
            const response = await this.$API.GET('/api/getMenu');
            if (response.success) {
                this.$store.dispatch('menu/setMenu', response.data);
            }
        },
    },
    computed: {
        // 默认打开一级菜单
        defaultOpeneds() {
            return this.$store.state.menu.menu.map(item => item.name);
        }
    },
    mounted() {
        this.initMenu();
    },
}
</script>