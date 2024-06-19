<template>
  <div>
    <div class="absolute inset-0">
      <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
    </div>
    <div
      class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
    >
      <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
      <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
      <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
      <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
      <div
        class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0"
      >
        <div
          class="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
        >
          <div
            class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"
          ></div>
          <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
            <router-link to="/" class="w-48 block lg:w-72 ms-10">
              <img src="/assets/images/auth/logo-white.svg" alt="Logo" class="w-full" />
            </router-link>
            <div class="mt-24 hidden w-full max-w-[430px] lg:block">
              <img src="/assets/images/auth/login.svg" alt="Cover Image" class="w-full" />
            </div>
          </div>
        </div>
        <div class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
          <div class="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
            <router-link to="/" class="w-8 block lg:hidden">
              <img src="/assets/images/logo.svg" alt="Logo" class="mx-auto w-10" />
            </router-link>
          </div>
          <div class="w-full max-w-[440px] lg:mt-16">
            <div class="mb-10">
              <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Авторизация</h1>
              <p class="text-base font-bold leading-normal text-white-dark">Пожалуйста введите номер телефона и пароль</p>
            </div>
            <form class="space-y-5 dark:text-white" @submit.prevent="onSubmit">
              <div>
                <label for="phone">Номер телефона</label>
                <div class="relative text-white-dark">
                  <input
                    id="phone"
                    :readonly="loading"
                    v-model="login_data.phone"
                    type="text"
                    v-maska
                    data-maska="+998 (##) ### ## ##"
                    placeholder="Введите номер телефона"
                    class="form-input ps-10 placeholder:text-white-dark"
                  />
                  <span class="absolute start-4 top-1/2 -translate-y-1/2">
                    <iconPhoneCall :fill="true" />
                  </span>
                </div>
              </div>
              <div>
                <label for="password">Пароль</label>
                <div class="relative text-white-dark">
                  <input
                    id="password"
                    :readonly="loading"
                    v-model="login_data.password"
                    type="password"
                    placeholder="Введите пароль"
                    class="form-input ps-10 placeholder:text-white-dark"
                  />
                  <span class="absolute start-4 top-1/2 -translate-y-1/2">
                    <iconLockDots :fill="true" />
                  </span>
                </div>
              </div>
              <div>
                <label class="flex cursor-pointer items-center">
                  <input v-model="login_data.remember_me" type="checkbox" class="form-checkbox bg-white dark:bg-black" />
                  <span class="text-white-dark">Запомнить меня</span>
                </label>
              </div>
              <button type="submit" class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                <span
                  v-if="loading"
                  class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                ></span>
                Войти
              </button>
            </form>
          </div>
          <p class="absolute bottom-6 w-full text-center dark:text-white">© {{ new Date().getFullYear() }}.Roo Support Technology.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import iconLockDots from '@/components/icon/icon-lock-dots.vue';
import iconPhoneCall from '@/components/icon/icon-phone-call.vue';
import { useMeta } from '@/composables/use-meta';
import { vMaska } from 'maska';
import { showMessage } from '@/plugins/helper';
import { auth_api } from '@/plugins/axios';
import { storeToRefs } from 'pinia';
import { useAuthUserStore } from '@/stores/AuthUserStore';

const authUserStore = useAuthUserStore();
const { loading } = storeToRefs(authUserStore);
// const is_loading = ref(false);
const login_data = ref({
  phone: '',
  password: '',
  remember_me: false,
});
useMeta({
  title: 'Авторизация',
  meta: [
    {
      name: 'description',
      content: 'Авторизация',
    },
  ],
});
const onSubmit = () => {
//   console.log(login_data.value);
//   console.log(login_data.value.phone_number.length);
//   console.log(login_data.value.password.length);
  if (login_data.value.phone.length < 12) {
    showMessage('error', 'Номер телефона должен быть 12 символов');
  } else if (login_data.value.password.length < 6) {
    showMessage('error', 'Пароль должен быть не менее 6 символов');
  } else {
    // is_loading.value = true;
    const data = (login_data.value = {
      phone: login_data.value.phone.replace(/\D/g, ''),
      password: login_data.value.password,
      remember_me: login_data.value.remember_me,
    });
    authUserStore.login(data);

    console.log('submit');
    // setTimeout(() => {
    //   is_loading.value = false;
    // }, 2000);
  }
};
</script>