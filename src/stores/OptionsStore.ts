/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { api } from '../plugins/axios';
// import { authUserInterface } from '../@types/auth.models';
import { useHelper } from '@/composables/helpers/helper';
import router from '@/router';

const { Notify } = useHelper();

type RootState = {
    subject_type: any;                            // 006
    gender: any;                                  // 007
    type_indification_documents: any;             // 008
    regulations: any;                             // 009
    region_list: any;                             // 016
    currency: any;                                // 017
    country: any;                                 // 018
    banks: any;                                   // 19
    account_catalog: {
        code: string,
        title: string
    } [] | [];                         // 019
    client_type: any;                             // 021
    oked: any;                                    // 23
    types_payment_documents: any;                 // 026
    residence_type: any;                          // 027
    type_credit_code: any;                        // 031
    borrower_creditworthiness_classes: any;       // 032
    colleteral_type: any;                         // 033
    credit_type_code: any;                        // 034
    financial_organizations: any;                 // 041
    district: any;                                // 052
    urgency_interval: any;                        // 053
    ownership_type: any;                          // 057
    payment_porpuse_codes: any;                   // 060
    borrower_type_code: any;                      // 083
    company: any;                      // 083
    position: any;                      // 083
    sourceLoading: boolean;
    loading: boolean;
    total_pages: number;
};

