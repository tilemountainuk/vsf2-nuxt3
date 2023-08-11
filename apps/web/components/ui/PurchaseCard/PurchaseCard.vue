<template>
  <section
    class="p-4 xl:p-6 md:border md:border-neutral-100 md:shadow-lg md:rounded-md md:sticky md:top-20"
    data-testid="purchase-card"
  >
    <UiTag variant="secondary" strong class="mb-4">
      <SfIconSell size="sm" class="mr-1" />
      <span class="mr-1">{{ product?.products?.items?.[0]?.sku }}</span>
    </UiTag>
    <h1 class="mb-1 font-bold typography-headline-4" data-testid="product-name">
      {{ product?.products?.items?.[0]?.name }}
    </h1>
    <div class="my-1">
      <span class="mr-2 text-secondary-700 font-bold font-headings text-2xl" data-testid="price">
        ${{ product?.products?.items?.[0]?.price_range.minimum_price.final_price.value }}
      </span>
      <span class="text-base font-normal text-neutral-500 line-through">
        ${{ product?.products?.items?.[0]?.price_range?.maximum_price?.final_price.value }}
      </span>
    </div>
    <div class="inline-flex items-center mt-4 mb-2">
      <SfRating size="xs" :value="0" :max="5" />
      <SfCounter class="ml-1" size="xs">0</SfCounter>
      <SfLink href="#" variant="secondary" class="ml-2 text-xs text-neutral-500">
        {{ $t('reviewsCount', { count: 0 }) }}
      </SfLink>
    </div>
    <div
      v-if="product?.products?.items?.[0]?.description?.html"
      v-html="product?.products?.items?.[0]?.description?.html"
    ></div>
    <div class="py-4 mb-4 border-gray-200 border-y">
      <div class="flex flex-col md:flex-row flex-wrap gap-4">
        <UiQuantitySelector
          :value="quantitySelectorValue"
          @on-update="updatedQuantitySelectorValue"
          class="min-w-[145px] flex-grow flex-shrink-0 basis-0"
        />
        <SfButton
          type="button"
          size="lg"
          v-if="product?.products?.items?.[0]?.sku"
          class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
          @click="productAddToCart(product?.products?.items?.[0]?.sku, quantitySelectorValue)"
        >
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          {{ $t('addToCart') }}
        </SfButton>
      </div>
      <div class="flex justify-center mt-4 gap-x-4">
        <SfButton type="button" size="sm" variant="tertiary">
          <template #prefix>
            <SfIconCompareArrows size="sm" />
          </template>
          {{ $t('compare') }}
        </SfButton>
        <SfButton type="button" size="sm" variant="tertiary">
          <SfIconFavorite size="sm" />
          {{ $t('addToList') }}
        </SfButton>
      </div>
    </div>
    <div class="flex first:mt-4">
      <SfIconPackage size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
      <p class="text-sm">
        <i18n-t keypath="additionalInfo.shipping">
          <template #addAddress>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.addAddress') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
    <div class="flex mt-4">
      <SfIconWarehouse size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
      <p class="text-sm">
        <i18n-t keypath="additionalInfo.pickup">
          <template #checkAvailability>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.checkAvailability') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
    <div class="flex mt-4">
      <p class="text-sm">
        <SfIconSafetyCheck size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
        <i18n-t keypath="additionalInfo.returns">
          <template #details>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.details') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  SfButton,
  SfCounter,
  SfLink,
  SfRating,
  SfIconSafetyCheck,
  SfIconCompareArrows,
  SfIconWarehouse,
  SfIconPackage,
  SfIconFavorite,
  SfIconSell,
  SfIconShoppingCart,
} from '@storefront-ui/vue';
import type { PurchaseCardProps } from '~/components/ui/PurchaseCard/types';

defineProps<PurchaseCardProps>();
const { productAddToCart } = useCart();

const quantitySelectorValue = ref(1);

const updatedQuantitySelectorValue = (updatedCount: number) => {
  quantitySelectorValue.value = updatedCount;
};
</script>
