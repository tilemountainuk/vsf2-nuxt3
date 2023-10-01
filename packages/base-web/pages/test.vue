<template>
  Just a Test Page<br />
  {{ isMobile }}
  <br />
    <TestComponent />
  <TestComponent2 />
</template>
<script setup lang="ts">
// import TestComponent from '@base/components/TestComponent.vue';
// import TestComponent2 from '@base/components/subDir1/subDir2/TestComponent2.vue';

const { isMobile } = useDevice()
</script>
