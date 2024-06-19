<template>
  <div class="panel px-5 py-7 mt-10 border-[#e0e6ed] dark:border-[#1b2e4b] relative">
    <div class="mb-4">
      <h3 class="text-xl">{{ $t('add_credit_product') }}</h3>
    </div>
    <form class="space-y-5" @submit.prevent="submitForm()">
      <button type="submit" class="btn absolute btn-primary" style="top: -50px; right: 5px">
        <svg class="mr-2" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.4"
            d="M0.666748 4.83333V16.5C0.666748 17.1917 1.45008 17.5833 2.00008 17.1667L3.42508 16.1C3.75841 15.85 4.22508 15.8833 4.52508 16.1833L5.90841 17.575C6.23341 17.9 6.76675 17.9 7.09175 17.575L8.49175 16.175C8.78341 15.8833 9.25008 15.85 9.57508 16.1L11.0001 17.1667C11.5501 17.575 12.3334 17.1833 12.3334 16.5V2.33333C12.3334 1.41666 13.0834 0.666664 14.0001 0.666664H4.83341H4.00008C1.50008 0.666664 0.666748 2.15833 0.666748 4V4.83333Z"
            fill="white"
          />
        </svg>

        {{ $route.params?.id != 'null' ? $t('update_credit_product_btn') : $t('add_credit_product_btn') }}
      </button>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
        <!-- title -->
        <div class="md:col-span-3" :class="{ 'has-error': $v4.form.title.$error }">
          <label class="ml-2" for="title">{{ $t('name_for_think') }} </label>
          <input id="title" type="text" :placeholder="$t('name_for_think')" class="form-input" v-model="form.title" />
          <template v-if="isSubmitForm && $v4.form.title.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- period -->
        <div class="md:col-span-3" :class="{ 'has-error': $v4.form.period.$error }">
          <label class="ml-2" for="period">{{ $t('period') }}</label>
          <input id="period" type="text" :placeholder="$t('period')" class="form-input" v-model="form.period" v-maska data-maska="######" />
          <template v-if="isSubmitForm && $v4.form.period.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- percent -->
        <div class="md:col-span-2" :class="{ 'has-error': $v4.form.percent.$error }">
          <label class="ml-2" for="percent">{{ $t('percent') }}</label>
          <input id="percent" type="text" :placeholder="'___.__'" class="form-input" v-model="form.percent" v-maska data-maska="###.##" />
          <template v-if="isSubmitForm && $v4.form.percent.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- prefix -->
        <div class="md:col-span-2" :class="{ 'has-error': $v4.form.prefix.$error }">
          <label class="ml-2" for="prefix">{{ $t('prefix') }}</label>
          <input id="prefix" type="text" :placeholder="'__'" class="form-input" v-model="form.prefix" v-maska data-maska="@@" />
          <template v-if="isSubmitForm && $v4.form.prefix.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <!-- type -->
        <div :class="{ 'has-error': $v4.form.type.$error }">
          <label class="ml-2" for="sex">{{ $t('type') }} </label>
          <multiselect
            v-if="type_credit_code"
            v-model="form.type"
            :options="type_credit_code"
            class="custom-multiselect"
            track-by="code_type_credit"
            label="title_credit"
            key="code_type_credit"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('type')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.type.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- object_type -->
        <div :class="{ 'has-error': $v4.form.object_type.$error }">
          <label class="ml-2" for="sex">{{ $t('object_type') }} </label>
          <multiselect
            v-if="credit_type_code"
            v-model="form.object_type"
            :options="credit_type_code"
            class="custom-multiselect"
            track-by="code"
            label="title"
            key="code"
            :multiple="false"
            :searchable="true"
            :placeholder="$t('object_type')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.object_type.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- urgency_type -->
        <div :class="{ 'has-error': $v4.form.urgency_type.$error }">
          <label class="ml-2" for="urgency_type">{{ $t('urgency_type') }}</label>
          <select id="urgency_type" class="form-select" v-model="form.urgency_type">
            <option :value="null">{{ $t('urgency_type') }}</option>
            <option v-for="(item, index) in urgency_interval" :key="index + 'urgency_interval'" :value="item.urgency_type_code">{{ item.title }}</option>
          </select>
          <template v-if="isSubmitForm && $v4.form.urgency_type.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- interval -->
        <div :class="{ 'has-error': $v4.form.interval.$error }">
          <label class="ml-2" for="interval">{{ $t('interval') }}</label>
          <select id="interval" class="form-select" v-model="form.interval">
            <option :value="null">{{ $t('interval') }}</option>
            <option v-for="(item, index) in urgency_interval" :key="index + 'urgency_interval'" :value="item.urgency_interval_code">{{ item.title }}</option>
          </select>
          <template v-if="isSubmitForm && $v4.form.interval.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- credit_type_code -->
        <!-- <div :class="{ 'has-error': $v4.form.credit_type_code?.$error }">
          <label class="ml-2" for="sex">{{ $t('credit_type_code') }} </label>
          <multiselect
            v-if="credit_type_code"
            v-model="form.credit_type_code"
            :options="credit_type_code"
            class="custom-multiselect"
            track-by="code"
            label="title"
            :multiple="false"
            :searchable="true"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.credit_type_code.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div> -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <!-- repayment_type -->
        <div>
          <label class="ml-2" for="repayment_type">{{ $t('repayment_type') }}</label>
          <select id="repayment_type" class="form-select" v-model="form.repayment_type">
            <option :value="null">{{ $t('repayment_type') }}</option>
          </select>
        </div>

        <!-- type_lizing -->
        <div>
          <label class="ml-2" for="type_lizing">{{ $t('type_lizing') }}</label>
          <select id="type_lizing" class="form-select" v-model="form.type_lizing">
            <option :value="null">{{ $t('type_lizing') }}</option>
            <option v-for="(item, index) in lease_type" :key="index + 'type_lizing'" :value="item.value">{{ item.label }}</option>
          </select>
        </div>

        <!-- max_amount -->
        <div>
          <label class="ml-2" for="max_amount">{{ $t('max_amount') }} </label>
          <input id="max_amount" type="text" :placeholder="$t('max_amount')" class="form-input" v-model="form.max_amount" v-maska:[monyMaskOptions] />
        </div>
      </div>

      <div class="flex justify-end">
        <button type="button" @click="pushAccounts" class="btn btn-primary !mt-6" :loading="loading">{{ $t('add') }}</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="">
          <label class="ml-2" for="rule">{{ $t('prefix') }} </label>
        </div>
        <div class="">
          <label class="ml-2" for="percent">{{ $t('name_for_think') }}</label>
        </div>
      </div>

      <div v-for="(item, index) in form.accounts" :key="index + 'data.accounts'" class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- codes -->
        <div :class="{ 'has-error': $v4.form.accounts[index]?.codes.code.$error }">
          <multiselect
            v-if="account_catalog"
            v-model="item.codes"
            :options="account_catalog"
            class="custom-multiselect"
            :multiple="false"
            label="code"
            key="code"
            :placeholder="$t('id_product')"
            @search-change="asyncAccountCtalog"
          >
            <template v-slot:option="{ option }">{{ option.title }} </template>
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.accounts[index]?.codes?.code.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- percent -->
        <div :class="{ 'has-error': $v4.form.accounts[index]?.codes.code.$error }" class="relative">
          <input id="percent" type="text" :placeholder="$t('account_code')" class="form-input" v-model="item.codes.title" disabled />
        </div>
          <div :class="{ 'has-error': $v4.form.accounts[index]?.codes.code.$error }" class="relative">
              <input id="percent" type="text" :placeholder="$t('type_account')" class="form-input" v-model="item.codes.type"  />
          </div>
        <button @click="form.accounts.splice(index, 1)" v-if="index != 0" type="button" class="btn w-10 h-10 shadow-none border-white p-0 rounded-full">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 1.00003L5.00002 5.00002M5.00002 5.00002L1.00003 9M5.00002 5.00002L1 1M5.00002 5.00002L8.99997 8.99997"
              stroke="#888EA8"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/plugins/axios';
