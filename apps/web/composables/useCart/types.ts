import type { Ref } from 'vue';
import type { SfCart, Maybe } from '@vue-storefront/unified-data-model';

export interface UseCartState {
  data: Maybe<SfCart>;
  loading: boolean;
}

export type FetchCard = () => Promise<Ref<Maybe<SfCart>>>;
export type CreateEmptyCard = () => Promise<Maybe<string> | undefined>;

export interface UseCart {
  data: Readonly<Ref<UseCartState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCard: FetchCard;
  createEmptyCard: CreateEmptyCard;
}

export type UseCartReturn = () => UseCart;
