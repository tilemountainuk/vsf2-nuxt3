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

// import { useUserStore } from '@base/stores/user'
//
// const userStore = useUserStore()
// import { useCmsStore } from '~/stores/cms';

useCmsStore()
// useUserStore()
// import { useUserStore } from '@base/stores/user';


// const { getContent, data: content } = useContent('home-page');
const { data } = useCmsBlocks({ page: 'home' });
const { isMobile } = useDevice()

//
// userAgent: string
// isDesktop: boolean
// isIos: boolean
// isAndroid: boolean
// isMobile: boolean
// isMobileOrTablet: boolean
// isDesktopOrTablet: boolean
// isTablet: boolean
// isWindows: boolean
// isMacOS: boolean
// isApple: boolean
// isSafari: boolean
// isFirefox: boolean
// isEdge: boolean
// isChrome: boolean
// isSamsung: boolean
// isCrawler: boolean


// getCmsBlocks();
</script>
