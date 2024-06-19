import axios, { AxiosInstance } from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}
const APP_URL = 'https://api.mko.gx.uz'

const api = axios.create({ baseURL: APP_URL + '/api/' });

const auth_api = axios.create({ baseURL: APP_URL + '/api/' });
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access_token');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...config.headers
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); // Request interceptor for API calls


auth_api.interceptors.request.use(
    async (config) => {
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       // @ts-ignore
       config.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
       };
       return config;
    },
    (error) => {
       void Promise.reject(error);
    }
 );
 

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const errResp = error.response;
        const originalRequest = error.config;
        if (error?.response?.status !== 401 && originalRequest?.headers?.notify == 'none') {
            return Promise.reject(error);
        }

        switch (true) {
            case error?.toJSON()?.message === 'Network Error':
                showMessage('Ошибка сети, проверьте подключение к интернету или свяжитесь с разработчиками', 'error');
                return Promise.reject(error);
            case !error || !errResp || !errResp.hasOwnProperty('status'):
            showMessage('Произошла ошибка, свяжитесь с разработчиками', 'error');
                return Promise.reject(error);
            case errResp.status === 400 && errResp.data.hasOwnProperty('errors') && errResp.data.errors.length > 0:
                const errList = JSON.parse(JSON.stringify(errResp.data.errors));
                errList.slice(0, 5).forEach((el: { message: string }) => {
                    showMessage(`${el.message}`, 'error');
                });
                return Promise.reject(error);
            // role boyicha error
            case errResp.status === 403 && errResp.data.hasOwnProperty('errors') && errResp.data.errors.length > 0:
                const errs = JSON.parse(JSON.stringify(errResp.data.errors));
                // localStorage.removeItem('access_token');
                errs.slice(0, 5).forEach((el: { message: string }) => {
                    showMessage(`${el.message}`, 'error');
                });
                return Promise.reject(error);
            // Если сервер вернул ошибку 500 ---------------------------------------------------------------------------------------------------------
            case errResp.status === 500:
                showMessage('500 Ошибка сервера', 'error');
                return Promise.reject(error);
            // Если сервер вернул ошибку 429 ---------------------------------------------------------------------------------------------------------
            case errResp.status === 429:
                showMessage('Вы посылаете слишком много запросов', 'error');
                return Promise.reject(error);
            // Если токен авторизации устарел ---------------------------------------------------------------------------------------------------------
            case error.response.status === 401 && !originalRequest._retry:
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                await router.push('/auth/login');
                showMessage('Время сессии истекло', 'error');
                return Promise.reject(error);


            // По умолчанию
            default:
                if (!navigator.onLine) {
                    showMessage('Нет связи с интернетом, проверьте подключение к сети', 'error');
                    return Promise.reject(error);
                } else {


                    return Promise.reject(error);
                }
        }
    }
);
auth_api.interceptors.request.use(
    async (config) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        return config;
    },
    (error) => {
        void Promise.reject(error);
    }
);
const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};
export { api, auth_api };