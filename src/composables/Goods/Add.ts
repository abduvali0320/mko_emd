import { ref, onMounted, reactive, watch } from 'vue';
import { goodsAddInterface } from '@/@types/goods'
import { useVuelidate } from '@vuelidate/core';
import { goodsAdd } from '@/rules/goods'
import { api } from '@/plugins/axios';
import { storeToRefs } from 'pinia';
import { useOptionsStore } from '@/stores/OptionsStore';
import Swal from 'sweetalert2';
import { useRouter, useRoute } from 'vue-router';

export function useGoodsAdd() {

   const optionsStore = useOptionsStore();
   const { account_catalog, sourceLoading } = storeToRefs(optionsStore);
   const $router = useRouter();
   const $route = useRoute();
   const data = ref<goodsAddInterface>({
      name: '',
      accounts: [
         {
            percent: 0,
            max_percent: 0,
            codes: null
         }
      ]
   })

   const addLoading = ref<boolean>(false)
   const isSubmitForm = ref(false);
   const rule = useVuelidate(goodsAdd, { data });

   const pushAccounts =() => {
      data.value.accounts.push({
         percent: 0,
         max_percent: 0,
         codes: null
      })
   }

   async function asyncAccountCtalog (query: string) {
      if(!sourceLoading.value && query && query.length > 1) {
         optionsStore.getAccountCatalog(query)
      }
   }

   async function saveGoods () {
      addLoading.value = true;
      try {
         const response = await api.post('product/create', {
            name: data.value.name,
            accounts: data.value.accounts.map(item => {
               if(item.codes?.code) {
                  return {
                     code: item.codes?.code,
                     percent: item.percent,
                     max_percent: item.max_percent
                   };
               }
             })
         });
         if(response.status ==200) {
            showMessage('Form submitted successfully.');
            $router.push('/goods');
         }
      } catch (err: any) {
      } finally {
         addLoading.value = false;
      }
   }
   async function editGoods () {
      addLoading.value = true;
      try {
         const response = await api.post('product/update/' + $route.params.id, {
            name: data.value.name,
            accounts: data.value.accounts.map(item => {
               if(item.codes?.code) {
                  return {
                     code: item.codes?.code,
                     percent: item.percent,
                     max_percent: item.max_percent
                   };
               }
             })
         });
         if(response.status ==200) {
            showMessage('Form submitted successfully.');
            $router.push('/goods');
         }
      } catch (err: any) {
      } finally {
         addLoading.value = false;
      }
   }

   async function getGoods () {
      try {
         const response = await api.get('product/get/' + $route.params.id);
         console.log('response response response', response)
         data.value.name = response.data.name
         data.value.accounts = response.data.items.map(item => {
            return {
               percent: item.percent,
               max_percent: item.max_percent,
               codes: {
                  code: item.code,
                  title: item.source.title,
               }
            };
          })
      } catch (err: any) {
      } 
   }

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

   onMounted(() => {
      optionsStore.getAccountCatalog(null)
   });




   return {
      data,
      isSubmitForm,
      rule,
      saveGoods,
      account_catalog,
      addLoading,
      pushAccounts,
      getGoods,
      editGoods,
      asyncAccountCtalog
   }
}