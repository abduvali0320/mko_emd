export interface goodInterface {
    id: number;
    percent: number;
    period: number;
    title: string;
    type: {
        code_directory: string;
        code_type_credit: string;
        title_credit: string;
    };
    object_type: {
        code: '07';
        title: string;
        title_uz: string;
    };
    urgency_type: {
        urgency_type_code: '1';
        title: string;
        title_uz: string;
    };
    interval: {
        urgency_interval_code: '04';
        title: string;
        is_activity: string;
        title_uz: string;
    };
    repayment_type: number|null;
    type_lizing: number|null;
    max_amount: number|null;
    prefix: string;
    created_at: string
    updated_at: string;
    items: [
        {
            id: 1;
            credit_product_id: number|null;
            account_code: string;
            created_at: string;
            updated_at: string;
            source: {
                directory_code: string;
                purpose_balance: string;
                code: string;
                title: string;
                active_passiv: string;
                section_code: string;
                code_type: string;
                reverse_code: string;
                code_type_client: string;
                code_risk_group: string;
                open_date: string;
                close_date: string;
                is_activity: string;
                code_nibbd_register: string;
            };
        }
    ];
}
