<template>
  <h1 class="text-2xl lg:text-6xl font-bold text-center text-gray-300 bg-gray-900 p-5 rounded-lg shadow-lg">
    <span v-if="cmsPage?.identifier">identifier :: {{ cmsPage.identifier }}</span>
    <span class="block text-center text-xl text-gray-500 bg-gray-800 px-3 py-1 rounded-full mt-2 inline-block">
      Tailwind Works
    </span>
  </h1>
  <p v-if="cmsPage?.content" v-html="cmsPage.content" />
</template>
<script lang="ts" setup>
import { useCmsPage } from '@base/modules/cms/runtime/composables/useCmsPage';

const { identifier } = defineProps<{
  identifier: string;
}>();

const { getCmsPage, loading } = useCmsPage()
const cmsPage = await getCmsPage(identifier)
</script>
