import { goodInterface } from '@/@types/product.model';

export interface aplicationInterface {
    id: number | null;
    client_id: number | null;
    product_id: number | null;
    borrower_type: string;
    class_mko: string;
    contract_date: string;
    number: number | null;
    summa: number | null;
    summa_lizing: number | null;
    exploration: string;
    revision: string;
    delay_date: string;
    repayment_revision_date: string;
    full_repayment_date: number | null;
    close_date: string;
    created_at: string;
    updated_at: string;
    product: goodInterface;
    client: {
        id: number | null;
        client_code: string;
        pinfl: string;
        surname: string;
        name: string;
        patronymic: string;
        gender: number | null;
        birth_date: string;
        created_at: string;
        updated_at: string;
    };
    contract_account: [
        {
            contract_id: number | null;
            account_id: number | null;
            account_type: string;
            account: {
                id: number | null;
                account: string;
            };
            source: {
                code: string;
                title: string;
            };
        }
    ]
}

