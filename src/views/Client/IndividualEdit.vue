<template>
    <div class="panel px-5 py-7 border-[#e0e6ed] dark:border-[#1b2e4b]">
        <div class="mb-4">
            <h3 class="text-xl">
                Персональные данные
            </h3>
        </div>
        <!-- <form class="space-y-5" @submit.prevent="submitForm()"> -->
        <div class="space-y-5" >
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <!-- client_code -->
                <div>
                    <label class="ml-2 text-xs" for="client_code  ">{{ $t('client_code') }}</label>
                    <input
                        id="client_code"
                        type="text"
                        :placeholder="$t('client_code')"
                        class="form-input"
                        v-model="mainData.client_code"
                    />
                </div>
                <!-- pinfl -->
                <div>
                    <label class="ml-2 text-xs" for="pinfl">{{ $t('pinfl') }}</label>
                    <input
                        id="pinfl"
                        type="text"
                        :placeholder="$t('pinfl')"
                        class="form-input"
                        v-model="mainData.pinfl"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <!-- ФИО клиента -->
                <div>
                    <label class="ml-2 text-xs" for="surname  ">{{ $t('surname') }}</label>
                    <input
                        id="surname"
                        type="text"
                        :placeholder="$t('surname')"
                        class="form-input"
                        v-model="mainData.surname"
                    />
                </div>
                <!-- name-->
                <div>
                    <label class="ml-2 text-xs" for="name  ">{{ $t('name') }}</label>
                    <input
                        id="name"
                        type="text"
                        :placeholder="$t('name')"
                        class="form-input"
                        v-model="mainData.name"
                    />
                </div>
                <!-- patronymic -->
                <div >
                    <label class="ml-2 text-xs" for="patronymic  ">{{ $t('patryonic') }}</label>
                    <input
                        id="patronymic"
                        type="text"
                        class="form-input"
                        :placeholder="$t('patryonic')"
                        v-model="mainData.patronymic"
                    />
                    <template>
                        <p class="text-danger mt-1 ">{{ $t('fill_field') }}</p>
                    </template>
                </div>
                <!-- birth_date -->
                <div>
                    <label class="ml-2 text-xs" for="birth_date">{{ $t('birth_date') }}</label>
                    <input
                        v-maska
                        data-maska="####-##-##"
                        id="birth_date"
                        type="text"
                        :placeholder="$t('birth_date')"
                        class="form-input"
                        v-model="mainData.birth_date"
                    />
                </div>
            </div>
            <hr class="py-3">
            <!-- Документ -->
            <div class="flex justify-between">
                <div class="text-xl">
                    Документ
                </div>
                <button
                    type="button"
                    class="btn btn-primary "
                    @click="addDocuments"
                >{{$t('add')}}</button>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-6 gap-5 py-3"
                style="background-color: rgba(250, 251, 250, 1); margin-top: 0.7rem;"
            >
                <div
                    v-for="(item, index) in titleDocuments"
                    :key="index + 'titleDocuments'"
                >
                    {{ item }}
                </div>
            </div>
            <div
                v-for="(item, index) in documents"
                :key="index + 'documents'"
                class="grid grid-cols-1 md:grid-cols-6 gap-5"
            >
                <!-- document_type -->
                <div >
                    <select
                        id="document_type"
                        class="form-select"
                        v-model="item.type"
                        :placeholder="$t('select_option')"
                    >
                        <option :value="null" selected> Выберите </option>
                        <option
                            v-for="(el, i) in type_indification_documents"
                            :key="i"
                            :value="el.code_document"
                        >{{el.title_document}}</option>
                    </select>
                </div>
                <!-- passport_series -->
                <div >
                    <input
                        id="seria"
                        type="text"
                        placeholder="Серия"
                        class="form-input"
                        v-model="item.seria"
                    />
                </div>
                <!-- number -->
                <div >
                    <input
                        v-maska
                        data-maska="### ## ##"
                        id="passport_number"
                        type="text"
                        placeholder="Номер"
                        class="form-input"
                        v-model="item.number"
                    />
                </div>
                <!-- issue -->
                <div >
                    <input
                        v-maska
                        data-maska="####-##-##"
                        id="passport_number"
                        type="text"
                        placeholder="____-__-__"
                        class="form-input"
                        v-model="item.issue"
                    />
                </div>
                <!-- expired -->
                <div >
                    <input
                        v-maska
                        data-maska="####-##-##"
                        id="passport_number"
                        type="text"
                        placeholder="____-__-__"
                        class="form-input"
                        v-model="item.expired"
                    />
                </div>
                <!-- given -->
                <div class="flex items-center">
                    <input
                        id="passport_number"
                        type="text"
                        placeholder="Место выдачи"
                        class="form-input"
                        v-model="item.given"
                    />
                    <icon-x
                        @click="documents.splice(index, 1)"
                        v-if="index !== 0"
                        class="ml-3 w-5 h-5 cursor-pointer"
                    />
                </div>
            </div>
            <!-- Документ end -->
            <hr class="py-3">
            <!-- Адрес start -->
            <div class="flex justify-between">
                <div class="text-xl">
                    Адрес
                </div>
                <button
                    type="button"
                    class="btn btn-primary "
                    @click="addAddresses"
                >{{$t('add')}}</button>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-5 gap-5 py-3"
                style="background-color: rgba(250, 251, 250, 1); margin-top: 0.7rem;"
            >
                <div
                    v-for="(item, index) in titleAddresses"
                    :key="index + 'titleAddresses'"
                >
                    {{ item }}
                </div>
            </div>
            <div
                v-for="(item, index) in addresses"
                :key="index + 'addresses'"
                class="grid grid-cols-1 md:grid-cols-5 gap-5"
            >
                <!-- type -->
                <div >
                    <input
                        id="type"
                        type="text"
                        placeholder="Тип адреса"
                        class="form-input"
                        v-model="item.type"
                    />
                </div>
                <!-- region_list -->
                <div>
                    <select
                        id="region_list"
                        class="form-select"
                        v-model="item.region_code"
                        :placeholder="$t('select_option')"
                        @change="handleRegionChange($event)"
                    >
                        <option :value="null">{{$t('select_option')}}</option>
                        <option
                            v-for="(i, index) in region_list"
                            :key="index"
                            :value="i.region_code"
                        >{{i.title}}</option>
                    </select>
                </div>


                <!-- district_code -->
                <div>
                    <multiselect
                        v-model="item.district_code"
                        :options="district"
                        class="custom-multiselect"
                        :multiple="false"
                        label="title"
                        key="district_code"
                        :placeholder="$t('select_option')"
                    >
                    </multiselect>
                </div>


                <div v-if="false">
                    <select
                        id="district_code"
                        class="form-select"
                        v-model="item.district_code"
                        :placeholder="$t('select_option')"
                    >
                        <option :value="null">{{$t('select_option')}}</option>
                        <option
                            v-for="(i, index) in district"
                            :key="index"
                            :value="i.district_code"
                        >{{i.title}}</option>
                    </select>
                </div>
                <!-- additional -->
                <div class="flex items-center">
                    <input
                        id="additional"
                        type="text"
                        placeholder="Номер"
                        class="form-input"
                        v-model="item.additional"
                    />
                    <icon-x
                        @click="addresses.splice(index, 1)"
                        v-if="index !== 0"
                        class="ml-3 w-5 h-5 cursor-pointer"
                    />
                </div>
            </div>
            <!-- Адрес end -->
            <hr class="py-3">
            <!-- Место работы start -->
            <div class="flex justify-between">
                <div class="text-xl">
                    Место работы
                </div>
                <button
                    type="button"
                    class="btn btn-primary "
                    @click="addWorks"
                >{{$t('add')}}</button>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-5 gap-5 py-3"
                style="background-color: rgba(250, 251, 250, 1); margin-top: 0.7rem;"
            >
                <div
                    v-for="(item, index) in titleWorks"
                    :key="index + 'titleWorks'"
                >
                    {{ item }}
                </div>

            </div>
            <div
                v-for="(item, index) in works"
                :key="index + 'works'"
                class="grid grid-cols-1 md:grid-cols-5 gap-5"
            >
                <!-- company -->
                <div>
                    <select
                        id="region_list"
                        class="form-select"
                        v-model="item.juridical_id"
                        :placeholder="$t('select_option')"
                    >
                        <option :value="null">{{$t('select_option')}}</option>
                        <option
                            v-for="(i, index) in company"
                            :key="index"
                            :value="i.id"
                        >{{i.title}}</option>
                    </select>
                </div>
                <!-- position -->
                <div>
                    <select
                        id="region_list"
                        class="form-select"
                        v-model="item.position_id"
                        :placeholder="$t('select_option')"
                    >
                        <option :value="null">{{$t('select_option')}}</option>
                        <option
                            v-for="(i, index) in position"
                            :key="index"
                            :value="i.id"
                        >{{i.title}}</option>
                    </select>
                </div>
                <!-- start  -->
                <div >
                    <input
                        v-maska
                        data-maska="####-##-##"
                        id="start"
                        type="text"
                        placeholder="____-__-__"
                        class="form-input"
                        v-model="item.start"
                    />
                </div>
                <!-- end  -->
                <div class="flex items-center">
                    <input
                        v-maska
                        data-maska="####-##-##"
                        id="start"
                        type="text"
                        placeholder="____-__-__"
                        class="form-input"
                        v-model="item.end"
                    />
                    <icon-x
                        @click="works.splice(index, 1)"
                        v-if="index !== 0"
                        class="ml-3 w-5 h-5 cursor-pointer"
                    />
                </div>
            </div>
            <!-- Место работы end -->
            <hr class="py-3">
            <!-- Номер телефона start -->
            <div class="flex justify-between">
                <div class="text-xl">
                    Номер телефона
                </div>
                <button
                    type="button"
                    class="btn btn-primary "
                    @click="addPhones"
                >{{$t('add')}}</button>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-5 gap-5 py-3"
                style="background-color: rgba(250, 251, 250, 1); margin-top: 0.7rem;"
            >
                <div
                    v-for="(item, index) in titlePhones"
                    :key="index + 'titlePhones'"
                >
                    {{ item }}
                </div>
            </div>
            <div
                v-for="(item, index) in phones"
                :key="index + 'phones'"
                class="grid grid-cols-1 md:grid-cols-5 gap-5"
            >
                <!-- type  -->
                <div >
                    <input
                        id="type"
                        type="text"
                        placeholder="Тип номера"
                        class="form-input"
                        v-model="item.type"
                    />
                </div>
                <!-- phone  -->
                <div class="flex items-center">
                    <input
                        v-maska
                        data-maska="### ## ### ## ##"
                        id="phone"
                        type="text"
                        placeholder="___ (__) ___-__-__"
                        class="form-input"
                        v-model="item.phone"
                    />
                </div>
                <!-- owner  -->
                <div class="flex items-center">
                    <input
                        id="owner"
                        type="text"
                        placeholder="Владелец номера"
                        class="form-input"
                        v-model="item.owner"
                    />
                    <icon-x
                        @click="phones.splice(index, 1)"
                        v-if="index !== 0"
                        class="ml-3 w-5 h-5 cursor-pointer"
                    />
                </div>
            </div>
            <!-- Номер телефонаend -->

            <div class="flex justify-end">
                <button
                    class="btn btn-primary !mt-6"
                    @click="saveClient()"
                > {{ $t('save') }} </button>
            </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { api } from '@/plugins/axios';
    import Swal from 'sweetalert2';
    import { useMeta } from '@/composables/use-meta';
    import { vMaska } from 'maska';
    import { storeToRefs } from 'pinia';
    import { useOptionsStore } from '@/stores/OptionsStore';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import 'flatpickr/dist/flatpickr.css';
    import IconX from '@/components/icon/icon-x.vue';
    const optionsStore = useOptionsStore();
    const  $route  = useRoute();
    const {
        subject_type,
        gender,
        type_indification_documents,
        region_list,
        district,
        company,
        position
    } = storeToRefs(optionsStore);

    const mainData = ref({
        client_code: '',
        pinfl: '',
        surname: '',
        name: '',
        patronymic: '',
        birth_date: '',
    });

    const documents = ref([
        {
            type: null,
            seria: '',
            number: '',
            issue: '',
            expired: '',
            given: '',
        }
    ])
    // documents
    const titleDocuments = ref(['Тип документа', 'Тип документа', 'Номер документа', 'Дата выдачи', 'Дата окончания', 'Выдан']);
    const addDocuments = () => {
        documents.value.push({
            type: null,
            seria: '',
            number: '',
            issue: '',
            expired: '',
            given: '',
        })
    }
    // addresses
    const titleAddresses = ref(['Тип адреса', 'Регион', 'Район', 'Примечание',]);
    const addresses = ref<
        {
            region_code: number | null,
            district_code: string|null,
            additional: string,
            type: string,
        }[]
    >([
        {
            region_code: null,
            district_code: null,
            additional: '',
            type: '',
        }
    ])
    const handleRegionChange = (e: any) => {
        optionsStore.getDistrict(e.target.value);
    }
    const addAddresses = () => {
        addresses.value.push({
            region_code: null,
            district_code: null,
            additional: '',
            type: '',
        })
    }

    //  works
    const titleWorks = ref(['Место работы', 'Должность', 'Дата приема', 'Дата окончания',]);
    const works = ref([
        {
            juridical_id: null,
            position_id: null,
            start: '',
            end: '',
        }
    ])
    const addWorks = () => {
        works.value.push({
            juridical_id: null,
            position_id: null,
            start: '',
            end: '',
        })
    }

    // phones
    const titlePhones = ref(['Тип номера', 'Номер', 'Номер принадлежит']);
    const phones = ref([
        {
            phone: '',
            type: '',
            owner: '',
        }
    ])

    const addPhones = () => {
        phones.value.push({
            phone: '',
            type: '',
            owner: '',
        })
    }

    async function saveClient () {
        try {
            const response = await api.put(`client/update/${$route.params.id}`, {
                client_code: mainData.value.client_code,
                pinfl: mainData.value.pinfl.replace(/\s+/g, ""),
                surname: mainData.value.surname,
                name: mainData.value.name,
                patronymic: mainData.value.patronymic,
                birth_date: mainData.value.birth_date||null,
                documents: documents.value.map((item) => {
                    return {
                        type: item.type,
                        seria: item.seria,
                        number: item.number.replace(/\s+/g, ""),
                        issue:item.issue,
                        expired:item.expired,
                        given: item.given,
                    }
                }),
                addresses: addresses.value.map((item) => {
                    return {
                        region_code: item.region_code,
                        district_code: item.district_code,
                        additional: item.additional,
                        type: item.type,
                    }
                }),
                works: works.value.map((item) => {
                    return {
                        juridical_id: item.juridical_id,
                        position_id: item.position_id,
                        start:item.start,
                        end: item.end,
                    }
                }),
                phones: phones.value.map((item) => {
                    return {
                        phone: item.phone.replace(/\s+/g, ""),
                        type: item.type,
                        owner: item.owner,
                    }
                })
            });
            if (response.status === 200) {
                showMessage('Form submitted successfully.');
                $router.push('/client/individual');
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    const formatDate = (date: string) => {
        const sanlar = date.split("/");
        return sanlar[2] + "-" + sanlar[1] + "-" + sanlar[0];
    }



    useMeta({ title: 'Добавить клиента' });
    const $router = useRouter();
    const loading = ref<boolean>(false)

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
    const getClient = async () => {
        loading.value = true;
        try {
            const response = await api.get(`client/get/${$route.params.id}`);
            if (response.status === 200) {
                mainData.value = response.data;
                documents.value = response.data.documents.map((item: any) => {
                    return {
                        type: item.type.toString(),
                        seria: item.seria,
                        number: item.number,
                        issue: item.issue,
                        expired: item.expired,
                        given: item.given,
                    };
                });

                // Fetch district data for each address
                for (let address of response.data.addresses) {
                    await optionsStore.getDistrict(address.region_code);
                }

                addresses.value = response.data.addresses.map((item: any) => {
                    return {
                        region_code: item.region_code,
                        district_code: district.value.find((d: any) => d.district_code === item.district_code),
                        additional: item.additional,
                        type: item.type,
                    };
                });


                works.value = response.data.work_places.map((item: any) => {
                    return {
                        juridical_id: item.client_jur_id,
                        position_id: item.position_id,
                        start: item.start,
                        end: item.end,
                    };
                });

                phones.value = response.data.phones.map((item: any) => {
                    return {
                        phone: item.phone.phone,
                        type: item.type,
                        owner: item.owner,
                    };
                });
            }
        } catch (err: any) {
        } finally {
            loading.value = false;
        }
    }


    onMounted(() => {
        optionsStore.getPosition();
        optionsStore.getCompany();
        optionsStore.getSubjectType();
        optionsStore.getGender();
        optionsStore.getTypeIndificationDocuments();
        optionsStore.getRegion();
        getClient()

    });

</script>
