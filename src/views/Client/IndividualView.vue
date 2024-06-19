<template>
  <div class="panel px-5 py-5 border-[#e0e6ed] dark:border-[#1b2e4b]">
    <div class="flex justify-between">
      <h3 class="text-xl pb-4">
        Физическое лицо
      </h3>
    </div>
    <form class="space-y-5" @submit.prevent="submitForm4()">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- account_number -->
        <div>
          <label class="ml-2" for="pinfl">{{ $t('account_number') }}</label>
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
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.subject_type' }}</p>
          </template>
        </div>

        <!-- client_code -->
        <div>
          <label class="ml-2" for="pinfl">{{ $t('client_code') }}</label>
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

        <!-- pinfl -->
        <div >
          <label class="ml-2" for="pinfl">{{ $t('pinfl') }}</label>
          <input 
            v-maska 
            data-maska="#### #### #### ##" 
            id="pinfl" 
            type="text" 
            placeholder="#### #### #### ##" 
            class="form-input" 
            v-model="form4.pinfl" 
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.pinfl' }}</p>
          </template>
        </div>

        <!-- surname -->
        <div >
          <label class="ml-2" for="surname">{{ $t('surname') }}</label>
          <input 
            id="surname" 
            type="text" 
            :placeholder="$t('surname')" 
            class="form-input" 
            v-model="form4.surname" 
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.surname' }}</p>
          </template>
        </div>

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

        
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- patryonimc -->
        <div>
          <label class="ml-2" for="patryonic">{{ $t('patryonic') }}</label>
          <input
            id="patryonic"
            type="text"
            :placeholder="$t('patryonic')"
            class="form-input"
            v-model="form4.patryonic"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.patryonic' }}</p>
          </template>
        </div>

        <!-- sex -->
        <div>
          <label class="ml-2" for="sex">{{ $t('sex') }}</label>
          <multiselect
            v-if="gender"
            v-model="form4.sex"
            :options="gender"
            class="custom-multiselect"
            track-by="gender_code"
            label="title"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.sex' }}</p>
          </template>
        </div>

        <!-- birth_date -->
        <div>
          <label class="ml-2" for="birth_date">{{ $t('birth_date') }}</label>
          <input
              v-maska
              data-maska="####-##-##"
              id="birth_date"
              type="text"
              :placeholder="$t('passport_number')"
              class="form-input"
              v-model="form4.birth_date"
            />
          <!-- <flat-pickr 
            v-model="form4.birth_date" 
            class="form-input" 
            id="birth_date" 
            :placeholder="$t('birth_date')"
          ></flat-pickr> -->
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.birth_date' }}</p>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- document_type -->
        <div>
          <label class="ml-2" for="document_type">{{ $t('document_type') }}</label>
          <multiselect
            v-if="type_indification_documents"
            v-model="form4.document_type"
            :options="type_indification_documents"
            class="custom-multiselect"
            track-by="code_document"
            label="title_document"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.document_type' }}</p>
          </template>
        </div>

        <!-- passport_series -->
        <div>
          <label class="ml-2" for="passport_series">{{ $t('passport_series') }}</label>
          <input
            id="passport_series"
            type="text"
            :placeholder="$t('passport_series')"
            class="form-input"
            v-model="form4.passport_series"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.passport_series' }}</p>
          </template>
        </div>

        <!-- passport_number -->

        <div>
          <label class="ml-2" for="passport_number">{{ $t('passport_number') }}</label>
          <input
            v-maska
            data-maska="### ## ##"
            id="passport_number"
            type="text"
           :placeholder="$t('passport_number')"
            class="form-input"
            v-model="form4.passport_number"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.passport_number' }}</p>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- passport_issue_date -->
        <div>
          <label class="ml-2" for="passport_issue_date">{{ $t('passport_issue_date') }}</label>
          <input
            v-maska
            data-maska="####-##-##"
            id="passport_number"
            type="text"
              :placeholder="$t('passport_issue_date')"
            class="form-input"
            v-model="form4.passport_issue_date"
          />
          <!-- <flat-pickr 
            v-model="form4.passport_issue_date" 
            class="form-input" 
            id="passport_issue_date" 
            :placeholder="$t('passport_issue_date')"
          ></flat-pickr> -->
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.passport_issue_date' }}</p>
          </template>
        </div>

        <!-- passport_given -->
        <div>
          <label class="ml-2" for="passport_given_place">{{ $t('passport_given') }}</label>
          <input
            id="passport_given"
            type="text"
            :placeholder="$t('passport_given')"
            class="form-input"
            v-model="form4.passport_given"
          />
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.passport_given' }}</p>
          </template>
        </div>

        <!-- region_code -->
        <div>
          <label class="ml-2" for="region_code">{{ $t('region_code') }} </label>
          <multiselect
            v-if="region_list"
            v-model="form4.region_code"
            :options="region_list"
            class="custom-multiselect"
            track-by="region_code"
            label="title"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.region_code' }}</p>
          </template>
        </div>

        <!-- district_code -->
        <div>
          <label class="ml-2" for="district_code">{{ $t('district_code') }}</label>
          <multiselect
            v-model="form4.district_code"
            :options="district"
            class="custom-multiselect"
            track-by="district_code"
            label="title"
            :multiple="false"
            :searchable="false"
            :placeholder="$t('select_option')"
            selected-label=""
            select-label=""
            deselect-label=""
          >
          </multiselect>
          <template >
            <p class="text-danger mt-1">{{ 'ERROR.district_code' }}</p>
          </template>
        </div>

      </div>

      <!-- <div class="flex justify-end">
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
  subject_type: {
    code: '',
    title: ''
  },
  client_code: '',
  pinfl: '',
  name: '',
  surname: '',
  patryonic: '',
  sex: {
    gender_code: '',
    title: ''
  },
  birth_date: '',
  document_type: {
    code_document: '',
    title_document: ''
  },
  passport_series: '',
  passport_number: '',
  passport_issue_date: '',
  passport_given: '',
  region_code: {
    region_code: '',
    title: ''
  },
  district_code: {
    district_code: '',
    title: ''
  },
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
        subject_type: form4.value.subject_type?.code,
        client_code: form4.value.client_code,
        pinfl: form4.value.pinfl.replace(/\s/g, ""),
        name: form4.value.name,
        surname: form4.value.surname,
        patryonic: form4.value.patryonic,
        sex: form4.value.sex?.gender_code,
        birth_date: form4.value.birth_date,
        document_type: form4.value.document_type?.code_document,
        passport_series: form4.value.passport_series,
        passport_number: form4.value.passport_number.replace(/\s/g, ""),
        passport_issue_date: form4.value.passport_issue_date,
        passport_given: form4.value.passport_given,
        region_code: form4.value.region_code.region_code,
        district_code: form4.value.district_code.district_code,
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

watch(
  () => form4.value?.region_code,
  (newVal) => {
    if(newVal) {
      optionsStore.getDistrict(newVal.region_code)
    }
  }
);

async function getClient () {
   loading.value = true;
   try {
      const response = await api.get('client/get/' + $route.params.id);
      form4.value = response.data
      form4.value = {
         account_number: response.data.account_number,
         subject_type: response.data.subject,
         client_code: response.data.client_code,
         pinfl: response.data.pinfl,
         name: response.data.name,
         surname: response.data.surname,
         patryonic: response.data.patryonic,
         sex: response.data.gender,
         birth_date: response.data.birth_date,
         document_type: response.data.document,
         passport_series: response.data.passport_series,
         passport_number: response.data.passport_number,
         passport_issue_date: response.data.passport_issue_date,
         passport_given: response.data.passport_given,
         region_code: response.data.region,
         district_code: response.data.district,
         }
      console.log('response.data', response.data)
      optionsStore.getDistrict(response.data.region_code)
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