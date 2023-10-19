import type { Ref } from 'vue';
import type { SfProduct, Maybe } from '@vue-storefront/unified-data-model';
import type { ProductDetailsQuery } from '@vue-storefront/magento-types';

export interface UseProductState {
  data: ProductDetailsQuery | undefined | null;
  loading: boolean;
}

export type FetchMagentoProduct = (slug: string) => Promise<ProductDetailsQuery | undefined>;
export type FetchProduct = (slug: string) => Promise<Ref<Maybe<SfProduct>>>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchMagentoProduct;
  addToCart: () => {};
}

export type UseProductReturn = (slug: string) => UseProduct;
