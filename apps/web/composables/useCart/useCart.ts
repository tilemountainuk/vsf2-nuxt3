import type { SfCart } from '@vue-storefront/unified-data-model';
import { toRefs } from '@vueuse/shared';
import type { UseCartReturn, UseCartState, FetchCard, CreateEmptyCard } from '~/composables/useCart/types';
import { useSdk } from '~/sdk';

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
  const cartStore = useCartStore();

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

  const createEmptyCard: CreateEmptyCard = async () => {
    state.value.loading = true;
    try {
      const { data, error } = await useAsyncData(() => useSdk().magento.createEmptyCart());
      useHandleError(error.value);
      cartStore.setCartId(data?.value?.data?.createEmptyCart);
      return data?.value?.data?.createEmptyCart;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    fetchCard,
    ...toRefs(state.value),
    createEmptyCard,
  };
};
