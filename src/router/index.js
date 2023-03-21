import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
    auth
} from '@/auth'
import Home from '@/pages/home'
import List from "@/util/list";

Vue.use(VueRouter);
/**
 * 基础路由，非权限路由
 */
const routes = [{
        path: '*',
        // 重定向
        redirect: '/login',
    },
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/login'),
        meta: {
            requiresAuth: false
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/register'),
        meta: {
            requiresAuth: false
        }
    },
];

/**
 * 解决NavigationDuplicated
 */
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    originPush.call(this, location, resolve, reject).catch(() => {});
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    originReplace.call(this, location, resolve, reject).catch(() => {});
}
/**
 * 创建路由
 */
const router = new VueRouter({
    mode: 'history',
    routes
});


/**
 * 全局前置路由守卫
 */
router.beforeEach((to, from, next) => {
    let requiresAuth = to.meta.requiresAuth == undefined || to.meta.requiresAuth;
    // 访问权限路由，校验是否登录
    if (requiresAuth && !auth.isLoggedIn()) {
        toLogin(to, from, next);
        return;
    }

    // 重定向
    let redirect = from.query.redirect;
    if (redirect) {
        toRedirectPath(to, from, next, redirect);
        return;
    }

    // 跳转到已有路由，addedRoute标记是否已经添加路由
    if (to.meta.addedRoute) {
        next();
        return;
    }

    // 动态添加权限路由
    let hasRoute = router.options.routes.some(route => route.name === to.name);
    if (!hasRoute) {
        dynamicAddRoute(to, from, next);
        return;
    }

    // 如果已经登录，访问登录页则跳到首页
    if (auth.isLoggedIn() && to.path === '/login') {
        next({
            path: '/'
        });
        return;
    }

    // 跳转到已有路由
    next();
})

/**
 * 全局后置路由守卫
 */
router.afterEach((to, from) => {
    // 设置网页的title信息
    if (to.meta.title) {
        document.title = to.meta.title;
    }
})

/**
 * 跳转到登录页
 */
function toLogin(to, from, next) {
    next({
        path: '/login',
        query: {
            // 保存所在的位置，方便后面再来
            redirect: to.fullPath
        },
    });
}

/**
 * 重定向
 */
function toRedirectPath(to, from, next, redirect) {
    // 解决next无限循环的问题
    if (to.path === redirect) {
        next();
    } else {
        next({
            path: redirect,
        });
    }
}

/**
 * 动态添加权限路由
 * 坑：router.addRoute(route)添加路由后并不是立即生效，需要next()跳转到动态路由。
 * 但是如果跳转后又会进入beforeEach，就无限循环了，因此还需要通过给to.meta设置标记
 */
function dynamicAddRoute(to, from, next) {
    let dynamicRoute = List.findFirst(store.state.menu.menu, 'name', to.name);
    if (dynamicRoute) {
        let route = {
            ...dynamicRoute,
            // 动态加载组件
            component: () => import(`@/${dynamicRoute.component}/index.vue`).catch(() => {
                console.error(`动态加载组件${dynamicRoute.component}失败`);
            })
        };
        to.meta.addedRoute = true;
        router.addRoute(route);
        //  跳转到动态路由
        next({
            ...to,
            replace: true
        });
    }
}

export default router