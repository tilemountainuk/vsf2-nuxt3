<template>
  <Body class="font-arial" :class="bodyClass" />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
usePageTitle();

const bodyClass = ref('');

onMounted(() => {
  // Need this class for cypress testing
  bodyClass.value = 'hydrated';
});
</script>
