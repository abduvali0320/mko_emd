<template>
  <div class="panel px-5 py-7 border-[#e0e6ed] dark:border-[#1b2e4b]">
    <div class="mb-4">
      <h3 class="text-xl">{{ $t('add_app') }}</h3>
    </div>
    <form class="space-y-5" @submit.prevent="submitForm()">
      <div class="grid grid-cols-1 md:grid-cols-8 gap-5">
        <!-- client_id -->
        <div class="md:col-span-1" :class="{ 'has-error': $v4.form.client_id.id.$error }">
          <label class="ml-2" for="client_id">{{ $t('client_id') }} </label>
          <multiselect
            v-if="clientList"
            v-model="form.client_id"
            :options="clientList"
            class="custom-multiselect"
            :multiple="false"
            label="id"
            track-by="id"
            key="id"
            :placeholder="$t('select_option')"
            @search-change="asyncClient"
          >
            <template v-slot:option="{ option }">{{ option.surname }} {{ option.name }} </template>
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.client_id.id.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- client_code -->
        <div class="md:col-span-1" :class="{ 'has-error': $v4.form.client_id.id.$error }">
          <label class="ml-2" for="client_code">{{ $t('client_code') }} </label>
          <multiselect
            v-if="clientList"
            v-model="form.client_id"
            :options="clientList"
            class="custom-multiselect"
            :multiple="false"
            label="client_code"
            track-by="client_code"
            key="client_code"
            :placeholder="$t('select_option')"
            @search-change="asyncClient"
            disabled
          >
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.client_id.id.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- product_id -->
        <div class="md:col-span-2" :class="{ 'has-error': $v4.form.product_id.id.$error }">
          <label class="ml-2" for="product_id">{{ $t('product_id') }}</label>
          <multiselect
            v-if="productList"
            v-model="form.product_id"
            :options="productList"
            class="custom-multiselect"
            :multiple="false"
            label="id"
            track-by="id"
            key="id"
            :placeholder="$t('select_option')"
            @search-change="asyncProduct"
            @update:model-value="updateSelectedProduct"
          >
            <template v-slot:option="{ option }">{{ option.title }} </template>
          </multiselect>
          <template v-if="isSubmitForm && $v4.form.product_id.id.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>

        <!-- summa -->
        <div class="md:col-span-2" :class="{ 'has-error': $v4.form.summa.$error }">
          <label class="ml-2" for="summa">{{ $t('summa') }}</label>
          <input id="summa" type="text" :placeholder="$t('summa')" class="form-input" v-model="form.summa" v-maska:[monyMaskOptions] />
          <template v-if="isSubmitForm && $v4.form.summa.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
          </template>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
        <!-- contract_date -->
        <div>
          <div class="md:col-span-2">
            <label class="ml-2" for="contract_date">{{ $t('contract_date') }}</label>
            <flat-pickr
              id="contract_date"
              type="text"
              :placeholder="$t('contract_date')"
              class="form-input"
              v-model="form.contract_date"
              :config="basic"
              disabled
            />
          </div>
        </div>

        <div>
          <div class="md:col-span-2">
            <label class="ml-2" for="close_date">{{ $t('close_date') }}</label>
            <flat-pickr
              id="close_date"
              type="text"
              :placeholder="$t('close_date')"
              class="form-input"
              v-model="form.close_date"
              :config="basic"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary !mt-6" :loading="loading">{{ $t('save') }}</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/axios';
import Swal from 'sweetalert2';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
import { useVuelidate } from '@vuelidate/core';
import { vMaska } from 'maska';
import flatPickr from 'vue-flatpickr-component';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { goodsListInterface } from '@/@types/goods';
import 'flatpickr/dist/flatpickr.css';

import { applicationAdd } from '@/rules/application';

const productList = ref<any[]>([]);
useMeta({ title: '' });
const $router = useRouter();
const loading = ref<boolean>(false);
const sourceLoading = ref<boolean>(false);
const form = ref({
  product_id: {
    id: '',
    name: '',
  },
  client_id: {
    id: '',
  },
  summa: '',
  contract_date: new Date(),
  close_date: new Date(),
});
const isSubmitForm = ref(false);
const clientList = ref([]);
const basic: any = ref({
  dateFormat: 'd/m/Y',
  position:  'auto left',
});
const $v4 = useVuelidate(applicationAdd, { form });
const submitForm = () => {
  isSubmitForm.value = true;
  $v4.value.form.$touch();
  if ($v4.value.form.$invalid) {
    return false;
  }
  clientSave();
};

async function clientSave() {
  loading.value = true;
  try {
    const response = await api.post('contract/create', {
      product_id: form.value.product_id.id,
      client_id: form.value.client_id.id,
      summa: form.value.summa.replace(/\D/g, ''),
    });
    if (response.status === 200) {
      showMessage('Form submitted successfully.');
      $router.push('/application');
    }
  } catch (err: any) {
  } finally {
    loading.value = false;
  }
}

async function asyncClient(query: string) {
  if (!sourceLoading.value && query && query.length == 8) {
    getClientList(query);
  }
}

async function asyncProduct(query: string) {
  if (!sourceLoading.value && query && query.length == 8) {
    getGoodsList(query);
  }
}

async function updateSelectedProduct(value: any) {
  loading.value = true;
  try {
    let dt = new Date();
    const response = await api.get('product/get/' + value.id);
    dt.setMonth(dt.getMonth() + Number(response?.data?.period));
    form.value.close_date = dt;
  } catch (err: any) {
  } finally {
    loading.value = false;
  }
}

async function getClientList(search: string | null) {
  sourceLoading.value = true;
  try {
    const response = await api.get('client/list', {
      params: {
        per_page: 10,
        search: search,
      },
    });
    clientList.value = response.data.data || [];
  } catch (err: any) {
  } finally {
    sourceLoading.value = false;
  }
}

async function getGoodsList(search?: string | null) {
  loading.value = true;
  try {
    const response = await api.get('product/list', {
      params: {
        page: 1,
        per_page: 100,
        search: search,
      },
    });
    productList.value = response.data.data || [];
  } catch (err: any) {}
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

const monyMaskOptions = {
  preProcess: val => val.replace(/\D/g, ''),
  postProcess: val => {
    if (!val) return ' '
    console.log(val)
    const reversed = val.split('').reverse().join('') // Sonni aksinchi tartibda saqlash
    const parts = reversed.match(/.{1,3}/g) // Uchtadan uchta raqamlar bo'limlariga ajratish

    return parts.join(' ').split('').reverse().join('') 
  }
}

onMounted(() => {
  getClientList(null);
  getGoodsList();
});
</script>