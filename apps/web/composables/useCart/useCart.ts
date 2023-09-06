import type { SfCart } from '@vue-storefront/unified-data-model';
import { toRefs } from '@vueuse/shared';
import type { UseCartReturn, UseCartState, FetchCard, FetchMagentoCard} from '~/composables/useCart/types';
import { useSdk } from '~/sdk';
import {addProductsToCartCustomQuery} from "~/composables/useCart/addProductsToCartCustomQuery";

/**
 * @description Composable for managing cart.
 * @returns {@link UseCartReturn}
 * @example
 * const { data, loading } = useCart();
 */
export const useCart: UseCartReturn = () => {
  const state = useState<UseCartState>('useCart', () => ({
    data: null,
    loading: false,
  }));

  /**
   * @description Function for fetching the cart.
   * @example
   * getCart();
   */
  const fetchCard: FetchCard = async () => {
    state.value.loading = true;
    try {
      const { data, error } = await useAsyncData<SfCart>(() => useSdk().commerce.getCart());
      useHandleError(error.value);
      state.value.data = data.value;
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };
  const fetchMagentoCard: FetchMagentoCard = async () => {
    state.value.loading = true;
    try {
      const { data, error } = await useAsyncData<SfCart>(() => useSdk().magento.addProductsToCart(
          {
            cartId: 'jaJT5CARj6Hh6QCDLPlMcyBr5KqvHxuJ',
            cartItems: [
              {
                sku: '450065',
                quantity: 1,
              }
            ]
          },
          { customQuery: addProductsToCartCustomQuery },
      ));
      useHandleError(error.value);
      state.value.data = data.value;
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    fetchCard,
    fetchMagentoCard,
    ...toRefs(state.value),
  };
};
