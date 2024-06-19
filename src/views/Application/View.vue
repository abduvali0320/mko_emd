<template>
  <div v-if="aplication!=null" class="panel px-5 py-5 border-[#e0e6ed] dark:border-[#1b2e4b]">
    <div class="flex justify-between sm:flex-row flex-col gap-6">
      <div class="space-y-1 text-white-dark">
        <div>{{ $t('client') }}:</div>
        <div class="text-white-dark">
          {{ aplication?.client?.surname + ' ' + aplication?.client?.name + ' ' + aplication?.client?.patronymic }}
        </div>
        <div>{{ $t('client_id') }}:</div>
        <div class="text-white-dark">{{ aplication?.client?.id }}</div>
        <div>{{ $t('client_code') }}:</div>
        <div class="text-white-dark">{{ aplication?.client?.client_code }}</div>
      </div>
      <div class="space-y-1 text-white-dark">
        <div class="flex items-center w-full justify-between mb-2">
          <div class="text-white-dark">{{ $t('product_id') }} :</div>
          <div>{{ aplication?.product?.id }}</div>
        </div>
        <div>{{ $t('product_name') }}:</div>
        <div class="text-white-dark">{{ aplication?.product?.title }}</div>
        <div>{{ $t('contract_number') }}:</div>
        <div class="text-white-dark">{{ aplication?.number }}</div>
        <div>{{ $t('contract_date') }}:</div>
        <div class="text-white-dark">
          {{ aplication?.contract_date.split('-')[2] }}/{{ aplication?.contract_date.split('-')[1] }}/{{ aplication?.contract_date.split('-')[0] }}
        </div>
      </div>
      <div class="space-y-1 text-white-dark">
        <div>{{ $t('percent') }}:</div>
        <div class="text-white-dark">{{ aplication?.product?.percent }}</div>
        <div>{{ $t('summa') }}:</div>
        <div class="text-white-dark">{{ monyMaskOptions(String(aplication.summa)) }}</div>
        <div>{{ $t('close_date') }}:</div>
        <div class="text-white-dark">
          {{ aplication?.close_date.split('-')[2] }}/{{ aplication?.close_date.split('-')[1] }}/{{ aplication?.close_date.split('-')[0] }}
        </div>
      </div>
    </div>
    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />

      <div>
          <div class="flex mb-4">
              <div class="">
                  <button class=" py-2 px-4 bg-black-light hover:bg-blue-100  " @click="tab = 'contracts'">Contracts</button>
              </div>
              <div class="">
                  <button class=" py-2 px-4 bg-black-light hover:bg-blue-100  " @click="tab = 'transition'">Transition</button>
              </div>
              <div class="">
                  <button class=" py-2 px-4 bg-black-light hover:bg-blue-100  " @click="tab = 'accounts'">{{ $t('accounts') }}</button>
              </div>
              <div class="">
                  <button class=" py-2 px-4 bg-black-light hover:bg-blue-100  " @click="tab = 'buttons'">Buttons</button>
              </div>
          </div>
          <div v-if="tab==='accounts'" class="p-4 border border-gray-200">
              <table>
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>{{ $t('account') }}</th>
                      <th>{{ $t('saldo_out') }}</th>
                      <th>{{ $t('saldo_in') }}</th>
                      <th>{{ $t('type_account') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                      <template v-for="(data, index) in accounts" :key="data.id">
                          <tr>
                              <td class="whitespace">
                                  {{ index + 1 }}
                              </td>
                              <td>{{ data.account }}</td>
                              <td>{{ formatSaldo(data.saldo_out) }}</td>
                              <td>{{ formatSaldo(data.saldo_in) }}</td>

                              <td>{{ data.type }}</td>
                          </tr>
                      </template>
                  </tbody>
              </table>

          </div>
          <div v-if="tab === 'contracts'" class="p-4 border border-gray-200">
              <table>
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>{{ $t('prefix') }}</th>
                      <th>{{ $t('Invoice') }}</th>
                      <th>{{ $t('name_for_think') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="(data, index) in aplication?.contract_account" :key="data.account_id">
                      <tr>
                          <td class="whitespace-nowrap">{{ index + 1 }}</td>
                          <td>{{ data?.account_type }}</td>
                          <td>{{ data?.account?.account }}</td>
                          <td>{{ data?.source?.title }}</td>
                      </tr>
                  </template>
                  </tbody>
              </table>
          </div>

          <div v-if="tab === 'transition'" class="p-4 border border-gray-200">
              <h2 class="">Transactions</h2>
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
                  <template v-for="(data, index) in transition" :key="data.id">
                      <tr>
                          <td class="whitespace-nowrap">{{ index + 1 }}</td>
                          <td>{{ data?.debt }}</td>
                          <td>{{ data?.credit }}</td>
                          <td>{{ formatSaldo(data?.saldo) }}</td>
                          <td>{{formatDate(data?.created_at)}}</td>
                      </tr>
                  </template>
                  </tbody>
              </table>
          </div>
          <div v-if="tab === 'buttons'" class="p-4 border border-gray-200">
              <h2 class="font-bold mb-4">Buttons</h2>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">1. Одобрение кредита</p>
                  <button
                      :disabled="loadingTest1"
                      @click="Test1" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на сумму договора
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">2. Выдача кредита на карту</p>
                  <button
                      :disabled="loadingTest2"
                      @click="Test2" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на сумму выдачи
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">3.Начисление % на срочный ОД ежедневно</p>
                  <button

                      @click="Test3" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      сумму считаем по ставке от срочного ОД
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">4.Вынос на просрочку ОД</p>
                  <button
                      :disabled="loadingTest4"
                      @click="Test4" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на не оплаченную часть транша ОД по графику
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">5.Вынос на просрочку %%</p>
                  <button
                      :disabled="loadingTest5"
                      @click="Test5" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на не оплаченную часть транша % по графику
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">6.Начисление % на просроченный ОД</p>
                  <button
                      :disabled="loadingTest6"
                      @click="Test6" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      сумму считаем по ставке от просроченного ОД
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">7.Поступление денег от клиента с карты</p>
                  <button
                      :disabled="loadingTest7"
                      @click="Test7" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на основании выписки с процессинга
                  </button>
              </div>
              <div class="w-full flex justify-between mb-4 p-2 border-b-2">
                  <p class="items-start">8.Поступеление денег на р/с по клирингу </p>
                  <button
                      :disabled="loadingTest8"
                      @click="Test8" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      на основании выписки с банковского счета Дт 23508 Кт 20216
                  </button>
              </div>
          </div>
      </div>


  </div>
</template>
<script lang="ts" setup>
    import {onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/plugins/axios';
import { useMeta } from '@/composables/use-meta';

    import { aplicationInterface } from '@/@types/aplication.model';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';

const aplication = ref<aplicationInterface | null>(null);
const transition = ref<Array<{debt: number, credit: number, saldo: number, created_at: string}> | null>(null);
const accounts = ref<Array<{account: string, saldo_in: number, saldo_out: number,type:string}> | null>(null);
const tab = ref('contracts');
const loadingTest1 = ref<boolean>(false);
const loadingTest2 = ref<boolean>(false);
const loadingTest3 = ref<boolean>(false);
const loadingTest4 = ref<boolean>(false);
const loadingTest5 = ref<boolean>(false);
const loadingTest6 = ref<boolean>(false);
const loadingTest7 = ref<boolean>(false);
const loadingTest8 = ref<boolean>(false);

    const formatSaldo = (saldo: number | null) => {
        if (saldo !== null) {
            return (saldo).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
            // return (saldo / 100).toLocaleString('ru');
        }
        return '';
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

useMeta({ title: '' });
const $router = useRouter();
const $route = useRoute();
const loading = ref<boolean>(false);

const sourceLoading = ref<boolean>(false);

async function getApplication() {
  loading.value = true;
  try {
    const response = await api.get('contract/get/' + $route.params.id);
    aplication.value = response.data;
  } catch (err: any) {
  } finally {
    loading.value = false;
  }
}


const monyMaskOptions=(val: string) => {
  const preProcessedVal = val.replace(/\D/g, '');

  if (!preProcessedVal) return '';

  // Sonni aksinchi tartibda saqlash
  const reversed = preProcessedVal.split('').reverse().join('');
  // Uchtadan uchta raqamlar bo'limlariga ajratish
  const parts = reversed.match(/.{1,3}/g);

  // Qo'shimcha vergul qo'yish va aksinchi tartibni tiklash
  return parts?.join(' ').split('').reverse().join('');
}
const Test1 = async () => {
    loadingTest1.value = true;
    try {
        await api.get('test1/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test2 = async () => {
    loadingTest2.value = true;
    try {
         await api.get('test2/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test3 = async () => {
    loadingTest3.value = true;
    try {
         await api.get('test3/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test4 = async () => {
    loadingTest4.value = true;
    try {
         await api.get('test4/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test5 = async () => {
    loadingTest5.value = true;
    try {
        await api.get('test5/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test6 = async () => {
    loadingTest6.value = true;
    try {
         await api.get('test6/' + $route.params.id);
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Операция прошла успешно',
        });

    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        });
    }

};
const Test7 = async () => {
    loadingTest7.value = true;
    Swal.fire({
        title: 'Введите сумму',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Подтвердить',
        showLoaderOnConfirm: true,
        preConfirm: (summa) => {
            return api.get('test7/' + $route.params.id + '/' + summa);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Успешно',
                text: 'Операция прошла успешно',
            });
        }
    });


};
const Test8 = async () => {
    loadingTest8.value = true;
    Swal.fire({
        title: 'Введите сумму',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Подтвердить',
        showLoaderOnConfirm: true,
        preConfirm: (summa) => {
            return api.get('test8/' + $route.params.id + '/' + summa);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Успешно',
                text: 'Операция прошла успешно',
            });
        }
    });
}

const getTransition = async () => {
    try {

        const response = await api.get(`contract/transaction/list/${$route.params.id}`);
        transition.value = response.data;
    } catch (err: any) {
    }
};
const getAccounts = async () => {
    try {
        const response = await api.get(`contract/accounts/list/${$route.params.id}`);
        accounts.value = response.data.map((item,index)=>{
            return {
                id:index,
                saldo_out: item?.account?.saldo_out,
                saldo_in: item?.account?.saldo_in,
                account: item?.account?.account,
                type: item?.account?.account_type
            }

        });
    } catch (err: any) {
    }
};
watch(tab, (value) => {
    if (value === 'transition') {
        getTransition();
    }
    if(value==='accounts'){
        getAccounts();
    }
});
onMounted(() => {
  getApplication();
});
</script>
