<template>
  <div class="usp-bar-main">
    <div class="usp-bar-inner">
      <div v-if="USPBarContent && USPBarContent.length > 0" v-for="data in USPBarContent"
           class="flex items-center">
        <img :src="data.image" :alt="data.alt"/>
        <p class="pl-3 text-[#18181B] text-base font-medium">{{ data.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue';

const uspContent = reactive({
  uspData: [
    {
      image: '/images/USPBar/delivery.png',
      text: 'Free Delivery Over £299',
      alt: 'Free Delivery'
    },
    {
      image: '/images/USPBar/totallyfree.png',
      text: 'Totally Free Cut Samples',
      alt: 'Free Cut Samples'
    },
    {
      image: '/images/USPBar/reviews.png',
      text: 'Over 29,000 Positive Reviews',
      alt: 'Positive Reviews'
    }
  ]
})

const USPBarContent = computed(() => {
  console.log('>>> Computed Working', uspContent.uspData)
  console.log('>>> Computed uspContent.uspData Length', uspContent.uspData.length)
  return uspContent.uspData && uspContent.uspData?.length > 0 ? uspContent.uspData : null
})
</script>

<style scoped lang="scss">
.usp-bar-inner {
  @apply flex justify-between my-5 bg-[#FAFAFA] py-2 pr-3 pl-7;
  p {

  }
}
</style>