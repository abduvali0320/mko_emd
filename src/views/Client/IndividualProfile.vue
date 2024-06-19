<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/client/individual" class="text-primary hover:underline">Физические лица</router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ client?.surname }} {{ client?.name }}</span>
            </li>
        </ul>
        <div class="flex p-5">
            <div class="flex-none w-3/12 m-2">
                <div class="panel">
                    <div class="flex items-center justify-between mb-5">
                        <h5 class="font-semibold text-lg dark:text-white-light">{{$t('profile')}}</h5>
                        <button class="btn btn-primary btn-sm  shrink-0" @click="editClient">
                            <icon-edit class="w-5 h-5" />
                        </button>
                    </div>
                    <div class="mb-5">
                        <div class="flex flex-col justify-center items-center">
                            <icon-user class="w-16 h-16 text-primary" />
                            <p class="font-semibold text-primary text-xl">{{client?.surname}} {{client?.name}} {{client?.patronymic}}</p>
                        </div>
                        <ul class="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                            <li class="flex items-center gap-2">
                                {{ $t('client_code') }}:
                                {{ client?.client_code }}
                            </li>
                            <li class="flex items-center gap-2">
                                {{ $t('pinfl') }}:
                                {{ client?.pinfl }}
                            </li>
                            <li>
                                <div class="flex items-center gap-2">
                                    {{ $t('birth_date') }}:
                                    {{ client?.birth_date }}
                                </div>
                            </li>

                        </ul>
<!--                        button create goods-->
                        <div class="flex justify-center mt-5">
                            <router-link :to="{ name: 'application.add', params: { clientId: client?.id } }" class="btn btn-primary">
                                {{ $t('create_app') }}
                            </router-link>


                        </div>
                    </div>
                </div>
                <div class="panel mt-2 ">
                    <div class=" pb-16">
                        <perfect-scrollbar
                            :options="{
                                swipeEasing: true,
                                wheelPropagation: false,
                            }"
                            class="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow"
                        >
                            <div class="space-y-1">
                                <button
                                    type="button"
                                    class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                    :class="{
                                        'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': selectedTab === 'contracts',
                                    }"
                                    @click="tabChanged('contracts')"
                                >
                                    <div class="flex items-center">
                                        <icon-list-check class="w-5 h-5 shrink-0" />
                                        <div class="ltr:ml-3 rtl:mr-3">{{ $t('list_contract') }}</div>
                                    </div>

                                </button>
                            </div>
                        </perfect-scrollbar>
                    </div>
                </div>
            </div>
            <div class="flex-1 m-2">
                <div class="panel">
                    <div class="datatable">
                        <vue3-datatable
                            :rows="rows"
                            :columns="cols"

                            skin="bh-table-striped"
                            firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                            previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        >
                        </vue3-datatable>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>
<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { api } from '@/plugins/axios';
    import { onMounted, ref } from 'vue';
    import { Client } from '@/@types/client';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import IconUser from '@/components/icon/icon-user.vue';
    import IconListCheck from '@/components/icon/icon-list-check.vue';
    import { ContractList } from '@/@types/contract';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import router from '@/router';
    const route = useRoute();
    const client = ref<Client>();
    const selectedTab = ref('contracts');
    const rows = ref<ContractList>()

    const cols = [
        {field:'id',title:"ID"},
        {field:'number',title:'contract_number'},
        {field:'summa',title: "Summa"}
    ]


    async function getClient () {
        try {
            const response = await api.get(`/client/get/${route.params.id}`);

            client.value = response.data;
            await getContracts(client.value?.client_code)
        } catch (error) {
            console.log(error);
        }
    }
    async function getContracts(code: string | undefined){
        try {
            const body = {
                client_code:code
            }
            const response = await api.get(`/contract/list`,{params:body});

            rows.value = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        }catch (error){
            console.log(error);
        }
    }
    const tabChanged = (tabType: any) => {
        console.log(tabType,"Type");
        selectedTab.value = tabType;
    };
    const editClient = () => {
        router.push(`/client/individual/edit/${route.params.id}`);
    };

    onMounted(() => {
        getClient();
    });
</script>
