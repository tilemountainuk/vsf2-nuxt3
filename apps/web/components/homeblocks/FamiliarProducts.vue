<template>
    <div class="text-[16px] font-[Roboto, sans-serif] font-[400] bg-[#fff] p-[0] md:bg-[#f1f1f1] md:pt-[1%]">
      <div class="container mx-auto  px-[8px]">
        <div class="flex flex-row flex-wrap mx-[-8px]">
          <div class="mb-[10px] mt-[4px] px-[14px] basis-full max-w-full smn:mb-[10px] smm:mt-[2px] smm:pr-[8px] smm:pl-[8px] smm:basis-[50%] smm:max-w-[50%] mdt:relative  mdt:pt-0 mdt:pr-[10px] mdt:pb-[8px] mdt:pl-[10px] mdt:basis-[33.33%] mdt:max-w-[33.33%] lgl:basis-[33.33%] lgl:max-w-[33.33%] "  v-for="tile in tiles" :key="'tile' + tile.id">
            <NuxtLink to="/" class="decoration-[#4f4f4f] no-underline relative">
              <div class="relative">
                <img :src="tile.tileImg" alt="tile" class="w-full" />
                <div class="absolute bottom-0 bg-[rgba(207,206,202,0.7)] w-full font-[Arial] block text-[#29275b] text-[20px] py-[25px] text-center font-[700]">
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