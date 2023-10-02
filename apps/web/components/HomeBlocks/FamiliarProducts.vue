<template>
  <div class="text-[16px] font-[Roboto, sans-serif] font-[400] bg-[#fff] p-[0] md:bg-[#f1f1f1] md:pt-[1%]">
    <div class="container 2xl:max-w-7xl mx-auto px-[8px]">
      <div class="flex flex-row flex-wrap mx-[-8px]">
        <div
          class="w-1/3 mb-[10px] mt-[4px] px-[14px] smn:mb-[10px] smm:mt-[2px] smm:pr-[8px] smm:pl-[8px] smm:basis-[50%] smm:max-w-[50%] mdt:relative mdt:pt-0 mdt:pr-[10px] mdt:pb-[8px] mdt:pl-[10px] mdt:basis-[33.33%] mdt:max-w-[33.33%] lgl:basis-[33.33%] lgl:max-w-[33.33%]"
          v-for="tile in tiles"
          :key="'tile' + tile.id"
        >
          <NuxtLink to="/" class="decoration-[#4f4f4f] no-underline relative">
            <div class="relative pb-[109%]">
              <img
                :src="tile.tileImg"
                alt="tile"
                class="object-contain transform -translate-x-1/2 -translate-y-1/2 absolute mb-[-4px] w-[100%] top-[50%] left-[50%]"
              />
              <div
                class="absolute bottom-0 bg-[rgba(207,206,202,0.7)] w-full font-[Arial] block text-[#29275b] text-[20px] py-[25px] text-center font-[700]"
              >
                <h3 class="text-[16px] lgl:text-[17.2px] mdt:text-[14px] xld:text-[22px] px-[6px] leading-[1.4]">
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

<script lang="ts" setup>

let tiles = [
    {
      id: 1029,
      tileImg: "/images/img-placeholder.png",
      title: "Floor Tiles",
      topPick: false,
    },
    {
        id: 2938,
        tileImg: "/images/img-placeholder.png",
        title: "Bathroom Tiles",
        topPick: false,
    },
    {
        id: 3847,
        tileImg: "/images/img-placeholder.png",
        title: "Kitchen Tiles",
        topPick: false,
    },
    {
        id: 3837,
        tileImg: "/images/img-placeholder.png",
        title: "Outdoor Paving Slabs",
        topPick: false,
    },
    {
        id: 5835,
        tileImg: "/images/img-placeholder.png",
        title: "Wood Effect Tiles",
        topPick: false,
    },
    {
        id: 9937,
        tileImg: "/images/img-placeholder.png",
        title: "Top Picks Under £20",
        topPick: true,
    },
    {
        id: 5995,
        tileImg: "/images/img-placeholder.png",
        title: "Laminate Flooring",
        topPick: false,
    },
    {
        id: 5999,
        tileImg: "/images/img-placeholder.png",
        title: "Luxury Vinyl",
        topPick: false,
    },
    {
        id: 5991,
        tileImg: "/images/img-placeholder.png",
        title: "Real Wood",
        topPick: false,
    },
    ]

</script>