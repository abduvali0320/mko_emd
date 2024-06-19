/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { api, auth_api } from '../plugins/axios';
import { authUserInterface} from '../@types/auth.models';
import { useHelper } from '@/composables/helpers/helper';
import router from '@/router';

const {Notify} =useHelper()

type RootState = {
   user: authUserInterface | null;
   loading: boolean;
};

export const useAuthUserStore = defineStore({
   id: 'AuthUserStore',
   state: () =>
      ({
         user: null,
         loading: false,
      } as RootState),
   actions: {
      async login(payload: { phone: string; password: string }) {
         this.clearData();
         this.loading = true;
         try {
            const response = await auth_api.post('/auth/login', payload);
            if (response.status === 200) {
               console.log(response)
               localStorage.setItem('access_token', response.data.access_token);
               // localStorage.setItem('refresh_token', response.data.refresh_token, {
               //    expires: response.data.expires_in / (3600 * 24 * 3)
               // });
               // redirect to previous url or default to home page
               await this.getAuthUser();
               router.push('/application');
            }
         } catch (err: any) {
            console.log(err);
            if (err?.message === 'Network Error') {
               Notify({
                  message: err.toJSON().message,
                  color: 'danger',
                  position: 'top-right',
                  timeout: 3000
               });
            } else {
               const  errors = err?.response?.data? err?.response?.data : [{ message: 'Неизвестная ошибка' }]
               Array(errors).forEach((err: any) =>
                  Notify({
                     message: err.message,
                     color: 'danger',
                     position: 'top-right',
                     timeout: 3000
                  })
               );
            }
         } finally {
            this.loading = false;
         }
      },
      async logout() {
         try {
            await api.get('/auth/logout');
         } catch (err) {
            console.log(err);
         }
         this.clearData();
         router.push('/auth/login').finally(() => {
         });
      },
      async getAuthUser() {
         if (localStorage.getItem('access_token')) {
            this.loading = true;
            try {
               const response = await api.get('/auth/me');
               if (response.status === 200) {
                  this.user = response.data;
               }
            } catch (err: any) {
               router.push('/auth/login');
               localStorage.removeItem('access_token');
            } finally {
               this.loading = false;
            }
         } else {
            this.clearData();
         }
      },
      clearData() {
         localStorage.removeItem('access_token');
         localStorage.removeItem('refresh_token');
         this.user = null;
      },
   }
});
