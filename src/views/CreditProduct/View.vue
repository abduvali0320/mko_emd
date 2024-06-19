<template>
  <div class="panel px-5 py-5 border-[#e0e6ed] dark:border-[#1b2e4b]">
    <div class="flex justify-between sm:flex-row flex-col gap-6">
      <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('period') }} :</div>
          <div>{{ product?.period }} {{ $t('month') }}</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('percent') }} :</div>
          <div>{{ product?.percent }} %</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('type') }} :</div>
          <div>{{ product?.type.title_credit }}</div>
        </div>
        <div class="flex items-center w-full justify-between">
          <div class="text-white-dark">{{ $t('object_type') }} :</div>
          <div>{{ product?.object_type.title }}</div>
        </div>
        <div class="flex items-center w-full justify-between">
          <div class="text-white-dark">{{ $t('urgency_type') }} :</div>
          <div>{{ product?.urgency_type.title }}</div>
        </div>
      </div>
      <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('interval') }}:</div>
          <div class="whitespace-nowrap">{{ product?.interval.title }}</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('repayment_type') }}:</div>
          <div>{{ product?.repayment_type? product.repayment_type:'' }}</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('type_lizing') }}:</div>
          <div>{{ product?.type_lizing?product.type_lizing:'' }}</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('max_amount') }}:</div>
          <div>{{ product?.max_amount? product.max_amount:'' }}</div>
        </div>
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('prefix') }}:</div>
          <div>{{ product?.prefix }}</div>
        </div>
      </div>
    </div>
    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />


    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('prefix') }}</th>
          <th>{{ $t('name_for_think') }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(data,index) in product?.items" :key="data.id">
          <tr>
            <td class="whitespace-nowrap">{{ index+1 }}</td>
            <td>{{ data?.account_code }}</td>
            <td>{{ data?.source?.title }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/plugins/axios';
import { useMeta } from '@/composables/use-meta';
import { goodsListInterface } from '@/@types/goods';
import { goodInterface } from '@/@types/product.model';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import 'flatpickr/dist/flatpickr.css';
const productList = ref<goodsListInterface[]>([]);
const product = ref<goodInterface|null>();


useMeta({ title: '' });
const $router = useRouter();
const $route = useRoute();
const loading = ref<boolean>(false);

const sourceLoading = ref<boolean>(false);


async function getProduct() {
  loading.value = true;
  try {
    const response = await api.get('product/get/' + $route.params.id);
    product.value=response.data
  } catch (err: any) {
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getProduct();
});
</script>