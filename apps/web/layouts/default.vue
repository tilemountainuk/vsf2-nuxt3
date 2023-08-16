<template>
  <UiNavbarTop filled>
    <SfButton
      class="!px-2 mr-auto hidden lg:flex text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
      type="button"
      variant="tertiary"
      @click="menuModalOpen"
    >
      <template #suffix>
        <SfIconExpandMore class="hidden lg:block" />
      </template>
      <span class="hidden lg:flex whitespace-nowrap">{{ $t('allProductsLinkText') }}</span>
    </SfButton>
    <nav>
      <ul>
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
              v-model="isMenuModalOpen"
              disable-click-away
              placement="top"
              class="grid grid-cols-1 md:gap-x-6 md:grid-cols-4 bg-white shadow-lg p-0 max-h-screen overflow-y-auto md:!absolute md:!top-[5rem] max-w-[376px] md:max-w-full md:p-6 mr-[50px] md:mr-0"
            >
              <div
                class="sticky top-0 flex items-center justify-between py-2 px-4 bg-primary-700 md:hidden w-full max-w-[376px]"
              >
                <div class="flex items-center typography-text-lg font-medium text-white">Browse products</div>
                <SfButton
                  square
                  variant="tertiary"
                  aria-label="Close navigation menu"
                  class="text-white ml-2"
                  @click="menuModalClose"
                  @keydown.enter.space="menuModalClose"
                >
                  <SfIconClose />
                </SfButton>
              </div>
              <div
                v-for="{ name, url_key, children } in menuCategories.children"
                :key="url_key"
                class="[&:nth-child(2)]:pt-0 pt-6 md:pt-0"
              >
                <h2
                  role="presentation"
                  class="typography-text-base font-medium text-neutral-900 whitespace-nowrap p-4 md:py-1.5"
                >
                  {{ name }}
                </h2>
                <hr class="mb-3.5" />
                <ul>
                  <li v-for="item in children" :key="item.name">
                    <SfListItem
                      :tag="NuxtLink"
                      :href="`/category/${item.url_key}`"
                      size="sm"
                      role="none"
                      class="typography-text-base font-normal text-neutral-900 md:typography-text-sm py-4 md:py-1.5"
                    >
                      {{ item.name }}
                    </SfListItem>
                  </li>
                </ul>
              </div>
              <SfButton
                square
                size="sm"
                variant="tertiary"
                aria-label="Close navigation menu"
                class="hidden md:block md:absolute md:right-0 hover:bg-white active:bg-white"
                @click="menuModalClose"
              >
                <SfIconClose class="text-neutral-500" />
              </SfButton>
            </SfDrawer>
          </transition>
        </li>
      </ul>
    </nav>
    <UiSearch class="hidden md:block flex-1" />
    <nav class="hidden md:flex md:flex-row md:flex-nowrap">
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
      <SfDropdown v-model="isAccountDropdownOpen" placement="bottom-end">
        <template #trigger>
          <SfButton
            variant="tertiary"
            class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md"
            :class="{ 'bg-primary-900': isAccountDropdownOpen }"
            @click="accountDropdownToggle()"
          >
            <template #prefix><SfIconPerson /></template>
            {{ account?.firstName }}
          </SfButton>
        </template>
        <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
          <li v-for="{ label, link } in accountDropdown" :key="label">
            <template v-if="label === 'account.logout'">
              <UiDivider class="my-2" />
              <SfListItem tag="button" class="text-left" @click="accountDropdownToggle()">{{ $t(label) }}</SfListItem>
            </template>
            <SfListItem v-else :tag="NuxtLink" :to="link" :class="{ 'bg-neutral-200': $route.path === link }">
              {{ $t(label) }}
            </SfListItem>
          </li>
        </ul>
      </SfDropdown>
    </nav>
    <SfButton
      variant="tertiary"
      class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md md:hidden"
      square
      @click="searchModalOpen"
    >
      <SfIconSearch />
    </SfButton>
  </UiNavbarTop>
  <NarrowContainer v-if="breadcrumbs">
    <div class="p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
  </NarrowContainer>
  <main>
    <slot />
  </main>
  <UiNavbarBottom />
  <UiFooter />
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
  <Notification />
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
  SfDrawer,
} from '@storefront-ui/vue';
import Notification from '~/components/ui/Notification.vue';
import { DefaultLayoutProps } from '~/layouts/types';

const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isSearchModalOpen, open: searchModalOpen, close: searchModalClose } = useDisclosure();
const { isOpen: isMenuModalOpen, open: menuModalOpen, close: menuModalClose } = useDisclosure();

defineProps<DefaultLayoutProps>();

const { fetchCard, data: cart } = useCart();
const { fetchCustomer, data: account } = useCustomer();
const { fetchAllCategories, menuCategories } = useProducts();

fetchCard();
fetchCustomer();
usePageTitle();
fetchAllCategories();

const NuxtLink = resolveComponent('NuxtLink');
const cartLineItemsCount = computed(() => cart.value?.items.length ?? 0);

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
</script>
