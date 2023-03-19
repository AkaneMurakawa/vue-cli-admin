<template>
    <el-aside :style="collapseStyle">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu class="el-menu-vertical" @select="handleSelect" :default-openeds="defaultOpeneds"
                    :collapse="isCollapse">
                    <el-submenu :index="menu.name" v-for="menu in $store.state.menu.menu" :key="menu.id"
                        :display="isCollapse">
                        <template slot="title">
                            <i :class="menu.meta.icon"></i>
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
            isCollapse: false,
            collapseStyle: { width: '200px !important' },
        };
    },
    methods: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.collapseStyle = { width: '60px !important', 'transition': 'width 0.5s' }
            } else {
                this.collapseStyle = { width: '200px !important', 'transition': 'width 0.5s' }
            }
        },
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
            // 计算属性需要值变化才会改变，因此这里合并的时候需要设置为[]，展开后重新计算
            if (this.isCollapse) {
                return [];
            }
            return this.$store.state.menu.menu.map(item => item.name);
        }
    },
    mounted() {
        this.initMenu();
        this.$bus.$on('collapseMenu', this.collapseMenu);
    },
}
</script>