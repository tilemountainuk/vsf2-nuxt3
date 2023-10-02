<template>
  <section class="bg-[#24224d]">
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
                  <NuxtImg src="/images/menu-img.jpg" class="w-full h-full object-cover"/>
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
        <SfButton
          variant="tertiary"
          square
          aria-label="Close menu"
          class="block md:hidden mr-5 bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
          @click="openMenu([])"
        >
          <SfIconMenu class="text-white" />
        </SfButton>
        <ul class="mobile-menu block md:hidden">
          <li role="none">
            <transition
              enter-active-class="transform transition duration-500 ease-in-out"
              leave-active-class="transform transition duration-500 ease-in-out"
              enter-from-class="-translate-x-full md:translate-x-0 md:opacity-0"
              enter-to-class="translate-x-0 md:translate-x-0 md:opacity-100"
              leave-from-class="translate-x-0 md:opacity-100"
              leave-to-class="-translate-x-full md:translate-x-0 md:opacity-0"
            >
              <SfDrawer
                ref="drawerRef"
                v-model="isOpen"
                placement="left"
                class="md:hidden right-[50px] bg-white overflow-y-auto z-50 max-w-[230px] border-2 border-[#292758] bottom-auto"
              >
                <nav>
                  <!-- <div class="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid">
                    <SfButton variant="tertiary" square aria-label="Close menu" class="ml-2" @click="close()">
                      <SfIconClose class="text-neutral-500" />
                    </SfButton>
                  </div> -->
                  <ul>
                    <li v-if="activeMenu.key !== 'root'" class="py-[5px] bg-[#00a799]">
                      <SfListItem size="base" tag="button" type="button" class="pl-[12px] py-1" @click="goBack()">
                        <div class="flex items-center gap-[6px]">
                          <NuxtImg src="/icons/arrow-forward.png" class="max-w-full h-auto" />
                          <p class="text-white text-[13px] font-bold flex items-center">
                            {{ activeMenu.value.label }}
                          </p>
                        </div>
                      </SfListItem>
                    </li>
                    <template v-for="node in activeMenu.children" :key="node.value.label">
                      <li v-if="node.isLeaf" class="border-b-[1px] border-[#f2f2f2] py-[3px]">
                        <SfListItem size="sm" tag="a" class="pl-[25px]" :href="node.value.link">
                          <div class="flex items-center">
                            <p class="text-left text-[#434343] text-[11px] font-bold">{{ node.value.label }}</p>
                          </div>
                        </SfListItem>
                      </li>
                      <li class="border-b-[1px] border-[#f2f2f2] py-[3px]" v-else>
                        <SfListItem size="sm" tag="button" type="button" class="pl-[25px]" @click="goNext(node.key)">
                          <div class="flex justify-between items-center">
                            <div class="flex items-center">
                              <p class="text-left text-[#434343] text-[11px] font-bold">{{ node.value.label }}</p>
                            </div>
                            <NuxtImg src="/icons/right-arrow.png" class="max-w-full h-auto" />
                          </div>
                        </SfListItem>
                      </li>
                    </template>
                  </ul>
                </nav>
              </SfDrawer>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { SfButton, SfDrawer, SfListItem, SfIconMenu, useDisclosure, useTrapFocus } from '@storefront-ui/vue';

const findNode = (keys: string[], node: Node): Node => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(restKeys, node.children?.find((child) => child.key === currentKey) || node);
  } else {
    return node.children?.find((child) => child.key === keys[0]) || node;
  }
};

const { close, open, isOpen } = useDisclosure();

const drawerRef = ref();
const megaMenuRef = ref();
const activeNode = ref<string[]>([]);

const activeMenu = computed(() => findNode(activeNode.value, content));

const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
} as const;
useTrapFocus(
  computed(() => megaMenuRef.value?.[0]),
  trapFocusOptions,
);
useTrapFocus(drawerRef, trapFocusOptions);

const openMenu = (menuType: string[]) => {
  activeNode.value = menuType;
  open();
};

const goBack = () => {
  activeNode.value = activeNode.value.slice(0, activeNode.value.length - 1);
};

