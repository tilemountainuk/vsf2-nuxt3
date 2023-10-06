<template>
  <section
    class="bg-[#24224d] w-full "
    :class="{
      'md:fixed z-50 md:top-0': scrollPosition > 95,
      'relative': scrollPosition < 95
    }"
  >
    <div class="container 2xl:max-w-7xl mx-auto">
      <div class="menu">
        <ul class="relative hidden md:flex justify-around">
          <li class="group group-hover">
            <div
              class="flex items-center justify-center text-white text-11 lg:text-15 font-bold flex-auto hover:bg-[#0fa897] group-hover:bg-[#0fa897]"
            >
              <RouterLink to="/" class="block py-6 px-1 text-center">
                <span>All Tiles</span>
              </RouterLink>
            </div>
            <div
              class="absolute p-1 left-0 hidden w-full bg-[#0fa897] transition-opacity duration-200 z-50 opacity-0 group-hover:opacity-100 group-hover:flex"
            >
              <div class="flex w-full lg:w-5/6 pb-16 relative">
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Room</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Bathroom</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Kitchen</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Hallway</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Living Room</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Outdoor</span>
                      </RouterLink>
                    </li>
                  </ul>
                  <h4 class="text-[#2a285a] text-base font-bold pt-4">By Suitability</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Wall</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Floor</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Style</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Patterned</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Marble Effect</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Terrazzo</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Stone Effect</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Wood Effect</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Metro</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Concrete Effect</span>
                      </RouterLink>
                    </li>
                    <li class="text-xs leading-relaxed">
                      <RouterLink to="/" class="hover:text-[#0fa897]">
                        <span>Victorian</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Colour</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Grey</li>
                    <li class="text-xs leading-relaxed">White</li>
                    <li class="text-xs leading-relaxed">Black</li>
                    <li class="text-xs leading-relaxed">Green</li>
                    <li class="text-xs leading-relaxed">Blue</li>
                    <li class="text-xs leading-relaxed">Cream</li>
                    <li class="text-xs leading-relaxed">Red</li>
                  </ul>
                </div>
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Shape</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Mosaic</li>
                    <li class="text-xs leading-relaxed">Hexagon</li>
                    <li class="text-xs leading-relaxed">Square</li>
                  </ul>
                  <h4 class="text-[#2a285a] text-base font-bold pt-4">By Finish</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Matt</li>
                    <li class="text-xs leading-relaxed">Gloss</li>
                  </ul>
                </div>
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-transparent group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Material</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Ceramic</li>
                    <li class="text-xs leading-relaxed">Porcelain</li>
                  </ul>
                  <h4 class="text-[#2a285a] text-base font-bold pt-4">By Size</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Large</li>
                  </ul>
                </div>
                <div class="absolute bottom-0 right-0">
                  <NuxtImg src="/images/menu-logo.png" :alt="$t('emptyCartImgAlt')" width="121" height="59" />
                </div>
              </div>
              <div class="w-1/6 pl-1 hidden lg:block group-hover:block">
                <div class="h-full">
                  <NuxtImg src="/images/menu-img.jpg" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Bathroom</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Kitchen</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Floor</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Wall</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Luxury Vinyl</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Laminate</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Real Wood</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Outdoor</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>New</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Adhesive</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Accessories</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Sale</span>
            </RouterLink>
          </li>
          <li
            class="flex items-center justify-center text-white text-11 lg:text-15 font-bold hover:bg-[#0fa897] flex-auto"
          >
            <RouterLink to="/" class="block py-6 px-1 text-center">
              <span>Style & Advice</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
onMounted( () => {
  window.addEventListener('scroll', updateScroll)
})
const scrollPosition = ref(null)
const updateScroll = () => {
  scrollPosition.value = window.scrollY
};
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>