export const useOptionsStore = defineStore({
    id: 'OptionsStore',
    state: () =>
        ({
            subject_type: null,
            gender: [],
            type_indification_documents: null,
            regulations: null,
            region_list: [],
            currency: null,
            country: null,
            banks: null,
            account_catalog: [],
            client_type: null,
            oked: null,
            types_payment_documents: null,
            residence_type: null,
            type_credit_code: null,
            borrower_creditworthiness_classes: null,
            colleteral_type: null,
            credit_type_code: [],
            financial_organizations: null,
            district: [],
            urgency_interval: [],
            ownership_type: null,
            payment_porpuse_codes: null,
            borrower_type_code: [],
            company: [],
            position: [],
            sourceLoading: false,
            loading: false,
            total_pages: 0
        } as RootState),
    actions: {
        async getSubjectType() {
            this.loading = true;
            try {
                const response = await api.get('source/subject_type');
                if (response.status === 200) {
                    this.subject_type = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getGender() {
            this.loading = true;
            try {
                const response = await api.get('source/gender');
                if (response.status === 200) {
                    this.gender = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getTypeIndificationDocuments() {
            this.loading = true;
            try {
                const response = await api.get('source/type_indification_documents');
                if (response.status === 200) {
                    this.type_indification_documents = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getRegulations() {
            this.loading = true;
            try {
                const response = await api.get('source/regulations');
                if (response.status === 200) {
                    this.regulations = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getRegion() {
            this.loading = true;
            try {
                const response = await api.get('source/region');
                if (response.status === 200) {
                    this.region_list = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getCurrency() {
            this.loading = true;
            try {
            const response = await api.get('source/currency');
            if (response.status === 200) {
                this.currency=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getCountry() {
            this.loading = true;
            try {
            const response = await api.get('source/country');
            if (response.status === 200) {
                this.country=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getBanks() {
            this.loading = true;
            try {
            const response = await api.get('source/banks');
            if (response.status === 200) {
                this.banks = response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getAccountCatalog(search: string |null) {
            this.sourceLoading = true;
            try {
            const response = await api.get('source/account_catalog', {
                params : {
                    per_page: 100,
                    search: search
                }
            });
            if (response.status === 200) {
                this.account_catalog=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.sourceLoading = false;
            }
        },

        async getClientType() {
            this.loading = true;
            try {
                const response = await api.get('source/client_type');
                if (response.status === 200) {
                    this.client_type = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getOked() {
            this.loading = true;
            try {
            const response = await api.get('source/oked');
            if (response.status === 200) {
                this.oked
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getTypesPaymentDocuments() {
            this.loading = true;
            try {
                const response = await api.get('source/types_payment_documents');
                if (response.status === 200) {
                    this.types_payment_documents = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getResidenceType() {
            this.loading = true;
            try {
                const response = await api.get('source/residence_type');
                if (response.status === 200) {
                    this.residence_type = response.data?.data;
                    console.log(response);
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getBorrowerCreditworthinessClasses() {
            this.loading = true;
            try {
            const response = await api.get('source/borrower_creditworthiness_classes');
            if (response.status === 200) {
                this.borrower_creditworthiness_classes = response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getTypeCredit() {
            this.loading = true;
            try {
            const response = await api.get('source/type_credit', {
                params : {
                    per_page: 40
                }
            });
            if (response.status === 200) {
                this.type_credit_code = response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getColleteralType() {
            this.loading = true;
            try {
            const response = await api.get('source/colleteral_type');
            if (response.status === 200) {
                this.colleteral_type=response.data?.data
                console.log(response)
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getCreditType() {
            this.loading = true;
            try {
            const response = await api.get('source/credit_type',{
                params : {
                    per_page: 100
                }
            });
            if (response.status === 200) {
                this.credit_type_code=response.data?.data
                for (let index = 2; index <= response.data.pagination.total_pages; index++) {
                  this.getCreditTypeSkil(index)
                }
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async  getCreditTypeSkil (page: number) {
            this.loading = true;
            try {
            const response = await api.get('source/credit_type',{
                params : {
                    per_page: 100,
                    page:page
                }
            });
            if (response.status === 200) {
                this.credit_type_code=[... this.credit_type_code, ...response.data?.data]
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getFinancialOrganizations() {
            this.loading = true;
            try {
            const response = await api.get('source/financial_organizations');
            if (response.status === 200) {
                this.financial_organizations=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getDistrict(code: any) {
            this.loading = true;
            try {
                const response = await api.get('source/district/' + code);
                if (response.status === 200) {
                    this.district = response.data?.data;
                }
            } catch (err: any) {
            } finally {
                this.loading = false;
            }
        },
        async getUrgencyInterval() {
            this.loading = true;
            try {
            const response = await api.get('source/urgency_interval');
            if (response.status === 200) {
                this.urgency_interval=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getOwnershipType() {
            this.loading = true;
            try {
            const response = await api.get('source/ownership_type');
            if (response.status === 200) {
                this.ownership_type=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getPaymentPorpuseCodes() {
            this.loading = true;
            try {
            const response = await api.get('source/payment_porpuse_codes');
            if (response.status === 200) {
                this.payment_porpuse_codes=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getBorrowerType() {
            this.loading = true;
            try {
            const response = await api.get('source/borrower_type',{
                params : {
                    per_page: 50
                }
            });
            if (response.status === 200) {
                this.borrower_type_code=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getCompany() {
            this.loading = true;
            try {
            const response = await api.get('company/list',{
                params : {
                    per_page: 50
                }
            });
            if (response.status === 200) {
                console.log('company', response)
                this.company=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        async getPosition() {
            this.loading = true;
            try {
            const response = await api.get('source/position/list',{
                params : {
                    per_page: 50
                }
            });
            if (response.status === 200) {
                console.log('position', response)
                this.position=response.data?.data
            }
            } catch (err: any) {

            } finally {
            this.loading = false;
            }
        },
        // async logout() {
        //     try {
        //         await api.get('/auth/logout');
        //     } catch (err) {
        //         console.log(err);
        //     }
        //     this.clearData();
        //     router.push('/auth/login').finally(() => {});
        // },
        // async getAuthUser() {
        //     if (localStorage.getItem('access_token')) {
        //         this.loading = true;
        //         try {
        //             const response = await api.get('/auth/me');
        //             if (response.status === 200) {
        //                 this.user = response.data;
        //             }
        //         } catch (err: any) {
        //             router.push('/auth/login');
        //             localStorage.removeItem('access_token');
        //         } finally {
        //             this.loading = false;
        //         }
        //     } else {
        //         this.clearData();
        //     }
        // },
        // clearData() {
        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('refresh_token');
        //     this.user = null;
        // },
    },
});
