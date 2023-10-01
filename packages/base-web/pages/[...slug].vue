<template>
  <component :is="type" v-bind="dynamicProps" />
</template>

<script lang="ts" setup>

// Reading the route type and dynamicProps
import { ConcreteComponent, Ref, ShallowRef } from 'vue';
const routeType = useState<{ type: string }>('routeData')?.value?.type
const dynamicProps = ref({})
const type = shallowRef<string | ConcreteComponent | null>(null);

switch (routeType) {
  case 'PRODUCT':
    type.value = resolveComponent('productPage');
    const sku = useState<{ sku: string }>('routeData')?.value?.sku
    dynamicProps.value = { sku }
    break;
  case 'CATEGORY':
    type.value = resolveComponent('categoryPage');
    const uid = useState<{ uid: string }>('routeData')?.value?.uid
    dynamicProps.value = { uid }
    break;
  case 'CMS_PAGE':
    type.value = resolveComponent('cmsPage');
    const identifier = useState<{ identifier: string }>('routeData')?.value?.identifier
    dynamicProps.value = { identifier }
    break;
  default:
    type.value = resolveComponent('pageNotFound');
}
</script>
