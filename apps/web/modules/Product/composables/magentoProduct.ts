import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState } from '~/modules/Product/composables/types';
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
   * @param {string} slug Product slug
   * @example
   * fetchProduct('product-slug');
   */

  const fetchProduct = async (slug: string): Promise<ProductDetailsQuery | undefined> => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() =>
      useSdk().magento.productDetails(
        { filter: { url_key: { eq: slug } } },
        { customQuery: productDetailsCustomQuery },
      ),
    );
    useHandleError(error.value);
    state.value.data = data.value?.data;
    state.value.loading = false;
    return data?.value?.data;
  };

  const addToCart = async () => {
    console.log('addToCart');
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
    addToCart
  };
};
