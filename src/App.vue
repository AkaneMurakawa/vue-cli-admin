<template>
    <div id="app">
        <el-container direction="vertical">
            <Header v-show="isRequiresAuth()"></Header>
            <el-container>
                <Aside v-show="isRequiresAuth()"></Aside>
                <el-container direction="vertical">
                    <el-main>
                        <Tabs></Tabs>
                        <keep-alive>
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </el-main>
                    <Footer></Footer>
                    <Backtop></Backtop>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import './assets/css/native.css'
import './assets/css/element-ui.css'
import './assets/css/app.css'
import Header from "./layouts/header";
import Aside from "./layouts/aside";
import Tabs from "./layouts/tabs";
import Footer from "./layouts/footer";
import Backtop from "./layouts/backtop";
import { setLanguage, setLocale } from "@/plugin/i18";

export default {
    name: "App",
    components: {
        Header,
        Aside,
        Tabs,
        Footer,
        Backtop
    },
    data() {
        return {

        };
    },
    methods: {
        isRequiresAuth() {
            let requiresAuth = this.$route.meta.requiresAuth;
            return requiresAuth == undefined || requiresAuth;
        },
        // 刷新语言资源
        refreshLang(newVal) {
            setLanguage(newVal);
            location.reload(true)
        },
        // 重新加载语言类型
        async refreshLocale() {
            // 可设置为远程加载
            const response = await this.$API.GET('/api/getLocale');
            if (response.success) {
                setLocale(response.data);
                this.$bus.$emit('reloadLocale');
            }
        },
        setActiveRouteKey(key) {
            // 设置激活的路由
            this.$store.dispatch('menu/setActiveRouteKey', key)
            // 跳转
            this.$router.push({ name: key });
        },
    },
    /**
     * App作为Root组件，用于初始化一些全局的配置
     */
    mounted() {
        this.refreshLocale();
        // 监听refreshLang事件
        this.$bus.$on('refreshLang', this.refreshLang);
        this.$bus.$on('setActiveRouteKey', this.setActiveRouteKey);
    }
};
</script>