<template>
  <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
    <div class="shadow-sm">
      <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
        <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
          <router-link to="/" class="main-logo flex items-center shrink-0">
            <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="" />
            <span class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
              >MKO</span
            >
          </router-link>

          <a
            href="javascript:;"
            class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleSidebar()"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </a>
        </div>
        <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
          <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"></ul>
        </div>
        <div
          class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"
        >
          <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
            <form
              class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
              :class="{ '!block': search }"
              @submit.prevent="search = false"
            ></form>

            <button
              type="button"
              class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              @click="search = !search"
            >
              <svg class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
                <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div>
            <a
              href="javascript:;"
              v-show="store.theme === 'light'"
              class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              @click="store.toggleTheme('dark')"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5" />
                <path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M4 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M22 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </a>
            <a
              href="javascript:;"
              v-show="store.theme === 'dark'"
              class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              @click="store.toggleTheme('system')"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="javascript:;"
              v-show="store.theme === 'system'"
              class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              @click="store.toggleTheme('light')"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path opacity="0.5" d="M22 21H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M15 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </a>
          </div>

          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                type="button"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <img :src="currentFlag" alt="flag" class="w-5 h-5 object-cover rounded-full" />
              </button>
              <template #content="{ close }">
                <ul class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                  <template v-for="item in store.languageList" :key="item.code">
                    <li>
                      <button
                        type="button"
                        class="w-full hover:text-primary"
                        :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                        @click="changeLanguage(item), close()"
                      >
                        <img class="w-5 h-5 object-cover rounded-full" :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`" alt="" />
                        <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                      </button>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <div v-if="false" class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
              <button
                type="button"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <circle cx="19" cy="5" r="3" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </button>
              <template #content="{ close }">
                <ul class="top-11 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                  <li class="mb-5">
                    <div class="overflow-hidden relative rounded-t-md !p-5 text-white">
                      <div class="absolute h-full w-full bg-[url('/assets/images/menu-heade.jpg')] bg-no-repeat bg-center bg-cover inset-0"></div>
                      <h4 class="font-semibold relative z-10 text-lg">Messages</h4>
                    </div>
                  </li>
                  <template v-for="msg in messages" :key="msg.id">
                    <li>
                      <div class="flex items-center py-3 px-5">
                        <div v-html="msg.image"></div>
                        <span class="px-3 dark:text-gray-500">
                          <div class="font-semibold text-sm dark:text-white-light/90" v-text="msg.title"></div>
                          <div v-text="msg.message"></div>
                        </span>
                        <span
                          class="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2"
                          v-text="msg.time"
                        ></span>
                        <button type="button" class="text-neutral-300 hover:text-danger" @click="removeMessage(msg.id)">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  </template>
                  <template v-if="messages.length">
                    <li class="border-t border-white-light text-center dark:border-white/10 mt-5">
                      <div
                        class="flex items-center py-4 px-5 text-primary font-semibold group dark:text-gray-400 justify-center cursor-pointer"
                        @click="close()"
                      >
                        <span class="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>

                        <svg
                          class="w-4 h-4 group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                    </li>
                  </template>
                  <template v-if="!messages.length">
                    <li class="mb-5">
                      <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              opacity="0.5"
                              d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        No data available.
                      </div>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <div v-if="false" class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                type="button"
                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path d="M12 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>

                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                  <span
                    class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                </span>
              </button>
              <template #content="{ close }">
                <ul class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                  <li>
                    <div class="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 class="text-lg">Notification</h4>
                      <template v-if="notifications.length">
                        <span class="badge bg-primary/80" v-text="notifications.length + 'New'"></span>
                      </template>
                    </div>
                  </li>
                  <template v-for="notification in notifications" :key="notification.id">
                    <li class="dark:text-white-light/90">
                      <div class="group flex items-center px-4 py-2">
                        <div class="grid place-content-center rounded">
                          <div class="w-12 h-12 relative">
                            <img class="w-12 h-12 rounded-full object-cover" :src="`/assets/images/${notification.profile}`" alt="" />
                            <span class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                          </div>
                        </div>
                        <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                          <div class="ltr:pr-3 rtl:pl-3">
                            <h6 v-html="notification.message"></h6>
                            <span class="text-xs block font-normal dark:text-gray-500" v-text="notification.time"></span>
                          </div>
                          <button
                            type="button"
                            class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                            @click="removeNotification(notification.id)"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                              <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  </template>
                  <template v-if="notifications.length">
                    <li>
                      <div class="p-4">
                        <button class="btn btn-primary block w-full btn-small" @click="close()">Read All Notifications</button>
                      </div>
                    </li>
                  </template>
                  <template v-if="!notifications.length">
                    <li>
                      <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              opacity="0.5"
                              d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        No data available.
                      </div>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8" class="!block">
              <button type="button" class="relative group block">
                <div class="uppercase grid place-content-center h-8 w-8 rounded-full bg-primary text-white text-sm font-semibold">
                  {{ user?.name.charAt(0) }}
                </div>
              </button>
              <template #content="{}">
                <ul class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div class="flex items-center px-4 py-4">
                      <div class="flex-none">
                        <div class="uppercase grid place-content-center h-8 w-8 rounded-full bg-primary text-white text-sm font-semibold">
                          {{ user?.name.charAt(0) }}
                        </div>
                        <!-- <img class="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="" /> -->
                      </div>
                      <div class="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 class="text-base">
                          {{ user?.name }}
                          <!-- <span class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2"></span> -->
                        </h4>
                        <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white" href="javascript:;">{{ user?.phone }}</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </template>
            </Popper>
          </div>
        </div>
      </div>

      <!-- horizontal menu -->
      <ul
        class="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark"
      >
        <li class="menu nav-item relative">
          <a href="javascript:;" class="nav-link">
            <div class="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                <path
                  opacity="0.5"
                  d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                  fill="currentColor"
                />
                <path
                  d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                  fill="currentColor"
                />
              </svg>

              <span class="px-2">{{ $t('dashboard') }}</span>
            </div>
            <div class="right_arrow">
              <svg class="w-4 h-4 rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </a>
          <ul class="sub-menu">
            <li>
              <router-link to="/">{{ $t('sales') }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import appSetting from '@/app-setting';

import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/index';
import { useAuthUserStore } from '@/stores/AuthUserStore';
import imzo from '../eimzo/imzo.vue';
const store = useAppStore();
const storeUser = useAuthUserStore();
const route = useRoute();
const search = ref(false);
const { user } = storeToRefs(storeUser);
// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
  i18n.locale = item.code;
  appSetting.toggleLanguage(item);
};
const currentFlag = computed(() => {
  return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});

const notifications = ref([
  {
    id: 1,
    profile: 'user-profile.jpeg',
    message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
    time: '45 min ago',
  },
  {
    id: 2,
    profile: 'profile-34.jpeg',
    message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
    time: '9h Ago',
  },
  {
    id: 3,
    profile: 'profile-16.jpeg',
    message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
    time: '9h Ago',
  },
]);

const messages = ref([
  {
    id: 1,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
    title: 'Congratulations!',
    message: 'Your OS has been updated.',
    time: '1hr',
  },
  {
    id: 2,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
    title: 'Did you know?',
    message: 'You can switch between artboards.',
    time: '2hr',
  },
  {
    id: 3,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
    title: 'Something went wrong!',
    message: 'Send Reposrt',
    time: '2days',
  },
  {
    id: 4,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
    title: 'Warning',
    message: 'Your password strength is low.',
    time: '5days',
  },
]);

onMounted(() => {
  setActiveDropdown();
});

watch(route, (to, from) => {
  setActiveDropdown();
});

const setActiveDropdown = () => {
  const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
  if (selector) {
    selector.classList.add('active');
    const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
    for (let i = 0; i < all.length; i++) {
      all[0]?.classList.remove('active');
    }
    const ul: any = selector.closest('ul.sub-menu');
    if (ul) {
      let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
      if (ele) {
        ele = ele[0];
        setTimeout(() => {
          ele?.classList.add('active');
        });
      }
    }
  }
};

const removeNotification = (value: number) => {
  notifications.value = notifications.value.filter((d) => d.id !== value);
};

const removeMessage = (value: number) => {
  messages.value = messages.value.filter((d) => d.id !== value);
};
</script>
