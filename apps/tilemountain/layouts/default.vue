<template>
  <TMHeader v-if="MenuDataAllComputed" :data="MenuDataAllComputed[0].block" />
  <NarrowContainer v-if="breadcrumbs">
    <div class="p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
  </NarrowContainer>
  <main>
    <slot />
  </main>
  <NuxtLazyHydrate when-idle>
    <UiNavbarBottom />
  </NuxtLazyHydrate>
  <UiFooter :data="FooterBlocksAllData" />
</template>

<script setup lang="ts">
import { DefaultLayoutProps } from '~/layouts/types';

defineProps<DefaultLayoutProps>();
const { fetchCard } = useCart();
const { fetchCustomer } = useCustomer();

fetchCard();
fetchCustomer();
usePageTitle();

const { data: blocksData, getCmsBlocks } = useCmsBlocks();
await getCmsBlocks({ identifiers: ['main_menu', 'trust-pilot', 'tm_footer_links', 'sb-social-links'] });
const MenuDataAllComputed = computed(() =>
  blocksData.value.filter((menuBlock) => menuBlock.identifier === 'main_menu'),
);
const FooterBlocksAllData = computed(() =>
  blocksData.value.filter((menuBlock) =>
    ['trust-pilot', 'tm_footer_links', 'sb-social-links'].includes(menuBlock.identifier),
  ),
);
</script>
