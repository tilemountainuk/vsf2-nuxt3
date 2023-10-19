<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px]">
          <NuxtLazyHydrate when-idle>
            <ProductGallery v-if="productGallery" :images="productGallery" />
          </NuxtLazyHydrate>
        </section>
        <section class="mb-10 grid-in-right md:mb-0">
          <NuxtLazyHydrate when-idle>
            <ProductPurchaseCard v-if="MagentoProduct" :product="MagentoProduct" />
          </NuxtLazyHydrate>
        </section>
        <UiDivider class="mt-4 mb-2" />
      </div>
    </NarrowContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';
import type { ProductInterface } from '~/modules/Product/ProductInterface';

definePageMeta({
  layout: false,
});

const route = useRoute();
const slug = route.params.slug as string;
const { data: product, fetchProduct } = magentoProduct(slug);
const { t } = useI18n();

await fetchProduct(slug);

const breadcrumbs: Breadcrumb[] = [
  { name: t('home'), link: '/' },
  { name: t('category'), link: '/category' },
  { name: product.value?.products?.items?.[0]?.name as string, link: `#` },
];

const title = computed(() => product.value?.products?.items?.[0]?.name ?? '');
const productGallery = computed(
  () =>
    product.value?.products?.items?.[0]?.media_gallery?.map((img) => ({
      url: img?.url || '',
      position: img?.position || 0,
      disabled: img?.disabled || false,
      label: img?.label || '',
    })),
);
const MagentoProduct = computed(() => {
  const productData = product.value?.products?.items?.[0];
  if (productData) {
    const { uid, sku, name, stock_status, only_x_left_in_stock, price_range } = productData;
    return { uid, sku, name, stock_status, only_x_left_in_stock, price_range };
  }
  return null;
});
useHead({
  title,
});
</script>
