module.exports = [{
        id: '1',
        // 路由名称，规则：小写，对应文件夹名称，否则报错[vue-router] Route with name ‘xxx‘ does not exist
        name: 'sub',
        path: '',
        // 为空则代表不需要配置路由
        component: '',
        // 重定向 
        redirect: null,
        route: '',
        meta: {
            // 标记需要缓存
            keepAlive: true,
            title: '订阅',
            i18: 'com_lab_003',
            icon: '',
        },
        children: [{
                id: '11',
                name: 'subscribe',
                path: '/sub/subscribe',
                component: 'pages/home/sub/subscribe',
                redirect: null,
                route: '',
                meta: {
                    keepAlive: true,
                    title: '我的订阅',
                    i18: 'com_lab_004',
                    icon: 'el-icon-goods',
                },
            },
            {
                id: '12',
                name: 'plan',
                path: '/sub/plan',
                component: 'pages/home/sub/plan',
                redirect: null,
                route: '',
                meta: {
                    keepAlive: true,
                    title: '购买订阅',
                    i18: 'com_lab_005',
                    icon: 'el-icon-shopping-cart-full',
                },
            }
        ]
    },
    {
        id: '2',
        name: 'user',
        path: '',
        component: '',
        redirect: null,
        route: '',
        meta: {
            title: '用户',
            i18: 'com_lab_006',
            icon: '',
        },
        children: [{
                id: '21',
                name: 'profile',
                path: '/user/profile',
                component: 'pages/home/user/profile',
                redirect: null,
                route: '',
                meta: {
                    keepAlive: true,
                    title: '个人中心',
                    i18: 'com_lab_007',
                    icon: 'el-icon-user',
                },
            },
            {
                id: '22',
                name: 'ticket',
                path: '/user/ticket',
                component: 'pages/home/user/ticket',
                redirect: null,
                route: '',
                meta: {
                    keepAlive: true,
                    title: '我的工单',
                    i18: 'com_lab_008',
                    icon: 'el-icon-help',
                },
            }
        ]
    }
]