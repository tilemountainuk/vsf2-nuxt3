<template>
  <section
    class="p-4 xl:p-6 md:border md:border-neutral-100 md:shadow-lg md:rounded-md md:sticky md:top-20"
    data-testid="purchase-card"
  >
    <h1 class="mb-1 font-bold typography-headline-4" data-testid="product-name">{{ product.name }}</h1>
    <div class="my-1">
      <span class="mr-2 text-secondary-700 font-bold font-headings text-2xl" data-testid="price">
        {{ product.price_range?.maximum_price?.final_price.currency
        }}{{ product.price_range?.maximum_price?.regular_price.value }}
      </span>
      <span class="text-base font-normal text-neutral-500 line-through">
        {{ product.price_range?.maximum_price?.final_price.currency
        }}{{ product.price_range?.maximum_price?.final_price.value }}
      </span>
    </div>
    <div class="py-4 mb-4 border-gray-200 border-y">
      <div class="flex flex-col md:flex-row flex-wrap gap-4">
        <UiQuantitySelector :value="quantitySelectorValue" class="min-w-[145px] flex-grow flex-shrink-0 basis-0" />
        <SfButton
          size="lg"
          v-if="product.sku && quantitySelectorValue > 0"
          class="flex-grow-[2] flex-shrink bg-primary basis-auto whitespace-nowrap"
          @click="addToCart(product.sku, quantitySelectorValue)"
        >
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          {{ $t('addToCart') }}
        </SfButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SfButton, SfIconShoppingCart } from '@storefront-ui/vue';
import type { ProductInterface } from '~/modules/Product/ProductInterface';

const route = useRoute();
const slug = route.params.slug as string;
const { addToCart } = magentoProduct(slug);

type PurchaseCardProps = {
  product: ProductInterface;
};

defineProps<PurchaseCardProps>();

const quantitySelectorValue = ref(1);
</script>
