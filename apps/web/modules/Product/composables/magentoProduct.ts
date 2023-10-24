import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState } from '~/modules/Product/composables/types';
import { productDetailsCustomQuery } from '~/modules/Product/customQueries/productDetailsCustomQuery';
import { addProductsToCartCustomQuery } from '~/modules/Product/customQueries/addProductsToCartCustomQuery';
import { useSdk } from '~/sdk';
import type { ProductDetailsQuery } from '@vue-storefront/magento-types';
import { useCartStore } from '~/modules/Product/stores/cartStore';

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

  const cartStore = useCartStore();
  const { send: sendNotification } = useUiNotification();
  const { createEmptyCard } = useCart();

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

  const addToCart = async (sku: string, qty: number) => {
    if (!cartStore.getCartId) {
      await createEmptyCard();
    }
    const cartId = cartStore.getCartId;
    try {
      const { data } = await useAsyncData(() =>
        useSdk().magento.addProductsToCart(
          {
            cartId,
            cartItems: [
              {
                sku: sku,
                quantity: qty,
              },
            ],
          },
          { customQuery: addProductsToCartCustomQuery },
        ),
      );
      if (data?.value?.data?.addProductsToCart?.user_errors?.length === 0) {
        sendNotification({
          icon: 'Check',
          message: 'Your Basket has been updated',
          title: 'Cart Updated',
          type: 'positive',
        });
      } else {
        sendNotification({
          icon: 'Error',
          message: data?.value?.data?.addProductsToCart?.user_errors[0]?.message || 'Error while adding product',
          title: 'Add to cart error',
          type: 'negative',
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
    addToCart,
  };
};