import Swal from 'sweetalert2';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
import { useVuelidate } from '@vuelidate/core';
import { vMaska } from 'maska';
import { storeToRefs } from 'pinia';
import { useOptionsStore } from '@/stores/OptionsStore';
import flatPickr from 'vue-flatpickr-component';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { goodsListInterface } from '@/@types/goods';
import 'flatpickr/dist/flatpickr.css';
import { useGoodsAdd } from '@/composables/Goods/Add';

const optionsStore = useOptionsStore();
const { type_credit_code, credit_type_code, urgency_interval } = storeToRefs(optionsStore);
import { creditProductAdd } from '@/rules/creditProduct';
import router from '@/router';
const lease_type = ref([
  {
    value: '1',
    label: 'Автотранспорт',
  },
  {
    value: '2',
    label: 'Оборудование ',
  },
  {
    value: '3',
    label: 'Недвижимость',
  },
]);
const { account_catalog } = useGoodsAdd();
const productList = ref<goodsListInterface[]>([]);
useMeta({ title: '' });
const typeBtn = ref<string>('1');
const $router = useRouter();
const $route = useRoute();
const loading = ref<boolean>(false);
const sourceLoading = ref<boolean>(false);
const form = ref({
  percent: '',
  prefix: '',
  period: '',
  title: '',
  interval: '',
  max_amount: '',
  object_type: { code: '' },
  type: { code_type_credit: '' },
  type_lizing: null,
  repayment_type: null,
  urgency_type: null,
  accounts: [
    {
      codes: {
        code: '',
        title: '',
        type: '',
      },
    },
  ],
});
const isSubmitForm = ref(false);
const clientList = ref([]);

