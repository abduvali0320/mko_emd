import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/app-layout.vue'),
        meta: { requiresAuth: true },
        redirect: '/application',
        children: [
            {
                path: '/application',
                name: 'application',
                children: [
                    {
                        path: '',
                        name: 'application.list',
                        component: () => import('@/views/Application/List.vue'),
                    },
                    {
                        path: 'add',
                        name: 'application.add',
                        component: () => import('@/views/Application/Add.vue'),
                    },
                    {
                        path: ':id',
                        name: 'application.view',
                        component: () => import('@/views/Application/View.vue'),
                    },
                ],
            },
            {
                path: '/credit_product',
                name: 'credit_product',
                children: [
                    {
                        path: '',
                        name: 'credit_product.list',
                        component: () => import('@/views/CreditProduct/List.vue'),
                    },
                    {
                        path: 'add/:id',
                        name: 'credit_product.add',
                        component: () => import('@/views/CreditProduct/Add.vue'),
                    },
                    {
                        path: ':id',
                        name: 'credit_product.view',
                        component: () => import('@/views/CreditProduct/View.vue'),
                    },
                ],
            },
            {
                path: '/transaction',
                name: 'transaction',
                children: [
                    {
                        path: '',
                        name: 'transaction',
                        component: () => import('@/views/Transaction/View.vue'),
                    },
                ],
            },
            {
                path: '/goods',
                name: 'goods',
                children: [
                    {
                        path: ':id',
                        name: 'goods.view',
                        component: () => import('@/views/Goods/View.vue'),
                    },
                    {
                        path: 'add',
                        name: 'goods.add',
                        component: () => import('@/views/Goods/Add.vue'),
                    },
                    {
                        path: '',
                        name: 'goods.list',
                        component: () => import('@/views/Goods/List.vue'),
                    },
                ],
            },
            {
                path: '/client',
                name: 'client',
                children: [
                    {
                        path: 'individual',
                        name: 'client.individual',
                        component: () => import('@/views/Client/IndividualList.vue'),
                    },
                    {
                        path: 'entity',
                        name: 'client.entity',
                        component: () => import('@/views/Client/EntityList.vue'),
                    },
                    {
                        path: 'individual/add',
                        name: 'individual.add',
                        component: () => import('@/views/Client/IndividualAdd.vue'),
                    },
                    {
                        path: 'entity/add',
                        name: 'entity.add',
                        component: () => import('@/views/Client/EntityAdd.vue'),
                    },
                    {
                        path: 'individual/:id',
                        name: 'individual.view',
                        component: () => import('@/views/Client/IndividualView.vue'),
                    },
                    {
                        path: 'individual/profile/:id',
                        name: 'individual.profile',
                        component: () => import('@/views/Client/IndividualProfile.vue'),
                    },
                    {
                        path: 'entity/:id',
                        name: 'entity.view',
                        component: () => import('@/views/Client/EntityView.vue'),
                    },
                    {
                        path: 'individual/edit/:id',
                        name: 'individual.edit',
                        component: () => import('@/views/Client/IndividualEdit.vue'),
                    },
                ],
            },
        ],
    },

    // auth routes
    {
        path: '/auth',
        component: () => import('@/layouts/auth-layout.vue'),
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/login.vue'),
            },
            // {
            //     path: 'reset',
            //     name: 'resetpassword',
            //     component: () => import('pages/Login/ResetPassword.vue'),
            // },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('@/views/login.vue'),
    },
];

export default routes;
