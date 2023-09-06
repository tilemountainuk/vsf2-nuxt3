import type { Ref } from 'vue';
import type { SfProduct, Maybe } from '@vue-storefront/unified-data-model';

export interface UseProductState {
  data: Maybe<SfProduct>;
  loading: boolean;
}

export type FetchProduct = (slug: string) => Promise<Ref<Maybe<SfProduct>>>;
export type FetchMagentoProduct = (slug: string) => any;
export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
  fetchMagentoProduct: FetchMagentoProduct;
}

export type UseProductReturn = (slug: string) => UseProduct;
