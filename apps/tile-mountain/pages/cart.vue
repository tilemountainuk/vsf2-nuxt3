<template>
    <NuxtLayout
      name="checkout"
      :back-href="paths.category"
      :back-label-desktop="$t('backToShopping')"
      :back-label-mobile="$t('back')"
      :heading="$t('myCart')"
    >
        this is child cart
      <CartPageContent />
    </NuxtLayout>
</template>
  
<script setup lang="ts">
import { useSdk } from '../../web/sdk';
    definePageMeta({
        layout: false,
    });
    onMounted(async () => {
        console.log('This is called on mount of child');
        const { data, error } = await useAsyncData(() => useSdk().magento.createEmptyCart());
        console.log('This is data', data);
    });
</script>
  