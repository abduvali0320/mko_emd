<template>
  <div class="p-4 border border-gray-200"></div>
  <h2>Transaction</h2>
  <div class="flex gap-4 items-center">
    <button @click="storeCounter.increment(5)" class="bg-slate-700 px-5 py-2 rounded-md text-white">plus</button>
    <h1>{{ storeCounter.count }}</h1>
    <button @click="storeCounter.decrement(3)" class="bg-red-600 px-5 py-2 rounded-md text-white">minus</button>
    <h2> this number is {{storeCounter.checkNumber}} </h2>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('debt') }}</th>
        <th>{{ $t('credit') }}</th>
        <th>{{ $t('summa') }}</th>
        <th>{{ $t('date') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(data, index) in transaction" :key="data.id">
        <tr>
          <td class="whitespace-nowrap">{{ index + 1 }}</td>
          <td>{{ data?.debt }}</td>
          <td>{{ data?.credit }}</td>
          <td>{{ formatSaldo(data?.saldo) }}</td>
          <td>{{ formatDate(data?.created_at) }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
// import { store } from '../../stores/Store';

import { api } from '@/plugins/axios';
import { onMounted, ref } from 'vue';

import { counterStore } from '../../stores/Store';
const storeCounter = counterStore();

const loading = ref<boolean>(false);
const transaction = ref<Array<{ debt: number; credit: number; saldo: number; created_at: string }> | null>(null);

const formatSaldo = (saldo: number | null) => {
  if (saldo !== null) {
    return saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
    // return (saldo / 100).toLocaleString('ru');
  }
  return '';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

async function getTransaction() {
  loading.value = true;
  try {
    const response = await api.get('contract/transaction/list/14');
    transaction.value = [...response.data];
  } catch (err) {
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getTransaction();
});
</script>