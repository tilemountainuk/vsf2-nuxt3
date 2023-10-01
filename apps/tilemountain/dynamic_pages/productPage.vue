<template>
  ProductPage from TM Theme
  Product Page here for SKU {{ sku }}
</template>

<script lang="ts" setup>
const props = defineProps<{
  sku: string;
}>();

const sku = ref(props.sku);
</script>
