import Home from '@/views/home'

const RootRoute = {
    name: 'home',
    path: '/',
    component: Home,
}
const LoginRoute = {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
        requiresAuth: false
    }
}
const RegisterRoute = {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register'),
    meta: {
        requiresAuth: false
    }
}

export const basicRoutes = [RootRoute, LoginRoute, RegisterRoute]