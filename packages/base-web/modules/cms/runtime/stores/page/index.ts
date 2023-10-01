import { defineStore, StoreDefinition } from 'pinia';
import { CmsPage, CmsPageState } from '../../types/index'

const key = 'cmsPageStore' as const;
export const useCmsPageStore = defineStore(key, {
  state: (): CmsPageState => ({
    loading: false,
    items: {}
  }),
  getters: {
    getCmsPage: (state: CmsPageState) => (identifier: string) => {
      return state.items[identifier];
    }
  },
  actions: {
    setLoading (newLoadingState: boolean) {
      this.loading = newLoadingState;
    },
    setItem (cmsPage: CmsPage) {
      this.items[cmsPage.identifier!] = cmsPage;
    }
  }
});
