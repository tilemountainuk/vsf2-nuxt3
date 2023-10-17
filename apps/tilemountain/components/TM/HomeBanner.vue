<template>
  <div class="banner-carousel">
    <Carousel class="mb-2">
      <Slide v-for="slide in homeBannersDesktop" :key="slide.id" v-if="!isMobile">
        <img :src="slide.imagePath" :alt="slide.description"/>
      </Slide>
      <Slide v-for="slide in homeBannersMobile" :key="slide.id" v-else>
        <img :src="slide.imagePath" :alt="slide.description"/>
      </Slide>
      <template #addons>
        <div class="navigation-buttons">
          <Navigation/>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue';
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel'

const { isMobile } = useDevice()

const bannersData = reactive({
  bannersDesktop: [
    {
      id: 1,
      imagePath: '/images/homeBanner/banner-1.png',
      description: 'Image 1'
    },
    {
      id: 2,
      imagePath: '/images/homeBanner/banner-2.png',
      description: 'Image 2'
    },
  ],
  bannersMobile: [
    {
      id: 1,
      imagePath: '/images/homeBanner/bannersMobile/banner-Mobile-1.png',
      description: 'Image 1'
    },
    {
      id: 2,
      imagePath: '/images/homeBanner/bannersMobile/banner-Mobile-2.png',
      description: 'Image 2'
    },
  ],
});

const homeBannersDesktop = computed(() => {
  console.log('>>> Computed Working', bannersData.bannersDesktop)
  console.log('>>> Computed Banners Length', bannersData.bannersDesktop.length)
  return bannersData.bannersDesktop && bannersData.bannersDesktop?.length > 0 ? bannersData.bannersDesktop : null
})
const homeBannersMobile = computed(() => {
  console.log('>>> Computed Working', bannersData.bannersMobile)
  console.log('>>> Computed Banners Length', bannersData.bannersMobile.length)
  return bannersData.bannersMobile && bannersData.bannersMobile?.length > 0 ? bannersData.bannersMobile : null
})


</script>
<style lang="scss">
.banner-carousel {
  .navigation-buttons {
    @apply relative bottom-[40px];
  }
  button {
    @apply bottom-[5px];
    svg {
      @apply fill-transparent h-0 w-0;
    }
  }
  button.carousel__prev, .carousel__prev--disabled {
    @apply left-2/4 opacity-100 rounded-full h-12 w-12 bg-[#172554] bg-center bg-[url('/images/homeBanner/bannerIcon/right.png')] bg-no-repeat;
  }
  button.carousel__next, .carousel__next--disabled {
    @apply right-2/4 opacity-100 rounded-full h-12 w-12 bg-[#172554] bg-center bg-[url('/images/homeBanner/bannerIcon/left.png')] bg-no-repeat;
  }
}
</style>
