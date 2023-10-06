<template>
    <div class="text-[16px] font-[Roboto, sans-serif] font-[400] bg-[#fff] p-[0] md:bg-[#f1f1f1] md:pt-[1%]">
      <div class=" container 2xl:max-w-7xl mx-auto px-[8px]">
        <div class="flex flex-row flex-wrap mx-[-8px]">
          <div class="  px-[14px] mt-[4px] mb-[10px] basis-full max-w-full sm:px-[14px] md:my-[0px] z-0 relative md:pt-0 md:px-[10px] md:pb-[24px] md:basis-[33.33%] md:max-w-[33.33%] "  v-for="tile in tiles" :key="'tile' + tile.id">
            <NuxtLink to="/" class="decoration-[#4f4f4f] no-underline relative">
              <div class="relative pb-[109%]">
                <NuxtImg :src="tile.tileImg" alt="tile" class=" object-contain transform -translate-x-1/2 -translate-y-1/2 absolute mb-[-4px] w-[100%] top-[50%] left-[50%] " />
                <div class="absolute bottom-0 bg-[rgba(207,206,202,0.7)] w-full  block text-[#29275b] text-[20px] pt-[4px] pb-[10px]  text-center font-[700]">
                  <h3 class="text-[16px] lg:text-[17.2px] md:text-[14px] xl:text-[22px] p-[6px] xl:px-[6px] xl:py-[0px] xl:my-[22px] leading-[1.4]">
                    {{ tile.title }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

let tiles = [
    {
      id: 1029,
      tileImg: "/img/img-placeholder.png",
      title: "Floor Tiles",
      topPick: false,
    },
    {
        id: 2938,
        tileImg: "/img/img-placeholder.png",
        title: "Bathroom Tiles",
        topPick: false,
    },
    {
        id: 3847,
        tileImg: "/img/img-placeholder.png",
        title: "Kitchen Tiles",
        topPick: false,
    },
    {
        id: 3837,
        tileImg: "/img/img-placeholder.png",
        title: "Outdoor Paving Slabs",
        topPick: false,
    },
    {
        id: 5835,
        tileImg: "/img/img-placeholder.png",
        title: "Wood Effect Tiles",
        topPick: false,
    },
    {
        id: 9937,
        tileImg: "/img/img-placeholder.png",
        title: "Top Picks Under £20",
        topPick: true,
    },
    {
        id: 5995,
        tileImg: "/img/img-placeholder.png",
        title: "Laminate Flooring",
        topPick: false,
    },
    {
        id: 5999,
        tileImg: "/img/img-placeholder.png",
        title: "Luxury Vinyl",
        topPick: false,
    },
    {
        id: 5991,
        tileImg: "/img/img-placeholder.png",
        title: "Real Wood",
        topPick: false,
    },
    ]

</script>