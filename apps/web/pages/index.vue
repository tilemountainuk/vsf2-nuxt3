<template>
  <div v-for="(component, index) in content" :key="`${component.fields.component}-${index}`">
    test
    <RenderContent :content="component.fields.content" />
  </div>
</template>

<script setup lang="ts">
const { getContent, data: content } = useContent('home-page');

getContent();
</script>
