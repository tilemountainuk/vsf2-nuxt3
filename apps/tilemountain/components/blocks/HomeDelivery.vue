<template>
  <div>
    home delivery
    {{homeDeliveryBlockData}}
    <div v-html="homeDeliveryBlockData?.[0]?.content" />
  </div>
</template>

<script setup lang="ts">
// const { getContent, data: content } = useContent('home-page');
const { getCmsBlocks, data } = useCmsBlocks({ page: 'home' });
const { isMobile } = useDevice()
getCmsBlocks();
// console.log('homeDeliveryBlockData', homeDeliveryBlockData)
const parsedContent = ref(null);
onMounted(() => {
  // Assuming you want to parse the first element in the data array
  const parser = new DOMParser();
  if(homeDeliveryBlockData !== undefined && homeDeliveryBlockData !== 'undefined'){
    parsedContent.value = parser.parseFromString(homeDeliveryBlockData.vlaue[0], 'text/html');
    console.log('parser', parser);
    console.log('parsedContent.value', parsedContent.value)
    // parsedContent.value = parser.parseFromString(data[0].content, 'text/html');
  }
});
defineProps<{
  homeDeliveryBlockData?: string | string[];
}>();
</script>
