<template>
  <div data-testid="shipping-method" class="md:px-4 my-6">
    <div class="flex justify-between items-center">
      <h3 class="text-neutral-900 text-lg font-bold">{{ $t('shippingMethod.heading') }}</h3>
    </div>
    <div class="mt-4">
      <ul v-if="shippingMethods" class="grid gap-y-4 md:grid-cols-2 md:gap-x-4" role="radiogroup">
        <SfListItem
          v-for="(shippingMethod, index) in shippingMethods"
          tag="label"
          :key="index"
          class="border rounded-md items-start"
        >
          <div class="flex gap-2">
            <SfRadio
              v-model="radioModel"
              @click="updateShippingMethod(shippingMethod?.method_code, shippingMethod?.carrier_code)"
              :checked="
                cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_code === shippingMethod?.method_code
              "
              :value="shippingMethod?.method_code"
            />
            <div>
              <p>{{ shippingMethod?.method_title }}</p>
              <p class="ml-auto">
                {{ shippingMethod?.price_incl_tax.currency }} {{ shippingMethod?.price_incl_tax.value }}
              </p>
            </div>
          </div>
        </SfListItem>
      </ul>

      <div v-else class="flex mb-6">
        <SfIconBlock class="mr-2 text-neutral-500" />
        <p>{{ $t('shippingMethod.description') }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SfIconBlock, SfListItem, SfRadio } from '@storefront-ui/vue';
import type { ShippingMethodProps } from '~/components/ShippingMethod/types';

defineProps<ShippingMethodProps>();

const { data: cart } = useCart();
const { setShippingMethodsOnCart } = useCheckout();
const radioModel = ref(cart.value?.shipping_addresses?.[0]?.selected_shipping_method?.method_code);

const updateShippingMethod = (method_code: string, carrier_code: string) => {
  setShippingMethodsOnCart(method_code, carrier_code);
};
</script>
