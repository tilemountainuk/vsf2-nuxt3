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

  <pre>
  {{ data }}
  </pre>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

const { data, getCmsBlocks } = useCmsBlocks();
console.log('dataIs', data)
const { isMobile } = useDevice()

const fetchedData = await getCmsBlocks({ identifiers: ['main_menu'] });
console.log('fetchedData', fetchedData)

const { cmsBlocks, cmsPages } = useCmsStore();


console.log('cmsBlocks444', cmsBlocks, cmsPages)
// getCmsBlocks({ identifiers: ['main_menu'] });
</script>
