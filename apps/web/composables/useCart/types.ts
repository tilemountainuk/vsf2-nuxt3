import type { Ref } from 'vue';
import { CartQuery, CartResponse } from '@vue-storefront/magento-sdk/lib/methods';
import type { AddProductsToCartOutput, Cart } from '@vue-storefront/magento-types';
import type { Maybe } from '@vue-storefront/unified-data-model';

export interface UseCartState {
  // data: Maybe<Cart> | undefined;
  data: any;
  loading: boolean;
  cartId: string;
  creatingEmptyCartLoading: boolean;
}

export type FetchCard = () => Promise<CartResponse<CartQuery> | null>;

export type CreateEmptyCart = () => Promise<Maybe<string> | undefined>;
export type ProductAddToCart = (
  sku: string,
  quantity: number,
) => Promise<Maybe<{ addProductsToCart: AddProductsToCartOutput | undefined | null } | undefined> | undefined>;

export interface UseCart {
  // data: Readonly<Ref<UseCartState['data']>>;
  data: any;
  loading: Readonly<Ref<boolean>>;
  fetchCard: FetchCard;
  productAddToCart: ProductAddToCart;
  cartId: any;
}

export type UseCartReturn = () => UseCart;
