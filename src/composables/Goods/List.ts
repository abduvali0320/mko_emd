
import { ref, onMounted, reactive, watch } from 'vue';
import { api } from '@/plugins/axios';
import { goodsListInterface } from '@/@types/goods'
import { useI18n } from 'vue-i18n';

export function useGoodsList() {
   const loading = ref<boolean>(false)
   const {t}=useI18n()
   const search = ref<string>('');
   const cols = ref([
      { field: 'title', title: 'Наименование' },
      { field: 'prefix', title: t('prefix') },
      { field: 'actions', title: '', sort: false, headerClass: 'justify-center' },
   ]);
   const columns = ref(['name', 'actions']);
   const list = ref<goodsListInterface []>([])
   const params = reactive({ current_page: 1, pagesize: 10 });
   const total = ref(0)
   const changeServer = (data: any) => {
      params.current_page = data.current_page;
      params.pagesize = data.pagesize;
      getGoodsList();
   };

   async function getGoodsList () {
      loading.value = true;
      try {
         const response = await api.get('product/list', {
            params: {
               page: params.current_page,
               per_page: params.pagesize,
               search: search.value.length <= 1 ? null : search.value
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
      getGoodsList()
   });
   
   watch(
      () => search.value,
      (newVal) => {
         if (newVal && newVal.length> 2 && !loading.value) {
            getGoodsList()
         }
      }
   )

   return {
      search,
      loading,
      cols,
      columns,
      list,
      params,
      total,
      changeServer,
   }
}