<template>
  Product Page here for SKU {{ sku }}
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps<{
  sku: string;
}>();

const sku = ref(props.sku);
</script>
