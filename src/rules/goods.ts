import { maxLength, minLength, required } from "@vuelidate/validators";

const goodsAdd = {
   data: {
      name: { required },
      percent: { 
         required,
         minLengthValue: minLength(0),
         maxLengthValue: maxLength(2),
      },
      max_percent: { 
         required,
         minLengthValue: minLength(0),
         maxLengthValue: maxLength(3),
      },
      codes: { required },
   },
};

export {
   goodsAdd
}