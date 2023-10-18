<template>
  <div class="usp-bar-main sm:mb-2 bg-[#FAFAFA] mp:bg-white">
    <div class="usp-bar-inner px-6 py-2">
      <Carousel class="w-full" :autoplay='5000' :transition='1000' :breakpoints='uspBarContent.breakpoints'>
        <Slide v-for="(content, index) in USPBarContent" :key='index' v-if="USPBarContent"
               @click="navigateToLink(content.url)">
          <div class="usp-content flex items-center w-full mp:justify-center"
               :class="{'justify-start': index === 0, 'justify-center': index === 1, 'justify-end': index === USPBarContent.length - 1}">
            <img :src="content.image" :alt="content.alt" class="tab:w-7 tab:h-7 mp:w-14 mp:h-14"/>
            <p class="pl-3 text-[#18181B] text-base font-medium tab:text-xs mp:text-base">{{ content.text }}</p>
          </div>
        </Slide>
      </Carousel>

    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue';
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel'

const {isMobile} = useDevice()

const uspBarContent = reactive({
  uspData: [
    {
      image: '/images/USPBar/delivery.png',
      text: 'Free Delivery Over £299',
      alt: 'Free Delivery',
      url: '/floor-tiles.html'
    },
    {
      image: '/images/USPBar/totallyfree.png',
      text: 'Totally Free Cut Samples',
      alt: 'Free Cut Samples',
      url: '/kitchen-tiles.html'
    },
    {
      image: '/images/USPBar/reviews.png',
      text: 'Over 29,000 Positive Reviews',
      alt: 'Positive Reviews',
      url: '/floor-tiles.html'
    }
  ],
  breakpoints: {
    768: {
      itemsToShow: 3,
    },
  },
})


const USPBarContent = computed(() => {
  console.log('>>> Computed Working', uspBarContent.uspData)
  console.log('>>> Computed uspBarContent.uspData Length', uspBarContent.uspData.length)
  return uspBarContent.uspData && uspBarContent.uspData?.length > 0 ? uspBarContent.uspData : null
})

const navigateToLink = (url: string) => {
  const router = useRouter();
  router.push(url)
}

</script>

<style scoped lang="scss">
//.usp-bar-inner {
//}
</style>