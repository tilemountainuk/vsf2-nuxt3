import { categorySearchCustomQuery } from '~/composables/useProducts/customQueries/categorySearchCustomQuery';
import {
  FetchProducts,
  UseProductsReturn,
  UseProductsState,
  FetchCategoryProducts, GetMagentoProductsData,
} from '~/composables/useProducts/types';
import { computed } from 'vue';
import { sdk } from '~/sdk';

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
    productsTM: null,
  }));

  const routeData = useState<{ type: string; uid: string }>('routeData');
  if (!routeData.value) {
    useHandleError({
      status: 404,
      message: 'Page not found',
      statusMessage: 'Page not found',
    });
  }
  const categoryParameter = useState('selectedCategory', () => routeData.value.uid);
  watch(
      routeData,
      () => {
        categoryParameter.value = routeData.value.uid;
      },
      { immediate: true, deep: true },
  );
  const categoryParameter_ = useState('selectedCategory', () => routeData.value.uid);
  watch(
      routeData,
      () => {
        categoryParameter_.value = routeData.value.uid;
      },
      { immediate: true, deep: true },
  );
  const categoryProducts: FetchCategoryProducts = async () => {
    const { data } = await useAsyncData(
        `category${categoryParameter_.value}`,
        async () =>
            await sdk.magento.categorySearch(
                {
                  filters: {
                    category_uid: {
                      in: [categoryParameter_.value],
                    },
                  },
                },
                { customQuery: categorySearchCustomQuery },
            ),
        { watch: [categoryParameter_] },
    );

    const mappedData: GetMagentoProductsData = data.value as GetMagentoProductsData; // assuming that the data matches the structure
    state.value.productsTM = mappedData;
    return mappedData;
  };
  /**
   * @description Function for fetching products.
   * @example
   * getProducts();
   */
  const fetchProducts: FetchProducts = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(sdk.commerce.getProducts);
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProducts,
    categoryProducts,
    data: computed(() => state.value.data),
    loading: computed(() => state.value.loading),
    productsTM: computed(() => state.value.productsTM)
  };
};
