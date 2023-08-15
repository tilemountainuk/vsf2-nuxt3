<template>
  <div data-testid="checkout-address" class="md:px-4 py-6">
    <div class="flex justify-between items-center">
      <h2 class="text-neutral-900 text-lg font-bold mb-4">{{ heading }}</h2>
      <SfButton v-if="savedAddress" size="sm" variant="tertiary" @click="open">
        {{ $t('contactInfo.edit') }}
      </SfButton>
    </div>
    <div v-if="!Array.isArray(savedAddress) && savedAddress && type === 'billingAddress'" class="mt-2 md:w-[520px]">
      <p>{{ `${savedAddress.firstname} ${savedAddress.lastname}` }}</p>
      <p>{{ savedAddress.telephone }}</p>
      <p>{{ `${savedAddress.street}` }}</p>
      <p>{{ `${savedAddress?.country?.code}` }}</p>
      <p>{{ `${savedAddress.postcode}` }}</p>
    </div>
    <div
      v-else-if="Array.isArray(savedAddress) && savedAddress && type === 'shippingAddress'"
      class="mt-2 md:w-[520px]"
    >
      <div v-for="(address, index) in savedAddress" :key="index">
        <p>{{ address?.firstname }} {{ address?.lastname }}</p>
        <p>{{ address?.telephone }}</p>
        <p>{{ address?.street?.[0] }} {{ address?.street?.[1] }}</p>
        <p>{{ address?.country?.code }}</p>
        <p>{{ address?.postcode }}</p>
      </div>
    </div>

    <div v-else class="w-full md:max-w-[520px]">
      <p>{{ description }}</p>
      <SfButton class="mt-4 w-full md:w-auto" variant="secondary" @click="open">
        {{ buttonText }}
      </SfButton>
    </div>

    <UiModal
      v-model="isOpen"
      tag="section"
      role="dialog"
      class="h-full w-full overflow-auto md:w-[600px] md:h-fit"
      aria-labelledby="address-modal-title"
    >
      <header>
        <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="close">
          <SfIconClose />
        </SfButton>
        <h3 id="address-modal-title" class="text-neutral-900 text-lg md:text-2xl font-bold mb-4">
          {{ heading }}
        </h3>
      </header>
      <AddressForm :saved-address="savedAddress" :type="type" @on-save="close" @on-close="close" />
    </UiModal>
  </div>
</template>
<script lang="ts" setup>
import { SfButton, SfIconClose, useDisclosure } from '@storefront-ui/vue';
import type { CheckoutAddressProps } from './types';

defineProps<CheckoutAddressProps>();

const { isOpen, open, close } = useDisclosure();
</script>
