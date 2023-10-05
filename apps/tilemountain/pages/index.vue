<template>
  <br />
  <span class="text-6xl leading-extra-tight font-headings">A Test</span>
  <div class="flex flex-col items-center space-y-4 xs:block xs:space-x-4">
    <router-link to="/privacy-policy-cookie-restriction-mode">
      <SfButton type="button" class="bg-[#88888805]" size="sm">Sample privacy_policy</SfButton>
    </router-link>
    &nbsp;
    <router-link to="/floor-tiles.html">
      <SfButton type="button" size="sm">Sample Category floor_tiles.html</SfButton>
    </router-link>
    &nbsp;

    <router-link to="/p/invisible-marble-gloss-floor-tile.html">
      <SfButton type="button" size="sm">Sample Product Page SKU: 452495</SfButton>
    </router-link>
  </div>
  <USPBar v-if="USPBarDataAllComputed && USPBarDataAllComputed.length > 0" :data="USPBarDataAllComputed[0].block" />
  <FamiliarBrands v-if="FamiliarBrandDataAllComputed && FamiliarBrandDataAllComputed.length > 0" :data="FamiliarBrandDataAllComputed[0].block" />
  <StyleAdvice v-if="StyleAdviceDataAllComputed && StyleAdviceDataAllComputed.length > 0" :data="StyleAdviceDataAllComputed[0].block" />
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

const { data, getCmsBlocks } = useCmsBlocks();
const { isMobile } = useDevice();

await getCmsBlocks({ page: 'home' });

const { cmsBlocks, cmsPages } = useCmsStore();
// getCmsBlocks({ identifiers: ['main_menu'] });

const USPBarDataAllComputed = computed(() => data.value.filter((uspBlock) => uspBlock.identifier === 'home-Delivery'));
const FamiliarBrandDataAllComputed = computed(() =>
  data.value.filter((uspBlock) => uspBlock.identifier === 'Familiar-Brands'),
);
const StyleAdviceDataAllComputed = computed(() =>
  data.value.filter((uspBlock) => uspBlock.identifier === 'style_advice'),
);
</script>
