<template>
  <div :class="{ 'dark text-white-dark': store.semidark }">
    <nav class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
      <div class="bg-white dark:bg-[#0e1726] h-full">
        <div class="flex justify-between items-center px-4 py-3">
          <router-link to="/" class="main-logo flex items-center shrink-0">
            <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="" />
            <span class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">MKO</span>
          </router-link>
          <a
            href="javascript:;"
            class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
            @click="store.toggleSidebar()"
          >
            <svg class="w-5 h-5 m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                opacity="0.5"
                d="M16.9998 19L10.9998 12L16.9998 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
        <perfect-scrollbar
          :options="{
            swipeEasing: true,
            wheelPropagation: false,
          }"
          class="h-[calc(100vh-80px)] relative"
        >
          <ul class="relative font-semibold space-y-0.5 p-4 py-0">
            <li class="menu nav-item">
              <router-link to="/application" class="group" @click="toggleMobileMenu">
                <div class="flex items-center">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    class="group-hover:!text-primary shrink-0"
                  >
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="none" stroke="none">
                      <path
                        d="M800 4947 c-49 -16 -133 -102 -148 -153 -18 -60 -18 -4408 0 -4468
                          16 -55 99 -138 154 -154 32 -9 439 -12 1756 -12 1936 0 1773 -7 1851 80 24 26
                          49 66 55 88 17 57 17 4407 0 4464 -6 22 -31 62 -55 88 -78 87 86 80 -1857 79
                          -1224 -1 -1731 -4 -1756 -12z m3495 -172 l25 -24 0 -2191 0 -2191 -25 -24 -24
                          -25 -1711 0 -1711 0 -24 25 -25 24 0 2191 0 2191 25 24 24 25 1711 0 1711 0
                          24 -25z"
                        fill="currentColor"
                      />
                      <path d="M2080 4560 l0 -80 480 0 480 0 0 80 0 80 -480 0 -480 0 0 -80z" fill="currentColor" />
                      <path d="M1760 4240 l0 -80 800 0 800 0 0 80 0 80 -800 0 -800 0 0 -80z" fill="currentColor" />
                      <path
                        d="M1120 3827 c-49 -16 -133 -102 -148 -153 -17 -59 -17 -1369 0 -1428
                          16 -55 99 -138 154 -154 31 -9 215 -12 716 -12 769 0 736 -3 811 80 24 26 49
                          66 55 88 17 56 17 1368 0 1424 -6 22 -31 62 -55 88 -75 83 -41 80 -817 79
                          -466 -1 -692 -5 -716 -12z m1415 -172 l25 -24 0 -671 0 -671 -25 -24 c-20 -21
                          -34 -25 -82 -25 l-59 0 -17 68 c-10 38 -35 97 -55 132 -42 72 -131 166 -184
                          194 l-36 20 38 45 c84 101 104 179 98 377 -3 131 -5 143 -35 206 -44 93 -100
                          151 -191 196 -72 35 -81 37 -172 37 -91 0 -100 -2 -172 -37 -91 -45 -147 -103
                          -191 -196 -30 -63 -32 -75 -35 -206 -6 -198 14 -276 98 -377 l39 -46 -39 -22
                          c-104 -58 -213 -210 -241 -336 l-12 -55 -59 0 c-49 0 -63 4 -83 25 l-25 24 0
                          671 0 671 25 24 24 25 671 0 671 0 24 -25z m-624 -307 c51 -15 114 -70 140
                          -120 11 -22 18 -42 15 -45 -2 -3 -54 -17 -115 -33 l-111 -28 -111 28 c-61 16
                          -113 30 -115 33 -11 11 38 87 75 118 66 56 141 72 222 47z m49 -360 l120 30 0
                          -46 c0 -75 -20 -123 -75 -177 -51 -52 -102 -75 -165 -75 -63 0 -114 23 -165
                          75 -55 54 -75 102 -75 177 l0 46 120 -30 120 -30 120 30z m44 -466 c88 -41
                          148 -100 191 -185 19 -38 35 -76 35 -83 0 -12 -67 -14 -390 -14 -323 0 -390 2
                          -390 14 0 32 73 156 114 194 48 45 125 87 183 102 71 18 186 5 257 -28z"
                        fill="currentColor"
                      />
                      <path d="M3040 3680 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M3520 3680 l0 -80 320 0 320 0 0 80 0 80 -320 0 -320 0 0 -80z" fill="currentColor" />
                      <path d="M3040 3200 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M3520 3200 l0 -80 320 0 320 0 0 80 0 80 -320 0 -320 0 0 -80z" fill="currentColor" />
                      <path d="M3040 2720 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M3520 2720 l0 -80 320 0 320 0 0 80 0 80 -320 0 -320 0 0 -80z" fill="currentColor" />
                      <path d="M3040 2240 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M3520 2240 l0 -80 320 0 320 0 0 80 0 80 -320 0 -320 0 0 -80z" fill="currentColor" />
                      <path d="M960 1680 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M1440 1680 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M1920 1680 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M2400 1680 l0 -80 880 0 880 0 0 80 0 80 -880 0 -880 0 0 -80z" fill="currentColor" />
                      <path d="M960 1200 l0 -80 1600 0 1600 0 0 80 0 80 -1600 0 -1600 0 0 -80z" fill="currentColor" />
                      <path d="M3040 720 l0 -80 160 0 160 0 0 80 0 80 -160 0 -160 0 0 -80z" fill="currentColor" />
                      <path d="M3520 720 l0 -80 320 0 320 0 0 80 0 80 -320 0 -320 0 0 -80z" fill="currentColor" />
                    </g>
                  </svg>

                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{ $t('app') }}</span>
                </div>
              </router-link>
            </li>

            <li class="menu nav-item">
              <button
                type="button"
                class="nav-link group w-full"
                :class="{ active: activeDropdown === 'client' }"
                @click="activeDropdown === 'client' ? (activeDropdown = null) : (activeDropdown = 'client')"
              >
                <div class="flex items-center">
                  <svg
                    class="group-hover:!text-primary shrink-0 w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                    {{ $t('client') }}
                  </span>
                </div>
                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'client' }">
                  <icon-caret-down />
                </div>
              </button>
              <vue-collapsible :isOpen="activeDropdown === 'client'">
                <ul class="sub-menu text-gray-500">
                  <li>
                    <router-link to="/client/individual" @click="toggleMobileMenu">Физическое лицо</router-link>
                  </li>
                  <li>
                    <router-link to="/client/entity" @click="toggleMobileMenu">Юридическое лицо</router-link>
                  </li>
                </ul>
              </vue-collapsible>
            </li>
            <li class="menu nav-item">
              <router-link to="/credit_product" class="group" @click="toggleMobileMenu">
                <div class="flex items-center">
                  <icon-menu-components class="group-hover:!text-primary shrink-0" />

                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Продукт</span>
                </div>
              </router-link>
            </li>
            <li class="menu nav-item">
              <router-link to="/transaction" class="group" @click="toggleMobileMenu">
                <div class="flex items-center">
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 172 172" style=" fill:#26e07f;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#1fb141"><path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path></g></g></svg> -->
                  <tableIcon />
                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Транзакции</span>
                </div>
              </router-link>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';
import appIcon from '@/assets/icons/app.svg';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import tableIcon from '@/components/icon/icon-cash-banknotes.vue';
const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');

onMounted(() => {
  const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
  if (selector) {
    selector.classList.add('active');
    const ul: any = selector.closest('ul.sub-menu');
    if (ul) {
      let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
      if (ele.length) {
        ele = ele[0];
        setTimeout(() => {
          ele.click();
        });
      }
    }
  }
});

const toggleMobileMenu = () => {
  console.log(window.innerWidth);
  if (window.innerWidth < 1024) {
    store.toggleSidebar();
  }
};
</script>
