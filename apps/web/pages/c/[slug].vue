<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <CategoryPageContent
      v-if="
        productsCatalog &&
        productsCatalog.data &&
        productsCatalog.data.categoryList &&
        productsCatalog.data.categoryList.length > 0
      "
      :title="productsCatalog.data.categoryList[0].name"
      :total-products="productsCatalog.data.categoryList[0].product_count"
      :products="productsCatalog.data.categoryList[0].products.items"
    >
      <!-- <template #sidebar>
        <CategoryTree :categories="categories" :parent="{ name: $t('allProducts'), href: paths.category }" />
        <CategorySorting />
        <CategoryFilters :facets="productsCatalog.facets" />
      </template> -->
    </CategoryPageContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

definePageMeta({
  layout: false,
});

const { fetchProducts, data: productsCatalog } = useProducts();
const { t } = useI18n();
const route = useRoute();
const slug = route.params.slug as string;

await fetchProducts(slug);

const breadcrumbs: Breadcrumb[] = [{ name: t('home'), link: '/' }];
// const subCategories = productsCatalog.value?.subCategories;
// const categories = computed(
//   () =>
//     subCategories?.map(({ name, productCount }) => ({
//       name,
//       count: productCount || undefined,
//       href: paths.category,
//     })) || [],
// );
</script>
