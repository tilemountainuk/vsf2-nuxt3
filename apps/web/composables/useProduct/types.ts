import type { Ref } from 'vue';
import { ProductDetailsQuery } from '@vue-storefront/magento-types';
import type { Maybe } from '@vue-storefront/unified-data-model';

export interface UseProductState {
  data: Maybe<ProductDetailsQuery> | undefined | null;
  loading: boolean;
}

export type FetchProduct = (slug: string) => Promise<ProductDetailsQuery | undefined>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
}

export type UseProductReturn = (slug: string) => UseProduct;
