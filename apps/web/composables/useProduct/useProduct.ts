import { toRefs } from '@vueuse/shared';
import { sdk } from '~/sdk';
import type { UseProductReturn, UseProductState, FetchProduct } from './types';

/**
 * @description Composable managing product data
 * @param {string} code Product code
 * @returns {@link UseProductReturn}
 * @example
 * const { data, loading, fetchProduct } = useProduct('product-code');
 */
export const useProduct: UseProductReturn = (code) => {
  const state = useState<UseProductState>(`useProduct-${code}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching product data
   * @example
   * fetchProduct({ id: code });
   * @param params
   * @param options
   */
  const fetchProduct: FetchProduct = async (params, options) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => sdk.sapcc.getProduct(params, options));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
  };
};
