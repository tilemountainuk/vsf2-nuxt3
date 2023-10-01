import { useSdk } from 'sdk';
import { CmsPageResponse } from '@vue-storefront/magento-sdk';
import { storeToRefs } from 'pinia';

import { useCmsPageStore } from '@base/modules/cms/runtime/stores/page';


/**
 * @description Composable for managing content from CMS.
 * @returns {@link UseContent}
 * const { data, loading, getCmsBlocks } = useCmsBlock<ContentFieldsType>('identifiers');
 */

export const useCmsPage = () => {
  // const appConfig = useAppConfig() as { cms: AppConfigCMS };
  const cmsPageStore = useCmsPageStore();

  // Use storeToRefs to make the state properties reactive
  const { items, loading } = storeToRefs(cmsPageStore);

  const getCmsPage = async (identifier: string) => {
    const cmsPage = cmsPageStore.getCmsPage(identifier)
    if (cmsPage) return cmsPage;

    // const { data } = await useAsyncData<CmsPageResponse | CmsPageQuery>(() => useSdk().magento.cmsPage({
    //   identifier: identifier
    // }))
    //
    // return data;

    return fetchCmsPage(identifier)
  }
  const fetchCmsPage = async (identifier: string) => {
    cmsPageStore.setLoading(true);

    try {
      //If no identifier provided;
      if (!identifier) {
        return;
      }

      //Fetching data.
      const response = await useAsyncData<CmsPageResponse, unknown>(async () => {
        return useSdk().magento.cmsPage({
          identifier: identifier
        });
      });

      const {
        data,
        pending,
        refresh,
        execute,
        error,
        status
      } = response;

      const fetchedCmsPage = data.value?.data?.cmsPage;
      if (fetchedCmsPage) {
        cmsPageStore.setItem(fetchedCmsPage);
      }
      return data.value?.data?.cmsPage ?? null;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      cmsPageStore.setLoading(false);
    }
  };

  return {
    getCmsPage,
    data: items,
    loading
  };
};
