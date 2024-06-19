<template>
  <div class="panel px-5 py-5 border-[#e0e6ed] dark:border-[#1b2e4b]">
    <div class="flex justify-between">
      <h3 class="text-xl pb-4">
        Юридическое лицо
      </h3>
    </div>
    <form class="space-y-5" @submit.prevent="submitForm4()">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- account_number -->
        <div>
          <label class="ml-2" for="account_number">{{ $t('account_number') }}</label>
          <input 
            id="account_number" 
            type="text" 
            :placeholder="$t('account_number')" 
            class="form-input" 
            v-model="form4.account_number" 
            v-maska 
            data-maska="##########"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.account_number' }}</p>
          </template>
        </div>

        <!-- subject_type -->
        <div >
          <label class="ml-2" for="subject_type">{{ $t('subject_type') }}</label>
          <multiselect
            v-if="subject_type"
            v-model="form4.subject_type"
            :options="subject_type"
            class="custom-multiselect"
            track-by="code"
            label="title"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
            disabled
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.subject_type' }}</p>
          </template>
        </div>

        <!-- client_code -->
        <div>
          <label class="ml-2" for="client_code">{{ $t('client_code') }}</label>
          <input 
            id="client_code" 
            type="text" 
            :placeholder="$t('client_code')" 
            class="form-input" 
            v-model="form4.client_code" 
            v-maska 
            data-maska="########"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.client_code' }}</p>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- name -->
        <div>
          <label class="ml-2" for="name">{{ $t('name') }}</label>
          <input
            id="name"
            type="text"
            :placeholder="$t('name')"
            class="form-input"
            v-model="form4.name"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.name' }}</p>
          </template>
        </div>

        <!-- accountant -->
        <div>
          <label class="ml-2" for="accountant">{{ $t('accountant') }}</label>
          <input
            id="accountant"
            type="text"
            :placeholder="$t('accountant')"
            class="form-input"
            v-model="form4.accountant"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.accountant' }}</p>
          </template>
        </div>

        <!-- director -->
        <div>
          <label class="ml-2" for="director">{{ $t('director') }}</label>
          <input
            id="director"
            type="text"
            :placeholder="$t('director')"
            class="form-input"
            v-model="form4.director"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.director' }}</p>
          </template>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- phone -->
        <div>
          <label class="ml-2" for="phone">{{ $t('phone') }}</label>
          <input
            id="phone"
            type="text"
            :placeholder="$t('phone')"
            class="form-input"
            v-model="form4.phone"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.phone' }}</p>
          </template>
        </div>

        <!-- address -->
        <div>
          <label class="ml-2" for="address">{{ $t('address') }}</label>
          <input
            id="address"
            type="text"
           :placeholder="$t('address')"
            class="form-input"
            v-model="form4.address"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.address' }}</p>
          </template>
        </div>
      </div>
    
<!-- 
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="btn btn-primary !mt-6"
          :loading="loading"
        >{{$t('save')}}</button>
      </div> -->
    </form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/plugins/axios';
import Swal from 'sweetalert2';
import { useMeta } from '@/composables/use-meta';

import { vMaska } from 'maska';
import { storeToRefs } from 'pinia';
import { useOptionsStore } from '@/stores/OptionsStore';
import flatPickr from 'vue-flatpickr-component';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import 'flatpickr/dist/flatpickr.css';

const optionsStore = useOptionsStore();
const { 
  subject_type, 
  gender,
  type_indification_documents,
  region_list,
  district
} = storeToRefs(optionsStore);

useMeta({ title: '' });
const $router = useRouter();
const $route = useRoute();
const loading = ref<boolean>(false)
const form4 = ref({
  account_number: '',
  subject_type: '3',
  client_code: '',
  name: '',
  accountant: '',
  director: '',
  phone: '',
  address: '',
});
const isSubmitForm4 = ref(false);

const submitForm4 = () => {
  clientSave()
  //form validated success
  // showMessage('Form submitted successfully.');
};

async function clientSave () {
    loading.value = true;
    try {
      const response = await api.post('client/create',{
        account_number: form4.value.account_number,
        subject_type: form4.value.subject_type,
        client_code: form4.value.client_code,
        name: form4.value.name,
        accountant: form4.value.accountant,
        director: form4.value.director,
        phone: form4.value.phone,
        address: form4.value.address,
      });
      if (response.status === 200) {
        showMessage('Form submitted successfully.');
        $router.push('/client');
      }
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


async function getClient () {
   loading.value = true;
   try {
      const response = await api.get('company/get/' + $route.params.id);
      form4.value = response.data
      form4.value = {
         account_number: response.data.account_number,
         subject_type: response.data.subject,
         client_code: response.data.client_code,
         name: response.data.name,
         accountant: response.data.accountant,
         director: response.data.director,
         phone: response.data.phone,
         address: response.data.address,
      }
   } catch (err: any) {
   } finally {
      loading.value = false;
   }
}

onMounted(() => {
  optionsStore.getSubjectType();
  optionsStore.getGender();
  optionsStore.getTypeIndificationDocuments();
  optionsStore.getRegion();
  getClient()
});
</script>