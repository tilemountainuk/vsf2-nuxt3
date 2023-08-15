import { CartResponse, CartQuery } from '@vue-storefront/magento-sdk/lib/methods';
import { toRefs } from '@vueuse/shared';
import { addProductsToCartCustomQuery, cartCustomQuery } from '~/composables/useCart/customQueries/CartCustomQuery';
import type {
  UseCartReturn,
  CreateEmptyCart,
  UseCartState,
  FetchCard,
  ProductAddToCart,
} from '~/composables/useCart/types';
import useUiNotification from '~/composables/useUiNotification/useUiNotification';
import { useSdk } from '~/sdk';

const { send: sendNotification } = useUiNotification();

// Your component logic
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
    cartId: 'Uf7ZHqFozj8sfzwySLnIYO7ihNuSkYXX',
    creatingEmptyCartLoading: false,
  }));

  /**
   * @description Function for fetching the cart.
   * @example
   * getCart();
   */
  const fetchCard: FetchCard = async () => {
    state.value.loading = true;
    try {
      const { data, error } = await useAsyncData<CartResponse<CartQuery>>(() =>
        useSdk().magento.cart({ cartId: state.value.cartId }, { customQuery: cartCustomQuery }),
      );
      useHandleError(error.value);
      state.value.data = data.value?.data.cart;
      return data.value;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  const createEmptyCart: CreateEmptyCart = async () => {
    state.value.creatingEmptyCartLoading = true;
    try {
      const cart = await useSdk().magento.createEmptyCart();
      const mappedCartId: string = cart.data?.createEmptyCart as string;
      state.value.cartId = mappedCartId;
      return cart.data?.createEmptyCart;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.creatingEmptyCartLoading = false;
    }
  };

  const productAddToCart: ProductAddToCart = async (sku, quantity) => {
    try {
      if (!state.value.cartId) {
        await createEmptyCart();
      }
      const addProductsToCartResult = await useAsyncData(() =>
        useSdk().magento.addProductsToCart(
          {
            cartId: state.value.cartId ?? '',
            cartItems: [
              {
                sku: sku,
                quantity: quantity,
              },
            ],
          },
          { customQuery: addProductsToCartCustomQuery },
        ),
      );
      if (
        addProductsToCartResult &&
        addProductsToCartResult.data &&
        addProductsToCartResult.data.value &&
        addProductsToCartResult.data.value.data &&
        addProductsToCartResult.data.value.data.addProductsToCart &&
        addProductsToCartResult.data.value.data.addProductsToCart.user_errors &&
        addProductsToCartResult.data.value.data.addProductsToCart.user_errors.length === 0
      ) {
        sendNotification({
          icon: 'Check',
          message: 'Your Basket has been updated',
          title: 'Cart Updated',
          type: 'positive',
        });
      } else {
        sendNotification({
          icon: 'Error',
          message: 'Error while adding into the cart',
          title: 'Add to cart error',
          type: 'negative',
        });
      }
      return addProductsToCartResult.data.value?.data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return {
    fetchCard,
    productAddToCart,
    ...toRefs(state.value),
  };
};
