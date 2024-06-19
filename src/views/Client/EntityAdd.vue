<template>
  <div class="panel px-5 py-7 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="mb-4">
         <h3 class="text-xl">
            Добавить клиента
         </h3>
      </div>
      <form class="space-y-5" @submit.prevent="submitCompany()">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
         <!-- account_number -->
         <div :class="{ 'has-error': $v4.entityAdd.account_number.$error }">
            <label class="ml-2" for="account_number">{{ $t('account_number') }}</label>
            <input 
               id="account_number" 
               type="text" 
               :placeholder="$t('account_number')" 
               class="form-input" 
               v-model="entityAdd.account_number" 
               v-maska 
               data-maska="##########"
            />
            <template v-if="isSubmitForm && $v4.entityAdd.account_number.$error">
               <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>

         <!-- client_code -->
         <div :class="{ 'has-error': $v4.entityAdd.client_code.$error }">
            <label class="ml-2" for="client_code">{{ $t('client_code') }}</label>
            <input 
               id="client_code" 
               type="text" 
               :placeholder="$t('client_code')" 
               class="form-input" 
               v-model="entityAdd.client_code" 
               v-maska 
               data-maska="########"
            />
            <template v-if="isSubmitForm && $v4.entityAdd.client_code.$error">
               <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>

         <!-- name -->
         <div :class="{ 'has-error': $v4.entityAdd.name.$error }">
            <label class="ml-2" for="name">{{ $t('name') }}</label>
            <input 
               id="name" 
               type="text" 
               :placeholder="$t('name')" 
               class="form-input" 
               v-model="entityAdd.name" 
            />
            <template v-if="isSubmitForm && $v4.entityAdd.name.$error">
            <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
         <!-- accountant -->
         <div :class="{ 'has-error': $v4.entityAdd.accountant.$error }">
            <label class="ml-2" for="accountant">{{ $t('accountant') }}</label>
            <input 
               id="accountant" 
               type="text" 
               :placeholder="$t('accountant')" 
               class="form-input" 
               v-model="entityAdd.accountant" 
            />
            <template v-if="isSubmitForm && $v4.entityAdd.accountant.$error">
               <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>

         <!-- director -->
         <div :class="{ 'has-error': $v4.entityAdd.director.$error }">
            <label class="ml-2" for="director">{{ $t('director') }}</label>
            <input 
               id="director" 
               type="text" 
               :placeholder="$t('director')" 
               class="form-input" 
               v-model="entityAdd.director" 
            />
            <template v-if="isSubmitForm && $v4.entityAdd.director.$error">
             <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>

         <!-- patryonimc -->
         <div :class="{ 'has-error': $v4.entityAdd.phone.$error }">
            <label class="ml-2" for="phone">{{ $t('phone') }}</label>
            <input
               id="phone"
               type="text"
               :placeholder="$t('phone')"
               class="form-input"
               v-model="entityAdd.phone"
            />
            <template v-if="isSubmitForm && $v4.entityAdd.phone.$error">
             <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>
         
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
         <!-- address -->
         <div :class="{ 'has-error': $v4.entityAdd.address.$error }">
            <label class="ml-2" for="address">{{ $t('address') }}</label>
            <input
               id="address"
               type="text"
               :placeholder="$t('address')"
               class="form-input"
               v-model="entityAdd.address"
            />
            <template v-if="isSubmitForm && $v4.entityAdd.address.$error">
               <p class="text-danger mt-1">{{ $t('fill_field') }}</p>
            </template>
         </div>
       
      </div>
      <div class="flex justify-end">
         <button 
            type="submit" 
            class="btn btn-primary !mt-6"
            :loading="loading"
         >{{$t('save')}}</button>
      </div>
   </form>
   </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
import 'flatpickr/dist/flatpickr.css';

useMeta({ title: 'Добавить клиента' });
const typeBtn = ref<string>('1')
const $router = useRouter();
const loading = ref<boolean>(false)
import { clientEntityAdd } from '@/rules/client'
const entityAdd = ref({
  account_number: '',
  subject_type: '3',
  client_code: '',
  name: '',
  accountant: '',
  director: '',
  phone: '',
  address: '',
});
const isSubmitForm = ref(false);

const $v4 = useVuelidate(clientEntityAdd, { entityAdd });
const submitCompany = () => {
  isSubmitForm.value = true;
  $v4.value.entityAdd.$touch();
  if ($v4.value.entityAdd.$invalid) {
    return false;
  }
  clientSave()
};

async function clientSave () {
    loading.value = true;
    try {
      const response = await api.post('company/create',{
        account_number: entityAdd.value.account_number,
        subject_type: entityAdd.value.subject_type,
        client_code: entityAdd.value.client_code,
        name: entityAdd.value.name,
        accountant: entityAdd.value.accountant,
        director: entityAdd.value.director,
        phone: entityAdd.value.phone,
        address: entityAdd.value.address,
      });
      if (response.status === 200) {
        showMessage('Form submitted successfully.');
        $router.push('/client/entity');
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

</script>