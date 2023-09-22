<template>
    <NuxtLayout
      name="checkout"
      :back-href="paths.category"
      :back-label-desktop="$t('backToShopping')"
      :back-label-mobile="$t('back')"
      :heading="$t('myCart')"
    >
      Tile-Mountain Cart Page
      <CartPageContent />
    </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
layout: false,
});
</script>
  