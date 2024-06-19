export interface goodsListInterface {
   id: number;
   name: string;
   percent: number;
   max_percent: number;
   items: {
      source: {
         code: string,
         title: string
      }
   } [];
}
export interface goodsAddInterface {
   name: string,
   accounts: {
      percent: number,
      max_percent: number,
      codes: {
         code: string,
         title: string
      } | null
   } []
}