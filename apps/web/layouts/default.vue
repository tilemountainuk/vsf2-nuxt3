<template>
  <UiNavbarTop filled>
    <NuxtLazyHydrate when-visible>
      <UiSearch class="hidden md:block flex-1" />
    </NuxtLazyHydrate>
    <div class="hidden md:flex md:flex-row md:flex-nowrap">
      <NuxtLazyHydrate when-visible>
        <SfButton
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-1 -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :to="paths.cart"
          :aria-label="$t('numberInCart', cartLineItemsCount)"
          variant="tertiary"
          square
        >
          <template #prefix>
            <SfIconShoppingCart />
            <SfBadge
              :content="cartLineItemsCount"
              class="outline outline-primary-700 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-900 flex justify-center"
              data-testid="cart-badge"
            />
          </template>
        </SfButton>
      </NuxtLazyHydrate>
      <NuxtLazyHydrate when-visible>
        <SfDropdown v-model="isAccountDropdownOpen" placement="bottom-end">
          <template #trigger>
            <SfButton
              variant="tertiary"
              class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md"
              :class="{ 'bg-primary-900': isAccountDropdownOpen }"
              @click="accountDropdownToggle()"
              data-testid="account-dropdown-button"
            >
              <template #prefix><SfIconPerson /></template>
              {{ account?.firstName }}
            </SfButton>
          </template>
          <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-6">
            <li v-for="{ label, link } in accountDropdown" :key="label">
              <template v-if="label === 'account.logout'">
                <UiDivider class="my-2" />
                <SfListItem
                  tag="button"
                  class="text-left"
                  @click="accountDropdownToggle()"
                  data-testid="account-dropdown-list-item"
                  >{{ $t(label) }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-neutral-200': $route.path === link }"
                data-testid="account-dropdown-list-item"
              >
                {{ $t(label) }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>
      </NuxtLazyHydrate>
    </div>
    <SfButton
      variant="tertiary"
      class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md md:hidden"
      square
      @click="searchModalOpen"
      :aria-label="$t('openSearchModalButtonLabel')"
    >
      <SfIconSearch />
    </SfButton>
  </UiNavbarTop>
  <section class="bg-[#24224d]">
    <div class="container max-w-7xl mx-auto">
      <div class="menu">
        <ul class="relative flex justify-around">
          <li class="group group-hover">
            <div
              class="flex items-center justify-center text-white text-sm font-bold flex-auto hover:bg-[#0fa897] group-hover:bg-[#0fa897]"
            >
              <RouterLink to="/" class="block py-6 px-2">
                <span>All Tiles</span>
              </RouterLink>
            </div>
            <div
              class="absolute p-1 left-0 hidden w-full bg-[#0fa897] transition-opacity duration-200 z-50 opacity-0 group-hover:opacity-100 group-hover:flex"
            >
              <div class="flex w-5/6 pb-14 relative">
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Room</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Bathroom</li>
                    <li class="text-xs leading-relaxed">Kitchen</li>
                    <li class="text-xs leading-relaxed">Hallway</li>
                    <li class="text-xs leading-relaxed">Living Room</li>
                    <li class="text-xs leading-relaxed">Outdoor</li>
                  </ul>
                  <h4 class="text-[#2a285a] text-base font-bold pt-4">By Suitability</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Wall</li>
                    <li class="text-xs leading-relaxed">Floor</li>
                  </ul>
                </div>
                <div
                  class="flex flex-col flex-auto w-1/6 p-2 bg-white pl-2 pr-2 pt-10 pb-6 border-r-4 border-[#c1c1c1] group-hover:block"
                >
                  <h4 class="text-[#2a285a] text-base font-bold">By Style</h4>
                  <ul class="pt-5">
                    <li class="text-xs leading-relaxed">Patterned</li>
                    <li class="text-xs leading-relaxed">Marble Effect</li>
                    <li class="text-xs leading-relaxed">Terrazzo</li>
                    <li class="text-xs leading-relaxed">Stone Effect</li>
                    <li class="text-xs leading-relaxed">Wood Effect</li>
                    <li class="text-xs leading-relaxed">Metro</li>
                    <li class="text-xs leading-relaxed">Concrete Effect</li>
                    <li class="text-xs leading-relaxed">Victorian</li>
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
              <div class="w-1/6 pl-1 group-hover:block">
                <div class="h-full">
                  <NuxtImg src="/images/menu-img.jpg" class="w-full h-full object-cover"/>
                </div>
              </div>
            </div>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Bathroom</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Kitchen</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Floor</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Wall</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Luxury Vinyl</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Laminate</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Real Wood</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Outdoor</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>New</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Adhesive</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Accessories</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Sale</span>
            </RouterLink>
          </li>
          <li class="flex items-center justify-center text-white text-sm font-bold hover:bg-[#0fa897] flex-auto">
            <RouterLink to="/" class="block py-6 px-2">
              <span>Style & Advice</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
 
  <NarrowContainer v-if="breadcrumbs">
    <div class="p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
  </NarrowContainer>
  <main>
    <slot />
  </main>
  <NuxtLazyHydrate when-idle>
    <UiNavbarBottom />
  </NuxtLazyHydrate>
  <NuxtLazyHydrate when-visible>
    <UiFooter />
  </NuxtLazyHydrate>
  <NuxtLazyHydrate when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <SfButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose">
          <SfIconClose class="text-neutral-500" />
        </SfButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ $t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfButton,
  SfIconExpandMore,
  SfIconShoppingCart,
  SfIconClose,
  SfIconSearch,
  SfIconPerson,
  SfDropdown,
  SfListItem,
  SfModal,
  useDisclosure,
} from '@storefront-ui/vue';
import { DefaultLayoutProps } from '~/layouts/types';

defineProps<DefaultLayoutProps>();

const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isSearchModalOpen, open: searchModalOpen, close: searchModalClose } = useDisclosure();
const { fetchCard, data: cart } = useCart();
const { fetchCustomer, data: account } = useCustomer();

fetchCard();
fetchCustomer();
usePageTitle();

const cartLineItemsCount = computed(
  () => cart.value?.lineItems.reduce((total, { quantity }) => total + quantity, 0) ?? 0,
);
const accountDropdown = [
  {
    label: 'account.heading',
    link: paths.account,
  },
  {
    label: 'account.ordersAndReturns.section.myOrders',
    link: paths.accountMyOrders,
  },
  {
    label: 'account.ordersAndReturns.section.returns',
    link: paths.accountReturns,
  },
  {
    label: 'account.logout',
    link: '/',
  },
];
const NuxtLink = resolveComponent('NuxtLink');
</script>
