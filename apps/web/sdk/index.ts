import { contentfulModule, ContentfulModuleType } from '@vsf-enterprise/contentful-sdk';
import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { type SdkModule, sdkModule } from '@vue-storefront/storefront-boilerplate-sdk';

const sdkConfig = {
  commerce: buildModule<SdkModule>(sdkModule),
  sapcc: buildModule<SAPCCModuleType>(sapccModule, {
    apiUrl: process.env.NUXT_PUBLIC_SDK_SAPCC_API_URL || 'http://localhost:8181/sapcc',
    ssrApiUrl: process.env.NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL || 'http://localhost:8181/sapcc',
  }),
  contentful: buildModule<ContentfulModuleType>(contentfulModule, {
    apiUrl: process.env.NUXT_PUBLIC_SDK_CNTF_API_URL || 'http://localhost:8181/cntf',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
