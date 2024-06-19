import { maxLength, minLength, required } from "@vuelidate/validators";

const applicationAdd = {
   form: {
      product_id:{
         id:{ required }
      } ,
      client_id: {id:{ required }},
      summa: { required },
      value: { required },
   },
};

export {
   applicationAdd
}