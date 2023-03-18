import requests from "@/http/axios";
export default {
    // 开启命名空间
    namespaced: true,
    // actions，响应组件中的动作(context, value)
    actions: {
        async getInfo(context) {
            const response = await requests({
                method: 'GET',
                url: '/api/getUserInfo',
            });
            if (response.success) {
                context.commit('SET_INFO', response.data);
            }
        },
    },
    // mutations，操作数据(state, value)，通常命名为大写，便于和actions区分
    mutations: {
        SET_INFO(state, info) {
            state.info = info
        },
    },
    // state，存储数据(状态)
    state: {
        // 用户信息
        info: {},
    },
    // getters，加工state数据 (state)
    getters: {},
}