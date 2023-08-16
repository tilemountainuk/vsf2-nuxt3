import { SetBillingAddressOnCartInput } from '@vue-storefront/magento-types';
import { useCart } from '~/composables/useCart/useCart';
import {
  setBillingAddressOnCartCustomQuery,
  setShippingAddressesOnCartCustomQuery,
} from '~/composables/useCheckout/customQueries/CheckoutCustomQuery';
import { setShippingMethodsOnCartCustomQuery } from '~/composables/useCheckout/customQueries/CheckoutOrderProcessingCustomQuery';
import useUiNotification from '~/composables/useUiNotification/useUiNotification';
import { useSdk } from '~/sdk';

const { send: sendNotification } = useUiNotification();

export const useCheckout = () => {
  const state = useState('useCheckout', () => ({
    cartEmail: '',
    orderId: '',
  }));
  const { fetchCard, cartId } = useCart();
  const saveEmailAddress = async (email: string) => {
    try {
      const result = await useSdk().magento.setGuestEmailOnCart({ cart_id: cartId.value, email: email });
      if (result && result.errors && result.errors.length > 0) {
        sendNotification({
          icon: 'Error',
          message: 'Error while updating email',
          title: 'error',
          type: 'negative',
        });
        return 'Fail';
      } else {
        sendNotification({
          icon: 'Check',
          message: 'Email Updated',
          title: 'Checkout Personal Email Updated',
          type: 'positive',
        });
        state.value.cartEmail = email;
        return 'Success';
      }
    } catch {
      sendNotification({
        icon: 'Error',
        message: 'Error while updating email',
        title: 'error',
        type: 'negative',
      });
      return 'Fail';
    }
  };
  const saveBillingAddress = async (params: SetBillingAddressOnCartInput) => {
    try {
      const result = await useSdk().magento.setBillingAddressOnCart(params, {
        customQuery: setBillingAddressOnCartCustomQuery,
      });
      if (result && result.errors && result.errors.length > 0) {
        sendNotification({
          icon: 'Error',
          message: 'Error while updating billing',
          title: 'error',
          type: 'negative',
        });
        return 'Fail';
      } else {
        sendNotification({
          icon: 'Check',
          message: 'Billing Updated',
          title: 'Checkout Billing Updated',
          type: 'positive',
        });
        fetchCard();
        return 'Success';
      }
    } catch {
      sendNotification({
        icon: 'Error',
        message: 'Error while updating billing',
        title: 'error',
        type: 'negative',
      });
      return 'Fail';
    }
  };
  const saveShippingAddress = async (defaultValues: any) => {
    try {
      // const params = {
      //   cart_id: cartId.value,
      //   shipping_addresses: [
      //     {
      //       address: defaultValues,
      //     },
      //   ],
      // };
      const { errors } = await useSdk().magento.setShippingAddressesOnCart(defaultValues, {
        customQuery: setShippingAddressesOnCartCustomQuery,
      });
      if (errors && errors.length > 0) {
        sendNotification({
          icon: 'Error',
          message: 'Error while updating shipping',
          title: 'error',
          type: 'negative',
        });
        return 'Fail';
      } else {
        sendNotification({
          icon: 'Check',
          message: 'Shipping Updated',
          title: 'Checkout Shipping Updated',
          type: 'positive',
        });
        fetchCard();
        return 'Success';
      }
    } catch {
      sendNotification({
        icon: 'Error',
        message: 'Error while updating shipping',
        title: 'error',
        type: 'negative',
      });
      return 'Fail';
    }
  };
  const setShippingMethodsOnCart = async (method_code: string, carrier_code: string) => {
    try {
      const params = {
        cart_id: cartId.value ?? '',
        shipping_methods: [
          {
            carrier_code: carrier_code,
            method_code: method_code,
          },
        ],
      };
      const { data } = await useSdk().magento.setShippingMethodsOnCart(params, {
        customQuery: setShippingMethodsOnCartCustomQuery,
      });
      console.log('setShippingMethodsOnCart Data', data);
    } catch (error) {
      throw new Error(error as string);
    }
  };
  const setPaymentMethodOnCart = async (code: string) => {
    try {
      const params = {
        cart_id: cartId.value ?? '',
        payment_method: {
          code: code,
        },
      };
      const { data } = await useSdk().magento.setPaymentMethodOnCart(params, {
        customQuery: setPaymentMethodOnCartCustomQuery,
      });
      console.log('setPaymentMethodOnCartCustomQuery Data is', data);
    } catch (error) {
      throw new Error(error as string);
    }
  };
  const placeOrder = async () => {
    try {
      const { data } = await useSdk().magento.placeOrder({ cart_id: cartId.value });
      const mappedOrderId: string = data?.placeOrder?.order.order_number as string;
      state.value.orderId = mappedOrderId;
      navigateTo('/order/success');
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return {
    saveEmailAddress,
    saveBillingAddress,
    saveShippingAddress,
    setShippingMethodsOnCart,
    setPaymentMethodOnCart,
    placeOrder,
    ...toRefs(state.value),
  };
};
