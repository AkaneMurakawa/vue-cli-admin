export default {
    // 开启命名空间
    namespaced: true,
    // actions，响应组件中的动作(context, value)
    actions: {
        setMenu(context, menu) {
            context.commit('SET_MENU', menu);
            context.commit('SET_ROUTES', []);
        },
        // 设置激活的路由
        setActiveRouteKey(context, name){
            context.commit('SET_ACTIVE_ROUTER_KEY', name);
            context.commit('PUSH_ROUTES', name);
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
        PUSH_ROUTES(state, routes) {
            if (!state.routes.includes(routes)){
                state.routes.push(routes)
            }
        },
        SET_ACTIVE_ROUTER_KEY(state, name) {
            state.activeRouteKey = name;
            state.historyRouteKey.push(state.activeRouteKey);
        },
        DELETE_ROUTER_KEY(state, name) {
            state.historyRouteKey = state.historyRouteKey.filter(item => item === name);
        },
    },
    // state，存储数据(状态)
    state: {
        // 菜单
        menu: [],
        // 路由
        routes: [],
        // 激活的路由
        activeRouteKey: '',
        // 打开的所有路由
        historyRouteKey: [],
    },
    // getters，加工state数据 (state)
    getters: {},
}