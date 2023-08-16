import { Ref } from 'vue';
import type { GetProducts } from '@vue-storefront/storefront-boilerplate-sdk';
import type { Maybe } from '@vue-storefront/unified-data-model';

export interface UseProductsState {
  // data: GetProducts | null;
  data: any;
  loading: boolean;
  menuCategories: any;
}

export type FetchProducts = (slug: string) => Promise<Ref<Maybe<GetProducts>>>;
export interface UseProducts {
  data: Readonly<Ref<UseProductsState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProducts: FetchProducts;
  fetchAllCategories: any;
  menuCategories: any;
}

export type UseProductsReturn = () => UseProducts;
