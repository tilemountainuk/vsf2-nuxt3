<template>
  <div>
    <component :is="type" v-if="type" v-bind="dynamicProps" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const CATEGORY = markRaw(defineAsyncComponent(() =>
        import('~/modules/category/pages/index.vue')
    )
)

const PRODUCT = markRaw(defineAsyncComponent(() =>
        import('~/modules/product/pages/index.vue')
    )
)

const routeType = useState<{ type: string }>('routeData')?.value?.type
const dynamicProps = ref({})
const type = ref();

if (routeType == 'PRODUCT') {
  const sku = useState<{ sku: string }>('routeData')?.value?.sku
  dynamicProps.value = { sku }
  type.value = PRODUCT
}

if (routeType == 'CATEGORY') {
  const uid = useState<{ uid: string }>('routeData')?.value?.uid
  dynamicProps.value = { uid }
  type.value = CATEGORY
}
</script>
