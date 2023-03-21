import List from "@/util/list";

export default {
    // 开启命名空间
    namespaced: true,
    // actions，响应组件中的动作(context, value)
    actions: {
        // 设置菜单
        setMenu(context, menu) {
            context.commit('SET_MENU', menu);
            context.commit('SET_ROUTES', []);
        },
        // 设置激活的路由
        setActiveRouteKey(context, name) {
            context.commit('PUSH_ROUTE', List.findFirst(context.state.menu, 'name', name));
            context.commit('SET_ACTIVE_ROUTER_KEY', name);
        },
        removeHistoryRouteKey(context, name) {
            // 保留一个
            if (context.state.historyRoute.length > 1) {
                context.commit('REMOVE_HISTORY_ROUTER_KEY', name);
            }
        }

    },
    // mutations，操作数据(state, value)，通常命名为大写，便于和actions区分
    mutations: {
        SET_MENU(state, menu) {
            state.menu = menu
        },
        SET_ROUTES(state, routes) {
            state.routes = routes
        },
        // 添加路由记录
        PUSH_ROUTE(state, route) {
            if (route) {
                const hasRoute = List.anyMatch(state.routes, 'name', route.name);
                if (!hasRoute) {
                    state.routes.push(route)
                }
            }
        },
        // 设置激活的路由名称
        SET_ACTIVE_ROUTER_KEY(state, name) {
            state.activeRouteKey = name;
            const route = List.findFirst(state.routes, 'name', name);
            const hasRoute = List.anyMatch(state.historyRoute, 'name', name);
            if (!hasRoute) {
                state.historyRoute.push(route);
            }
        },
        // 删除激活的路由
        REMOVE_HISTORY_ROUTER_KEY(state, name) {
            state.historyRoute = state.historyRoute.filter(item => item.name !== name);
        },
    },
    // state，存储数据(状态)
    state: {
        // 菜单
        menu: [],
        // 路由记录
        routes: [],
        // 激活的路由
        activeRouteKey: '',
        // 打开的所有路由
        historyRoute: [],
    },
    // getters，加工state数据 (state)
    getters: {},
}