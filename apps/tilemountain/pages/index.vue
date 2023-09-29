<template>
  is this mobile Page? :: {{ isMobile }}
  {{ data }}
  <HomeDelivery :homeDeliveryBlockData="homeDeliveryBlock"/>
  <pre>
<!--  {{ data }}-->
  </pre>
<!--  <div v-if="data && data?.cmsBlocks?.items">-->
<!--    <template v-for="cmsBlock in data.cmsBlocks.items">-->
<!--      <div v-if="cmsBlock" v-html="cmsBlock.content" />-->
<!--    </template>-->
<!--  </div>-->
</template>

<script setup lang="ts">
// const { getContent, data: content } = useContent('home-page');
import HomeDelivery from "~/components/blocks/HomeDelivery.vue";

const { getCmsBlocks, data } = useCmsBlocks({ page: 'home' });
const { isMobile } = useDevice()
const homeDeliveryBlock = 'Fawad'

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


getCmsBlocks();
</script>
