import type { Ref } from 'vue';
import type { SfProduct, Maybe } from '@vue-storefront/unified-data-model';
import type { ProductDetailsQuery } from '@vue-storefront/magento-types';

export interface UseProductState {
  data: Maybe<SfProduct>;
  loading: boolean;
}

export type FetchProduct = (slug: string) => Promise<Ref<ProductDetailsQuery | null>>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: ProductDetailsQuery;
}

export type UseProductReturn = (slug: string) => UseProduct;
