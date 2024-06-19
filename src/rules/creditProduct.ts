import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';

const creditProductAdd = {
    form: {
        title: { required },
        period: { required },
        percent: { required, minValueValue: minValue(1), maxValueValue: maxValue(100) },
        prefix: { required, minLengthValue: minLength(2), maxLengthValue: maxLength(2) },
        type: { code_type_credit: { required } },
        object_type: { code: { required } },
        urgency_type: { required },
        interval: { required },
        accounts: [
            {
                codes: {
                    code: { required },
                },
            },
        ],
    },
};

export { creditProductAdd };
