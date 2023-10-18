<template>
  <div>
    <h1>Product Title</h1>
    <SfButton type="submit" class="min-w-[120px] bg-black"> State </SfButton>
    <label class="block flex-1">
      <UiFormLabel>Local:</UiFormLabel>
      <SfInput name="localusername" type="text" v-model="local.username" />
    </label>
    <label class="block flex-1">
      <UiFormLabel>Cookie:</UiFormLabel>
      <SfInput name="cookieusername" type="text" v-model="cookie.username" />
    </label>
  </div>
</template>
<script setup>
import { SfButton, SfInput } from '@storefront-ui/vue';
const local = useLocalUser();
const cookie = useCookieUser();
</script>
