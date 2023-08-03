import { Ref } from 'vue';
import type { GetProducts } from '@vue-storefront/storefront-boilerplate-sdk';
import type { Maybe } from '@vue-storefront/unified-data-model';

export interface UseProductsState {
  data: GetProducts | null;
  loading: boolean;
  productsTM: any;
}
type ProductItem = {
  sku: string;
};

type CategoryProducts = {
  products: {
    items: ProductItem[];
  };
};

type GetMagentoProducts = {
  categoryList: CategoryProducts[];
};

export type GetMagentoProductsData = {
  data: GetMagentoProducts;
};

export type FetchProducts = () => Promise<Ref<Maybe<GetProducts>>>;
export type FetchCategoryProducts = () => Promise<GetMagentoProductsData>;
export interface UseProducts {
  data: Readonly<Ref<UseProductsState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProducts: FetchProducts;
  categoryProducts: FetchCategoryProducts;
  productsTM: any;
}

export type UseProductsReturn = () => UseProducts;
