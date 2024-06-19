import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';
import routes from './routes';
import { useAuthUserStore } from '@/stores/AuthUserStore';
const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
    const store = useAppStore();
    const access_token = localStorage.getItem('access_token');
    const authStore = useAuthUserStore();
    const loginRoutes = ['login'];

    if (to.name == 'login'&&access_token) {
        next({ path: from.path});
       }
    if (loginRoutes.includes(String(to.name))) {
        next();
        return;
     }
    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    if (!authStore.user && access_token) {
        await authStore.getAuthUser();
    }
    if (to.matched.some((record) => record.meta.requiresAuth) &&!access_token) {
        next({ name: 'login', query: { next: to.fullPath } });
    } else {
        if (authStore?.user) {
            next();
        }
    }
    // next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
