import { searchCustomQuery } from '~/composables/useSearch/customQueries/SearchCustomQuery';
import { useSdk } from '~/sdk';

export function useSearch() {
  const searchedProducts = async (inputModel: string) => {
    try {
      const { data } = await useSdk().magento.products(
        {
          search: inputModel,
        },
        { customQuery: searchCustomQuery },
      );
      return data; // Assuming you want to return the fetched data
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return {
    searchedProducts,
  };
}
// import {
//     UseSearchReturn,
//     UseSearchState,
//     FetchSearchedProducts
// } from '~/composables/useSearch/types';
// import { computed } from 'vue';
// import { sdk } from '~/sdk';
// import { searchCustomQuery } from "~/composables/useSearch/customQueries/searchCustomQuery";
//
// export const useSearch: UseSearchReturn = () => {
//
//     const searchedProducts: FetchSearchedProducts = async () => {
//         // const { data } = await useAsyncData(
//         //     // await sdk.magento.categorySearch(),
//         //     // console.log('datacategory', data)
//         // );
//     };
//     /**
//      * @description Function for fetching products.
//      * @example
//      * getProducts();
//      */
//
//     return {
//         searchedProducts
//     };
// };
