<template>
   <div class="panel px-5 py-7 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="mb-4">
         <h3 class="text-xl"> {{$t('add_doods')}} </h3>
      </div>
      <!-- name -->
      <div class="relative mb-4">
         <label class="ml-2" for="name">{{ $t('name') }}</label>
         <input 
            id="name" 
            type="text" 
            :placeholder="$t('name')" 
            class="form-input" 
            v-model="data.name" 
         />
      </div>
      <div 
         v-for="(item, index) in data.accounts"
         :key="index + 'data.accounts'"
         class="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
         <!-- codes -->
         <div>
            <label class="ml-2" for="rule">{{ $t('codes') }} </label>
            <multiselect
               v-if="account_catalog"
               v-model="item.codes"
               :options="account_catalog"
               class="custom-multiselect"
               :multiple="false"
               label="title"
               track-by="code"
               key="code"
               :placeholder="$t('select_option')"
               @search-change="asyncAccountCtalog"
            >
            </multiselect>
         </div>

         <!-- percent -->
         <div class="relative " >
            <label class="ml-2" for="percent">{{ $t('percent') }}</label>
            <input 
               id="percent" 
               type="text" 
               :placeholder="$t('percent')" 
               class="form-input" 
               v-model="item.percent" 
            />
         </div>

         <!-- max_percent -->
         <div class="relative" >
            <label class="ml-2" for="max_percent">{{ $t('max_percent') }}</label>
            <input 
               id="max_percent" 
               type="text" 
               :placeholder="$t('max_percent')" 
               class="form-input" 
               v-model="item.max_percent" 
            />
         </div>
      </div>
      <div class="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
         <button @click="pushAccounts"  class="btn btn-primary mt-5">{{ $t('add') }}</button>
         <button @click="saveGoods"  class="btn btn-primary mt-5">{{ $t('save') }}</button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Multiselect from '@suadelabs/vue3-multiselect';
import { useGoodsAdd } from '@/composables/Goods/Add'
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Добавлять продукт' });
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

const {
   data,
   isSubmitForm,
   rule,
   saveGoods,
   account_catalog,
   addLoading,
   pushAccounts,
   asyncAccountCtalog
 } = useGoodsAdd()

</script>