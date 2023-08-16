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
