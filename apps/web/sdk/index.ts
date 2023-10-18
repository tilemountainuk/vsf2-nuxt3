import { initSDK, buildModule } from '@vue-storefront/sdk';
import { type SdkModule, sdkModule } from '@vue-storefront/storefront-boilerplate-sdk';
import { magentoModule, MagentoModuleType } from '@vue-storefront/magento-sdk';

export const useSdk = () => {
  const sdkConfig = {
    commerce: buildModule<SdkModule>(sdkModule),
    magento: buildModule<MagentoModuleType>(magentoModule, {
      apiUrl: 'http://localhost:4000/magento',
    }),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
};
