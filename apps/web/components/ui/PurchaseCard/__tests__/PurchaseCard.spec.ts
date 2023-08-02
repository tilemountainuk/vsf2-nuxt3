import { Product } from '@vsf-enterprise/sapcc-types';
import { mount } from '@vue/test-utils';
import PurchaseCard from '~/components/ui/PurchaseCard/PurchaseCard.vue';

describe('<PurchaseCard />', () => {
  it('should render component', () => {
    const wrapper = mount(PurchaseCard, {
      props: {
        product: {} as Product,
      },
    });

    expect(wrapper.getByTestId('purchase-card'));
  });
});
