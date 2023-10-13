import { magentoModule, MagentoModuleType } from '@vue-storefront/magento-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { type SdkModule, sdkModule } from '@vue-storefront/storefront-boilerplate-sdk';
import { createSharedComposable } from '@vueuse/core';

export const useSdk = createSharedComposable(() => {
  const sdkConfig = {
    commerce: buildModule<SdkModule>(sdkModule),
    magento: buildModule<MagentoModuleType>(magentoModule, {
      apiUrl: 'https://vsf2-nuxt3-web.vercel.app/magento'
    }),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
});
