import type { Ref } from 'vue';
import type { MethodOptions } from '@vsf-enterprise/sapcc-sdk';
import type { ProductGetProps } from '@vsf-enterprise/sapcc-types';
import type { Product } from '@vsf-enterprise/sapcc-types';

export interface UseProductState {
  data: Product | null;
  loading: boolean;
}

export type FetchProduct = (params: ProductGetProps, options?: MethodOptions) => Promise<Ref<Product | null>>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
}

export type UseProductReturn = (code: string) => UseProduct;