const $v4 = useVuelidate(creditProductAdd, { form });
const submitForm = () => {
  isSubmitForm.value = true;
  $v4.value.form.$touch();
  if ($v4.value.form.$invalid) {
    return false;
  }
  if ($route?.params?.id != 'null') {
    productUpdate();
  } else {
    productSave();
  }
};

async function productSave() {
  loading.value = true;
  try {
      const accounts  = form.value.accounts.filter((e:any)=>e.codes.code!=="").map((e: any) => {
          return {
                code: e?.codes?.code,
                type: e?.codes?.type
          }
      })
    const response = await api.post('product/create', {
      accounts: accounts,
      percent: Number(form.value.percent) || null,
      period: Number(form.value.period) || null,
      prefix: form.value.prefix,
      title: form.value.title,
      type: form.value.type?.code_type_credit || null,
      max_amount: form.value.max_amount?.replace(/\D/g, '') || null,
      object_type: form.value.object_type?.code || null,
      type_lizing: form.value.type_lizing || null,
      repayment_type: form.value.repayment_type,
      urgency_type: form.value.urgency_type || null,
      interval: form.value.interval || null,
    });
    if (response.status === 200) {
      showMessage('Form submitted successfully.');
      $router.push('/credit_product');
    }
  } catch (err: any) {
  } finally {
    loading.value = false;
  }
}

async function productUpdate() {
  loading.value = true;
  try {
      const accounts  = form.value.accounts.filter((e:any)=>e.codes.code!=="").map((e: any) => {
          return {
                code: e?.codes?.code,
                type: e?.codes?.type
          }
      })
    const response = await api.put('product/update/' + $route.params.id, {
      accounts: accounts,
      percent: Number(form.value.percent) || null,
      period: Number(form.value.period) || null,
      prefix: form.value.prefix,
      title: form.value.title,
      type: form.value.type?.code_type_credit || null,
      max_amount: form.value.max_amount?.replace(/\D/g, '') || null,
      object_type: form.value.object_type?.code || null,
      type_lizing: form.value.type_lizing || null,
      repayment_type: form.value.repayment_type,
      urgency_type: form.value.urgency_type || null,
      interval: form.value.interval || null,
    });
    if (response.status === 200) {
      showMessage('Form submitted successfully.');
      $router.push('/credit_product');
    }
  } catch (err: any) {
    console.log(err)
  } finally {
    loading.value = false;
  }
}
// async function updateSelected (value: any) {
//   form.value.period = value.full_name
// }

async function asyncAccountCtalog(query: string) {
  if (!sourceLoading.value && query && query.length > 1) {
    optionsStore.getAccountCatalog(query);
  }
}

async function getProductDate() {
  loading.value = true;
  try {
    const response = await api.get('product/get/' + $route.params.id);
    form.value.title = response?.data?.title;
    form.value.period = response?.data?.period;
    form.value.percent = response?.data?.percent;
    form.value.prefix = response?.data?.prefix;
    form.value.type = response?.data?.type;
    form.value.object_type = response?.data?.object_type;
    form.value.urgency_type = response?.data?.urgency_type?.urgency_type_code;
    form.value.interval = response?.data?.interval?.urgency_interval_code;
    form.value.repayment_type = response?.data?.repayment_type;
    form.value.type_lizing = response?.data?.type_lizing;
    form.value.max_amount = response?.data?.max_amount;

    response?.data?.items.forEach((item) => {
      form.value.accounts.push({
        codes: {
          code: item.account_code,
          title: item?.source?.title,
          type: item?.type,
        },
      });
    });

    form.value.accounts.splice(0, 1);
  } catch (err: any) {
  } finally {
    loading.value = false;
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

const pushAccounts = () => {
  form.value.accounts.push({
    codes: {
      code: '',
      title: '',
        type:''
    },
  });
  console.log($v4.value.form.accounts);
};

const monyMaskOptions = {
  preProcess: (val) => val.replace(/\D/g, ''),
  postProcess: (val) => {
    if (!val) return ' ';
    console.log(val);
    const reversed = val.split('').reverse().join(''); // Sonni aksinchi tartibda saqlash
    const parts = reversed.match(/.{1,3}/g); // Uchtadan uchta raqamlar bo'limlariga ajratish

    return parts.join(' ').split('').reverse().join('');
  },
};

onMounted(() => {
  optionsStore.getBorrowerType();
  optionsStore.getTypeCredit();
  optionsStore.getCreditType();
  optionsStore.getUrgencyInterval();
  if ($route.params.id != 'null') {
    getProductDate();
  }
});
</script>
