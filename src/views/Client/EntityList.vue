<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <router-link to="/client/entity/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{$t('add')}}
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>
                <vue3-datatable
                    :rows="list"
                    :columns="cols"
                    :totalRows="total"
                    :hasCheckbox="true"
                    :isServerMode="true"
                    :sortable="true"
                    :search="search"
                    :loading="loading"
                    :pageSize="params.pagesize"
                    @change="changeServer"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #account_number="data">
                        <router-link :to="`/client/entity/${data.value.id}`" class="text-primary underline font-semibold hover:no-underline"
                            >#{{ data.value.account_number }}</router-link
                        >
                    </template>
                    <template #full_name="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.full_name }}
                        </div>
                    </template>
                    <template #pinfl="data">
                        <div class="flex items-center font-semibold">{{ data.value.pinfl }}</div>
                    </template>
                    <template #created_at="data">
                        <span>{{data.value.created_at.split("T")[0] }}</span>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
                            <router-link to="/apps/invoice/edit" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </router-link>
                            <router-link to="/apps/invoice/preview" class="hover:text-primary">
                               <icon-eye />
                            </router-link>
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.id}`)">
                                <icon-trash-lines />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import { api } from '@/plugins/axios';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';

    useMeta({ title: 'Список клиентов' });

    const datatable: any = ref(null);
    const loading = ref<boolean>(false)
    const search = ref('');
    const cols = ref([
        { field: 'account_number', title: 'Номер счета' },
        { field: 'name', title: 'Имя' },
        { field: 'director', title: 'Директор' },
        { field: 'created_at', title: 'Создан в' },
        { field: 'actions', title: '', sort: false, headerClass: 'justify-center' },
    ]);
    const list = ref([])
    const total = ref(0)

    const searchText = ref('');
    const columns = ref(['account_number', 'full_name', 'pinfl', 'created_at', 'actions']);
    const params = reactive({ current_page: 1, pagesize: 10 });
    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        getClientList();
    };

    const deleteRow = (item: any = null) => {
        console.log(item)
    };
    async function getClientList () {
        loading.value = true;
        try {
            const response = await api.get('company/list', {
                params: {
                    page: params.current_page,
                    per_page: params.pagesize,
                }
            });
            list.value = response.data.data || []
            total.value = response.data.pagination.total
        } catch (err: any) {
        } finally {
            loading.value = false;
        }
    }
    onMounted(() => {
        getClientList()
    });
</script>