const goNext = (key: string) => {
  activeNode.value = [...activeNode.value, key];
};
const content: Node = {
  key: 'root',
  value: { label: '', counter: 0 },
  isLeaf: false,
  children: [
    {
      key: 'WOMEN',
      value: {
        label: 'Women',
        counter: 515,
        banner: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/glasses.png',
        bannerTitle: 'The world in a new light',
      },
      isLeaf: false,
      children: [
        {
          key: 'ALL_WOMEN',
          value: { label: "All Women's", counter: 515, link: '#' },
          isLeaf: true,
        },
        {
          key: 'CATEGORIES',
          value: { label: 'Categories', counter: 178 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_CATEGORIES',
              value: { label: 'All Categories', counter: 178, link: '#' },
              isLeaf: true,
            },
            {
              key: 'CLOTHING',
              value: { label: 'Clothing', counter: 30, link: '#' },
              isLeaf: true,
            },
            {
              key: 'SHOES',
              value: { label: 'Shoes', counter: 28, link: '#' },
              isLeaf: true,
            },
            {
              key: 'ACCESSORIES',
              value: { label: 'Accessories', counter: 56, link: '#' },
              isLeaf: true,
            },
            {
              key: 'WEARABLES',
              value: { label: 'Wearables', counter: 12, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FOOD_DRINKS',
              value: { label: 'Food & Drinks', counter: 52, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'ACTIVITIES',
          value: { label: 'Activities', counter: 239 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_ACTIVITIES',
              value: { label: 'All Activities', counter: 239, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FITNESS',
              value: { label: 'Fitness', counter: 83, link: '#' },
              isLeaf: true,
            },
            {
              key: 'PILATES',
              value: { label: 'Pilates', counter: 65, link: '#' },
              isLeaf: true,
            },
            {
              key: 'TRAINING',
              value: { label: 'Training', counter: 21, link: '#' },
              isLeaf: true,
            },
            {
              key: 'CARDIO_WORKOUT',
              value: { label: 'Cardio Workout', counter: 50, link: '#' },
              isLeaf: true,
            },
            {
              key: 'YOGA',
              value: { label: 'Yoga', counter: 20, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'DEALS',
          value: { label: 'Deals', counter: 98 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_DEALS',
              value: { label: 'All Deals', counter: 98, link: '#' },
              isLeaf: true,
            },
            {
              key: 'OUTLET',
              value: { label: 'Outlet', counter: 98, link: '#' },
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      key: 'MEN',
      value: {
        label: 'Men',
        counter: 364,
        banner: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/watch.png',
        bannerTitle: 'New in designer watches',
      },
      isLeaf: false,
      children: [
        {
          key: 'ALL_MEN',
          value: { label: "All Men's", counter: 364, link: '#' },
          isLeaf: true,
        },
        {
          key: 'CATEGORIES',
          value: { label: 'Categories', counter: 164 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_CATEGORIES',
              value: { label: 'All Categories', counter: 164, link: '#' },
              isLeaf: true,
            },
            {
              key: 'CLOTHING',
              value: { label: 'Clothing', counter: 41, link: '#' },
              isLeaf: true,
            },
            {
              key: 'SHOES',
              value: { label: 'Shoes', counter: 20, link: '#' },
              isLeaf: true,
            },
            {
              key: 'ACCESSORIES',
              value: { label: 'Accessories', counter: 56, link: '#' },
              isLeaf: true,
            },
            {
              key: 'WEARABLES',
              value: { label: 'Wearables', counter: 32, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FOOD_DRINKS',
              value: { label: 'Food & Drinks', counter: 15, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'ACTIVITIES',
          value: { label: 'Activities', counter: 132 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_ACTIVITIES',
              value: { label: 'All Activities', counter: 132, link: '#' },
              isLeaf: true,
            },
            {
              key: 'TRAINING',
              value: { label: 'Training', counter: 21, link: '#' },
              isLeaf: true,
            },
            {
              key: 'WORKOUT',
              value: { label: 'Workout', counter: 43, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FOOTBALL',
              value: { label: 'Football', counter: 30, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FITNESS',
              value: { label: 'Fitness', counter: 38, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'DEALS',
          value: { label: 'Deals', counter: 68 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_DEALS',
              value: { label: 'All Deals', counter: 68, link: '#' },
              isLeaf: true,
            },
            {
              key: 'OUTLET',
              value: { label: 'Outlet', counter: 68, link: '#' },
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      key: 'KIDS',
      value: {
        label: 'Kids',
        counter: 263,
        banner: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/toy.png',
        bannerTitle: 'Unleash your imagination',
      },
      isLeaf: false,
      children: [
        {
          key: 'ALL_KIDS',
          value: { label: 'All Kids', counter: 263, link: '#' },
          isLeaf: true,
        },
        {
          key: 'CATEGORIES',
          value: { label: 'Categories', counter: 192 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_CATEGORIES',
              value: { label: 'All Categories', counter: 192, link: '#' },
              isLeaf: true,
            },
            {
              key: 'CLOTHING',
              value: { label: 'Clothing', counter: 29, link: '#' },
              isLeaf: true,
            },
            {
              key: 'SHOES',
              value: { label: 'Shoes', counter: 60, link: '#' },
              isLeaf: true,
            },
            {
              key: 'ACCESSORIES',
              value: { label: 'Accessories', counter: 48, link: '#' },
              isLeaf: true,
            },
            {
              key: 'WEARABLES',
              value: { label: 'Wearables', counter: 22, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FOOD_DRINKS',
              value: { label: 'Food & Drinks', counter: 33, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'ACTIVITIES',
          value: { label: 'Activities', counter: 40 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_ACTIVITIES',
              value: { label: 'All Activities', counter: 40, link: '#' },
              isLeaf: true,
            },
            {
              key: 'FOOTBALL',
              value: { label: 'Football', counter: 21, link: '#' },
              isLeaf: true,
            },
            {
              key: 'BASKETBALL',
              value: { label: 'Basketball', counter: 19, link: '#' },
              isLeaf: true,
            },
          ],
        },
        {
          key: 'DEALS',
          value: { label: 'Deals', counter: 31 },
          isLeaf: false,
          children: [
            {
              key: 'ALL_DEALS',
              value: { label: 'All Deals', counter: 31, link: '#' },
              isLeaf: true,
            },
            {
              key: 'OUTLET',
              value: { label: 'Outlet', counter: 31, link: '#' },
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ],
};
</script>
