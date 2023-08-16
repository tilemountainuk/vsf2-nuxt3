import { computed } from 'vue';
import {
  categorySearchCustomQuery,
  categoryMenuCustomQuery,
} from '~/composables/useProducts/customQueries/categorySearchCustomQuery';
import { UseProductsReturn, UseProductsState } from '~/composables/useProducts/types';
import { useSdk } from '~/sdk';

/**
 * @description Composable for managing products.
 * @returns {@link UseProducts}
 * @example
 * const { data, loading, fetchProducts } = useProducts();
 */
export const useProducts: UseProductsReturn = () => {
  const state = useState<UseProductsState>('products', () => ({
    data: null,
    loading: false,
    menuCategories: null,
  }));

  /**
   * @description Function for fetching products.
   * @example
   * getProducts();
   */
  const fetchProducts: any = async (slug: string) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() =>
      useSdk().magento.categorySearch(
        {
          filters: {
            url_key: {
              eq: slug,
            },
          },
        },
        { customQuery: categorySearchCustomQuery },
      ),
    );
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  const fetchAllCategories: any = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() =>
      useSdk().magento.categorySearch(
        {
          filters: {
            ids: {
              eq: '35',
            },
          },
        },
        { customQuery: categoryMenuCustomQuery },
      ),
    );
    useHandleError(error.value);
    state.value.menuCategories = data.value?.data?.categoryList[0];
    state.value.loading = false;
    return data;
  };

  return {
    fetchProducts,
    fetchAllCategories,
    ...toRefs(state.value),
    menuCategories: computed(() => state.value.menuCategories),
  };
};
