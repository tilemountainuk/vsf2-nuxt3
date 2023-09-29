import { useSdk } from 'sdk';
import { CmsBlocksResponse, CmsBlockQuery } from '@vue-storefront/magento-sdk';
import { AppConfigCMSBlocks, CmsBlocksInputType } from './types';
import type { Maybe } from '@vue-storefront/unified-data-model';


type CmsBlockState = {
  data: Maybe<CmsBlockQuery>;
  loading: boolean;
};

/**
 * @description Composable for managing content from CMS.
 * @param payload request Payload.
 * @returns {@link UseContent}
 * const { data, loading, getCmsBlocks } = useCmsBlock<ContentFieldsType>('identifiers');
 */

export const useCmsBlocks = (payload: CmsBlocksInputType) => {
  const { page, identifiers = null, includeDefaults = false } = payload;
  const appConfig = useAppConfig() as { cmsBlocks: AppConfigCMSBlocks };
  const state = useState<CmsBlockState>(`cms-blocks`, () => ({
    data: null,
    loading: false
  }));

  /**
   //  * @description Function for fetching the cms-blocks.
   //  * getCmsBlocks();
   //  */

  const getCmsBlocks = async () => {
    state.value.loading = true;
    console.log('appConfig', appConfig);
    try {
      //If CMS Blocks not defined in config, return;
      if (!appConfig.cmsBlocks) {
        return;
      }

      // Initialize with defaults if required
      let cmsBlockIdentifiers = includeDefaults ? (appConfig.cmsBlocks?.default ?? []) : [];

      // Add page-specific identifiers if page is defined in appConfig
      if (page && appConfig.cmsBlocks?.pages?.[page]) {
        cmsBlockIdentifiers = [...cmsBlockIdentifiers, ...appConfig.cmsBlocks.pages[page]];
        console.log('cmsBlockIdentifiers1', cmsBlockIdentifiers, ...appConfig.cmsBlocks.pages[page]);
      }

      // Add identifiers passed as arguments
      if (identifiers) {
        if (typeof identifiers === 'string') {
          cmsBlockIdentifiers.push(identifiers);
          console.log('cmsBlockIdentifiers1identifiers', identifiers);
        } else {
          cmsBlockIdentifiers = [...identifiers, ...cmsBlockIdentifiers];
          console.log('cmsBlockIdentifierselse', identifiers, cmsBlockIdentifiers);
        }
      }

      //Fetching data.
      const { data, error } = await useAsyncData(() => useSdk().magento.cmsBlocks({
        identifiers: cmsBlockIdentifiers
      }))
      console.log('dataIdentifier', data, useSdk().magento.cmsBlocks());
      if (data && data.value?.data) {
        console.log('data.value12', data.value?.data)
        state.value.data = data.value.data;
      }
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    getCmsBlocks,
    ...toRefs(state.value)
  };
};
