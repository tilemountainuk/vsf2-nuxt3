<template>
  <NarrowContainer>
    <div class="mb-20 px-4 md:px-0" data-testid="category-layout">
      <h1 class="my-10 font-bold typography-headline-3 md:typography-headline-2">{{ title }}</h1>
      <div class="md:flex gap-6" data-testid="category-page-content">
        <CategorySidebar :is-open="isOpen" @close="close">
          <NuxtLazyHydrate when-visible>
            <slot name="sidebar" />
          </NuxtLazyHydrate>
        </CategorySidebar>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold font-headings md:text-lg">
              {{ $t('numberOfProducts', { count: totalProducts }) }}
            </span>
            <SfButton @click="open" variant="tertiary" class="md:hidden whitespace-nowrap">
              <template #prefix>
                <SfIconTune />
              </template>
              {{ $t('listSettings') }}
            </SfButton>
          </div>
          <section
            v-if="products"
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
            data-testid="category-grid"
          >
            <NuxtLazyHydrate
              when-visible
              v-for="({ uid, name, price_range, thumbnail, url_key }, index) in products"
              :key="uid"
            >
              <UiProductCard
                :name="name ?? ''"
                :rating-count="0"
                :rating="0"
                :price="price_range?.maximum_price?.regular_price?.value"
                :image-url="thumbnail?.url ?? ''"
                :image-alt="name ?? ''"
                :slug="url_key"
                :priority="index === 0"
              />
            </NuxtLazyHydrate>
          </section>
          <LazyCategoryEmptyState v-else />
          <NuxtLazyHydrate when-visible>
            <!-- <UiPagination
              v-if="totalProducts > itemsPerPage"
              :current-page="1"
              :total-items="totalProducts"
              :page-size="itemsPerPage"
              :max-visible-pages="maxVisiblePages"
            /> -->
          </NuxtLazyHydrate>
        </div>
      </div>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { SfButton, SfIconTune, useDisclosure } from '@storefront-ui/vue';
import { useMediaQuery } from '@vueuse/core';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';

withDefaults(defineProps<CategoryPageContentProps>(), {
  itemsPerPage: 24,
});

const { isOpen, open, close } = useDisclosure();
const isTabletScreen = useMediaQuery(mediaQueries.tablet);
const isWideScreen = useMediaQuery(mediaQueries.desktop);
const maxVisiblePages = ref(1);

const setMaxVisiblePages = (isWide: boolean) => (maxVisiblePages.value = isWide ? 5 : 1);

watch(isWideScreen, (value) => setMaxVisiblePages(value));
onMounted(() => setMaxVisiblePages(isWideScreen.value));
watch(isTabletScreen, (value) => {
  if (value && isOpen.value) {
    close();
  }
});
</script>
