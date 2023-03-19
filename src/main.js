// 引入基础配置config，必须第一执行
import config from './config'
import Vue from 'vue'
import App from './App.vue'
import loadJS from './config/loadJS'
import router from './router'
import store from './store'
import Api from '@/http/api'
import i18n from '@/i18'
import message from '@/util/message'
import elementUI from './elementUI'

Vue.config.productionTip = false

/**
 * 启动程序
 */
loadJS(function () {
    new Vue({
        el: '#app',
        render: h => h(App),
        // 配置路由
        router,
        // 国际化
        i18n: i18n(window.language.lang),
        // store
        store,
        beforeCreate() {
            // 安装全局事件总线
            Vue.prototype.$bus = this;
            // API
            Vue.prototype.$API = new Api();
            // message
            Vue.prototype.$message = message;
        }
    })
});