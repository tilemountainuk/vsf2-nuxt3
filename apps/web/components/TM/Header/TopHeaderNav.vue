<template>
  <nav class="flex flex-nowrap justify-end items-center gap-x-1">
    <TMUISFButton
        v-for="actionItem in actionItems"
        :key="actionItem.ariaLabel"
        :aria-label="actionItem.ariaLabel"
        class="text-primary-700 bg-transparent hover:bg-primary-700 active:bg-primary-700 relative"
        variant="tertiary"
        square
        :tag="actionItem?.role ? actionItem?.role : undefined"
        :to="actionItem?.to !== '' ? actionItem?.to : undefined"
        @click="actionItem.type === 'login' ? accountDropdownToggle() : null"
    >
      <template #prefix>
        <Component :is="actionItem.icon" />
      </template>
      <template v-if="actionItem.type ==='cart'">
        <div class="absolute -top-0.5 right-0 rounded-[999px] border-2 border-[#0284C7] px-1 py-[2px] flex items-start justify-center">
          <span class="text-[#0284C7] text-[8px] leading-[100%]">99+</span>
        </div>
      </template>
      <template v-if="actionItem.type ==='login'">
        <TMUISFDropdown v-model="isAccountDropdownOpen" class="absolute z-50 w-44 md:w-full" v-if="isAccountDropdownOpen">
          <ul class="p-2 rounded bg-gray-100">
            <li><NuxtLink> <span>My Dashboard</span> </NuxtLink></li>
            <li><NuxtLink> <span>Account Information</span> </NuxtLink></li>
            <li><NuxtLink> <span>Address Book</span> </NuxtLink></li>
            <li><NuxtLink> <span>My Orders</span> </NuxtLink></li>
            <li><NuxtLink> <span>Quotations</span> </NuxtLink></li>
            <li><NuxtLink> <span>Recently Viewed Products</span> </NuxtLink></li>
          </ul>
        </TMUISFDropdown>
      </template>
    </TMUISFButton>
  </nav>
</template>

<script setup lang="ts">
import {TMIconsLocation, TMIconsPhoneIcon} from "#components";
import {SfIconPerson, SfIconShoppingCart, useDisclosure} from "@storefront-ui/vue";
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isMobile } = useBreakpoints();

const actionItems = [
  {
    icon: TMIconsPhoneIcon,
    label: '',
    ariaLabel: 'Phone',
    role: resolveComponent('NuxtLink'),
    to: '/i/contact-us',
    type:'phone'
  },
  {
    icon: TMIconsLocation,
    label: '',
    ariaLabel: 'Show Rooms',
    role: resolveComponent('NuxtLink'),
    to: '/i/showrooms_info',
    type:'showrooms'
  },
  {
    icon: SfIconPerson,
    label: 'Log in',
    ariaLabel: 'Log in',
    role: 'button',
    type:'login'
  },
  {
    icon: SfIconShoppingCart,
    label: '',
    ariaLabel: 'Cart',
    role: 'button',
    type:'cart'
  }
];
const NuxtLink = resolveComponent('NuxtLink');

</script>
