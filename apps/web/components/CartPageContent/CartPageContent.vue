<template>
  <div
    v-if="cart && cart.items && cart.items.length > 0"
    class="md:grid md:grid-cols-12 md:gap-x-6"
    data-testid="cart-page-content"
  >
    <div class="col-span-7 mb-10 md:mb-0">
      <div v-for="{ uid, quantity, product } in cartData" :key="uid">
        <UiCartProductCard
          :attributes="[]"
          :image-url="product?.thumbnail?.url"
          :image-alt="product?.sku"
          :name="product?.name ?? ''"
          :price="product?.price_range?.minimum_price?.regular_price?.value || 0"
          :special-price="product?.price_range?.maximum_price?.regular_price?.value || 0"
          :max-value="10"
          :min-value="1"
          :value="quantity"
          :slug="product?.url_key"
        />
      </div>
    </div>
    <OrderSummary :cart="cart" class="col-span-5 md:sticky md:top-20 h-fit">
      <SfButton :tag="NuxtLink" :to="paths.checkout" size="lg" class="w-full mb-4 md:mb-0">
        {{ $t('goToCheckout') }}
      </SfButton>
    </OrderSummary>
  </div>
  <div v-else class="flex items-center justify-center flex-col pt-24 pb-32" data-testid="cart-page-content">
    <NuxtImg src="/images/empty-cart.svg" :alt="$t('emptyCartImgAlt')" width="192" height="192" />
    <h2 class="mt-8">{{ $t('emptyCart') }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';

const { data: cart } = useCart();

const cartData = computed(() => cart.value?.items);
const NuxtLink = resolveComponent('NuxtLink');
</script>
