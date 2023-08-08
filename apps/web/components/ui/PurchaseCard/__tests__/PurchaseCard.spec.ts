import { mount } from '@vue/test-utils';
import PurchaseCard from '~/components/ui/PurchaseCard/PurchaseCard.vue';
import { ProductDetailsQuery } from '@vue-storefront/magento-types';

describe('<PurchaseCard />', () => {
  it('should render component', () => {
    const wrapper = mount(PurchaseCard, {
      props: {
        product: {} as ProductDetailsQuery | undefined | null,
      },
    });

    expect(wrapper.getByTestId('purchase-card'));    
  });
});