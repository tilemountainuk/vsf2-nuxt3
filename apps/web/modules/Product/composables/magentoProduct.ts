import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState, FetchProduct } from '~/modules/Product/composables/types';
import { productDetailsCustomQuery } from '~/modules/Product/composables/customQueries/productDetailsCustomQuery';
import { useSdk } from '~/sdk';
import type { ProductDetailsQuery } from '@vue-storefront/magento-types';

/**
 * @description Composable managing product data
 * @param {string} slug Product slug
 * @returns {@link UseProductReturn}
 * @example
 * const { data, loading, fetchProduct } = useProduct('product-slug');
 */
export const magentoProduct: UseProductReturn = (slug) => {
  const state = useState<UseProductState>(`useProduct-${slug}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching product data
   * @example
   * fetchProduct('product-slug');
   */
  const fetchProduct: ProductDetailsQuery = async (slug: string) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() =>
      useSdk().magento.productDetails(
        { filter: { url_key: { eq: slug } } },
        { customQuery: productDetailsCustomQuery },
      ),
    );
    console.log('Data is :', data?.value?.data);
    useHandleError(error.value);
    state.value.loading = false;
    return data?.value?.data?.products;
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
  };
};
