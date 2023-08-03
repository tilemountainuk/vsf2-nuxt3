import { magentoModule, MagentoModuleType } from '@vue-storefront/magento-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { type SdkModule, sdkModule } from '@vue-storefront/storefront-boilerplate-sdk';

const sdkConfig = {
  commerce: buildModule<SdkModule>(sdkModule),
  magento: buildModule<MagentoModuleType>(magentoModule, {
    apiUrl: 'http://localhost:4000/magento',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
