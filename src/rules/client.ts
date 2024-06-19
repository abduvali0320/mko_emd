import { maxLength, minLength, required } from "@vuelidate/validators";

const clientIndividualAdd = {
   individualAdd: {
     account_number: { 
       required,
       minLengthValue: minLength(10),
       maxLengthValue: maxLength(10),
     },
     subject_type: { required },
     client_code: { 
       required,
       minLengthValue: minLength(8),
       maxLengthValue: maxLength(8),
     },
     pinfl: {
       required,
       minLengthValue: minLength(17),
       maxLengthValue: maxLength(17),
     },
     name: { required },
     surname: { required },
     patryonic: { required },
     sex: { required },
     birth_date: {
      required,
      minLengthValue: minLength(10),
      maxLengthValue: maxLength(10),
    },
     document_type: { required },
     passport_series: {
       required,
       minLengthValue: minLength(2),
       maxLengthValue: maxLength(2),
     },
     passport_number: {
       required,
       minLengthValue: minLength(9),
       maxLengthValue: maxLength(9),
     },
     passport_issue_date: {
      required,
      minLengthValue: minLength(10),
      maxLengthValue: maxLength(10),
    },
     passport_given: { required },
     region_code: { required },
     district_code: { required },
   },
};

const clientEntityAdd = {
   entityAdd: {
      account_number: { 
         required,
         minLengthValue: minLength(10),
         maxLengthValue: maxLength(10),
      },
      subject_type: { required },
      client_code: { 
         required,
         minLengthValue: minLength(8),
         maxLengthValue: maxLength(8),
      },
      name: { required },
      accountant: { required },
      director: { required },
      phone: { required },
      address: { required },
   },
};

export {
   clientIndividualAdd,
   clientEntityAdd
}