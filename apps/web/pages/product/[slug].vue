<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px]" v-if="mappedImages">
          <Gallery :images="mappedImages" />
        </section>
        <section class="mb-10 grid-in-right md:mb-0">
          <UiPurchaseCard v-if="product" :product="product" />
        </section>
      </div>
    </NarrowContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { MediaGalleryInterface } from '@vue-storefront/magento-types';
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

const route = useRoute();
const slug = route.params.slug as string;
const { data: product, fetchProduct } = useProduct(slug);

await fetchProduct(slug);

const { t } = useI18n();

const mappedImages: MediaGalleryInterface[] = product?.value?.products?.items?.[0]
  ?.media_gallery as MediaGalleryInterface[];

const breadcrumbs: Breadcrumb[] = [
  { name: t('home'), link: '/' },
  { name: product.value?.products?.items?.[0]?.name as string, link: `#` },
];

const title = computed(() => product.value?.products?.items?.[0]?.name ?? '');

useHead({
  title,
});
definePageMeta({
  layout: false,
});
</script>
