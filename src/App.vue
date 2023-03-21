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
                            <router-view v-if="$route.meta.isKeepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.isKeepAlive"></router-view>
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
import './assets/css/elementui.css'
import './assets/css/app.css'
import Header from "./components/header";
import Aside from "./components/aside";
import Tabs from "./components/tabs";
import Footer from "./components/footer";
import Backtop from "./components/backtop";
import { setLanguage, setLocale } from "./i18";

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
        reloadRoute() {
            // 临时解决，route name === path 的最后一个
            let pathname = location.pathname;
            let path = pathname.split('/');
            let routeName = path[path.length - 1];
            if (routeName) {
                // FIXME 未成功跳转
                this.setActiveRouteKey(routeName);
            }
        }
    },
    /**
     * App作为Root组件，用于初始化一些全局的配置
     */
    mounted() {
        this.refreshLocale();
        // 监听refreshLang事件
        this.$bus.$on('refreshLang', this.refreshLang);
        this.$bus.$on('setActiveRouteKey', this.setActiveRouteKey);
        this.reloadRoute();
    }
};
</script>