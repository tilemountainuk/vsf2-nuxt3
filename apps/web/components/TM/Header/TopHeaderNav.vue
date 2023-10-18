<template>
  <nav class="flex flex-nowrap justify-end items-center gap-x-1">
    <UISFButton
        v-for="actionItem in actionItems"
        :key="actionItem.ariaLabel"
        :aria-label="actionItem.ariaLabel"
        class="text-primary-700 bg-transparent hover:bg-primary-700 hover:text-white active:bg-primary-700 active:text-white relative"
        variant="tertiary"
        square
        :tag="actionItem?.role ? actionItem?.role : undefined"
        :to="actionItem?.to !== '' ? actionItem?.to : undefined"
    >
      <template #prefix>
        <Component :is="actionItem.icon" />
      </template>
      <template v-if="actionItem.type ==='cart'">
        <div class="absolute -top-0.5 right-0 rounded-[999px] border-2 border-[#0284C7] px-1 py-[2px] flex items-start justify-center">
          <span class="text-[#0284C7] text-[8px] leading-[100%]">99+</span>
        </div>
      </template>
    </UISFButton>
  </nav>
</template>

<script setup lang="ts">
import {TMIconsLocation, TMIconsPhoneIcon} from "#components";
import {SfIconPerson, SfIconShoppingCart} from "@storefront-ui/vue";

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
    role: 'login',
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

</script>
