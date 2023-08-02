<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px]">
          <Gallery :images="product?.images ?? []" />
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
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

const route = useRoute();
const code = route.params.code as string;
const { data: product, fetchProduct } = useProduct(code);

await fetchProduct({ id: code });

const { t } = useI18n();

const breadcrumbs: Breadcrumb[] = [
  { name: t('home'), link: '/' },
  { name: t('category'), link: '/category' },
  { name: product.value?.name as string, link: `#` },
];

const title = computed(() => product.value?.name ?? '');

useHead({
  title,
});
definePageMeta({
  layout: false,
});
</script>
