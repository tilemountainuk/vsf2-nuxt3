import { useSdk } from 'sdk';
import { CmsBlocksResponse, CmsBlockQuery } from '@vue-storefront/magento-sdk';
import { CmsBlocksInputType } from './types';
import { storeToRefs } from 'pinia';
import { AppConfigCMS, BlockItem } from '../../types/index';

/**
 * @description Composable for managing content from CMS.
 * @param payload request Payload.
 * @param autoInit auto fetch data from server.
 * @returns {@link UseContent}
 * const { data, loading, getCmsBlocks } = useCmsBlock<ContentFieldsType>('identifiers');
 */

export const useCmsBlocks = (payload: CmsBlocksInputType, autoInit = true) => {
  const { page = null, identifiers = null, includeDefaults = false } = payload;
  const appConfig = useAppConfig() as { cms: AppConfigCMS };
  const cmsBlockStore = useCmsBlockStore();

  // Use storeToRefs to make the state properties reactive
  const { items, loading, blocksData } = storeToRefs(cmsBlockStore);

  const getCmsBlocks = async (identifiers: string[]) => cmsBlockStore.getBlocksData(identifiers)
  const fetchInitialCmsBlocks = async () => {
    cmsBlockStore.setLoading(true);

    try {
      //Get the CMS blocks Configurations
      let cmsBlockPageMapping = appConfig.cms?.blocks;

      //If CMS Blocks not defined in config, and no identifiers has been requested then return;
      if (!cmsBlockPageMapping && !identifiers) {
        return;
      }

      // Initialize with defaults if required
      let cmsBlockIdentifiers = includeDefaults ? (cmsBlockPageMapping?.default ?? []) : [];

      // Add page-specific identifiers if page is defined in appConfig
      if (page && cmsBlockPageMapping?.pages?.[page]) {
        cmsBlockIdentifiers.push(...cmsBlockPageMapping.pages[page]);
        // cmsBlockIdentifiers = [...cmsBlockIdentifiers, ...cmsBlockPageMapping.pages[page]];
      }

      // Add identifiers passed as arguments
      if (identifiers) {
        cmsBlockIdentifiers.push(...(Array.isArray(identifiers) ? identifiers : [identifiers]));
        // if (typeof identifiers === 'string') {
        //   cmsBlockIdentifiers.push(identifiers);
        // } else {
        //   cmsBlockIdentifiers.push(...identifiers);
        //   // cmsBlockIdentifiers = [...identifiers, ...cmsBlockIdentifiers];
        // }
      }

      const { $generateUniqueKey } = useNuxtApp()

      // Generate unique key for this query
      const uniqueKey: string = $generateUniqueKey({
        page: payload.page,
        cmsBlockIdentifiers,
        includeDefaults: payload.includeDefaults
      });

      // Check if data already exists in store
      const cachedData = blocksData.value[uniqueKey];

      if (cachedData) {
        //check if we have those cms blocks already in store.
        const fetchedCachedData = cmsBlockStore.getBlocksData(cachedData);

        // No need to send query then to fetch more, as we already have it in state
        if (Array.isArray(fetchedCachedData) && fetchedCachedData.length) {
          return false;
        }
      }

      //Fetching data.
      const { data, error } = await useAsyncData<CmsBlocksResponse>(() => useSdk().magento.cmsBlocks({
        identifiers: cmsBlockIdentifiers
      }))
      const fetchedCmsBlocks = data?.value?.data?.cmsBlocks?.items;
      if (fetchedCmsBlocks) {
        const mappedDataForState =
          fetchedCmsBlocks?.filter((blockItem) => !!blockItem)?.map((blockItem): BlockItem => {
            const nonNullBlockItem = blockItem!;
            return {
              identifier: nonNullBlockItem.identifier!,
              block: nonNullBlockItem
            }
          })
        cmsBlockStore.setItems(mappedDataForState);
        // set the data to the store as well to be cached.
        cmsBlockStore.setBlocksData(uniqueKey, cmsBlockIdentifiers);
      }
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      cmsBlockStore.setLoading(false);
    }
  };
  if (autoInit) {
    fetchInitialCmsBlocks();
  }

  return {
    getCmsBlocks,
    data: items,
    loading
  };
};
