<template>
  <div
    class="fixed md:max-w-lg w-auto top-14 mt-2 md:top-20 md:right-6 lg:right-10 inset-x-2 md:left-auto font-normal"
    data-testid="notifications"
  >
    <div class="flex flex-col gap-2 items-end" v-if="isOpen && notifications.length > 0">
      <div
        role="alert"
        v-for="(notification, index) in notifications"
        :key="index"
        :class="'bg-' + notification.type + '-100 bg-' + notification.type + '-100 ring-' + notification.type + '-200'"
        class="md:items-center max-w-[600px] shadow-md pr-2 pl-4 ring-1 typography-text-sm md:typography-text-base py-1 rounded-md"
      >
        <div class="flex items-start" :class="notification.type">
          <p class="py-2 mr-2">{{ notification.message }}</p>
          <button
            type="button"
            :class="
              'text-' +
              notification.type +
              '-700 hover:bg-' +
              notification.type +
              '-200 hover:text-' +
              notification.type +
              '-800 active:bg-' +
              notification.type +
              '-300 active:text-' +
              notification.type +
              '-900'
            "
            class="p-1.5 md:p-2 ml-auto rounded-md focus-visible:outline focus-visible:outline-offset"
            aria-label="Close positive alert"
            @click="close"
          >
            <SfIconClose class="hidden md:block" />
            <SfIconClose size="sm" class="block md:hidden" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfIconClose, useDisclosure } from '@storefront-ui/vue';
import useUiNotification from '~/composables/useUiNotification/useUiNotification';

const { isOpen, close } = useDisclosure();

const { notifications } = useUiNotification();

watch(notifications.value, () => {
  isOpen.value = true;
});
</script>
