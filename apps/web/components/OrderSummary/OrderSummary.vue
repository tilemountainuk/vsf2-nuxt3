<template>
  <div class="shadow-lg md:rounded-md md:border md:border-neutral-100" data-testid="order-summary">
    <div class="flex justify-between items-end py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-bold md:typography-headline-3">{{ $t('orderSummary') }}</p>
      <p class="typography-text-base font-medium" data-testid="total-in-cart">
        {{ $t('itemsInCart', cart?.items.length) }}
      </p>
    </div>
    <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
      <div class="flex justify-between typography-text-base pb-4">
        <div class="flex flex-col grow pr-2">
          <p>{{ $t('itemsSubtotal') }}</p>
          <p class="typography-text-xs text-neutral-500">{{ $t('originalPrice') }}</p>
          <p class="typography-text-xs text-secondary-700">{{ $t('savings') }}</p>
        </div>
        <div class="flex flex-col text-right">
          <p data-testid="special-price">{{ cart.prices.grand_total.currency }}{{ cart.prices.grand_total.value }}</p>
          <p class="typography-text-xs text-neutral-500">
            {{ cart.prices.grand_total.currency }}{{ cart.prices.subtotal_including_tax.value }}
          </p>
          <p
            class="typography-text-xs text-secondary-700"
            v-if="cart.prices.discounts && cart.prices.discounts.length > 0"
          >
            {{ cart.prices.discounts.currency }}{{ cart.prices.subtotal_including_tax.value }}
            <span v-for="discount in cart.prices.discounts" :key="discount.label">
              {{ discount.label }} - {{ discount.amount.currency }} {{ discount.amount.currency }}
            </span>
          </p>
        </div>
      </div>
      <div class="flex gap-x-2 py-4 border-y border-neutral-200 mb-4">
        <SfInput wrapper-class="grow" :placeholder="$t('promoCodePlaceholder')" />
        <SfButton variant="secondary">{{ $t('apply') }}</SfButton>
      </div>
      <div class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4">
        <p>{{ $t('total') }}</p>
        <p data-testid="total">{{ cart.prices.grand_total.currency }}{{ cart.prices.grand_total.value }}</p>
      </div>
      <UiDivider class="my-4 w-auto" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfInput } from '@storefront-ui/vue';
import type { OrderSummaryPropsType } from '~/components/OrderSummary/types';

defineProps<OrderSummaryPropsType>();
</script>
