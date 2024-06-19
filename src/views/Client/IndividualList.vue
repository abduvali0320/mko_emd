<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <!-- <button type="button" class="btn btn-danger gap-2" @click="deleteRow()">
                            <icon-trash-lines />
                            Delete
                        </button> -->
                        <router-link to="/client/individual/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{$t('add')}}
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="list"
                    :columns="cols"
                    :totalRows="total"
                    :hasCheckbox="true"
                    :sortable="true"
                    :search="search"
                    :loading="loading"
                    :isServerMode="true"
                    :pageSize="params.pagesize"
                    @change="changeServer"
                    @rowClick="rowClick"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >

                    <template #name="data">
                            {{ data.value?.surname+' '+data.value.name+' '+data.value?.patronymic}}
                    </template>
                    <template #district_code="data">
                        <div>{{data.value.district}}</div>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-start">
                            <router-link :to="`/client/individual/edit/${data.value.id}`" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </router-link>
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
    import IconPlus from '@/components/icon/icon-plus.vue';
    import { useRouter } from 'vue-router';
    import IconEdit from '@/components/icon/icon-edit.vue';


    const router = useRouter();

    useMeta({ title: 'Список клиентов' });

    const datatable: any = ref(null);
    const loading = ref<boolean>(false)
    const search = ref('');
    const cols = ref([
        { field: 'client_code', title: 'Код клиента' },
        { field: 'name', title: 'Имя' },
        { field: 'pinfl', title: 'Пинфл' },
        { field: 'birth_date', title: 'Дата рождения' },
        { field: 'created_at', title: 'Дата открытия' },
        {field: 'actions', title: ''}
    ]);
    const list = ref([])
    const params = reactive({ current_page: 1, pagesize: 10 });
    const total = ref(0)
    const searchText = ref('');
    const columns = ref(['full_name', 'birth_date', 'pinfl', 'region_code', 'district_code', 'actions']);
    const rowClick = (item: any) => {
        router.push('/client/individual/profile/'+item.id)
    };
    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        getClientList();
    };
    async function getClientList () {
        loading.value = true;
        try {
            const response = await api.get('client/list',{
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
