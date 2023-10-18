<template>
  <div>
    <div class="pt-12 mp:p-0">
      <span class="mp:hidden text-4xl tab:text-3xl font-bold text-primary"> Frequently Asked Questions </span>
    </div>
    <div class="mt-8 mb-[93px] mp:ml-4 mp:mr-4">
      <div class="flex flex-col gap-y-6 divide-y text-neutral-900">
        <SfAccordionItem
          v-for="({ id, summary, details }, index) in accordionItems"
          :key="id"
          :model-value="isTransitioning || opened[index]"
          @update:model-value="
            (isOpen) => {
              isTransitioning = true;
              opened[index] = isOpen;
            }
          "
        >
          <template #summary>
            <div class="flex justify-between p-4 font-medium bg-neutral-100">
              <p class="mp:w-64">{{ summary }}</p>
              <SfIconChevronLeft
                :class="['text-neutral-500', { 'rotate-90': opened[index], '-rotate-90': !opened[index] }]"
              />
            </div>
          </template>
          <Transition
            enter-from-class="grid grid-rows-[0fr]"
            enter-to-class="grid grid-rows-[1fr]"
            leave-from-class="grid grid-rows-[1fr]"
            leave-to-class="grid grid-rows-[0fr]"
            @after-leave="isTransitioning = false"
            @after-enter="isTransitioning = false"
          >
            <div v-if="opened[index]" class="p-4 bg-neutral-100">
              <p class="mp:w-64">{{ details }}</p>
            </div>
          </Transition>
        </SfAccordionItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/vue';
import { ref } from 'vue';

const opened = ref<boolean[]>([]);
const isTransitioning = ref(false);

const accordionItems = [
  {
    id: 'acc-1',
    summary: 'When is sample order due to arrive?',
    details:
      'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
  },
  {
    id: 'acc-2',
    summary: 'Do You offer Interest free credit?',
    details: 'Currently, we do not offer any finance options; all orders must be paid for at the point of sale.',
  },
  {
    id: 'acc-3',
    summary: 'I have damaged tiles; what do I need to do?',
    details:
      'When your order is delivered, we recommend checking all items and reporting any damaged goods to our customer service team within 48hrs. You can contact our customer service team via email at mailto:customer.service@tilemountain.co.uk or phone (01782 223822); alternatively, you can contact us via our online chat.',
  },
  {
    id: 'acc-4',
    summary: 'Where is my order?',
    details:
      'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
  },
  {
    id: 'acc-5',
    summary: 'How long does it take to get my refund?',
    details:
      'Once a refund has been processed, this can take up to 7 - 10 working days to receive the funds back within your account.',
  },
  {
    id: 'acc-6',
    summary: 'How do I cancel my order?',
    details:
      "If you made a mistake or simply changed your mind after placing an order, there's no need to fuss. As long as your parcel has yet to be picked and packed in our warehouse, you'll have the option to cancel.",
  },
  {
    id: 'acc-7',
    summary: 'Where is my order?',
    details:
      'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
  },
  {
    id: 'acc-8',
    summary: 'What if an item is out of stock?',
    details:
      "If an item you're interested in is sold out, you can register to be notified when your size is back in stock.",
  },
  {
    id: 'acc-9',
    summary: 'How do I cancel my order?',
    details:
      "If you made a mistake or simply changed your mind after placing an order, there's no need to fuss. As long as your parcel has yet to be picked and packed in our warehouse, you'll have the option to cancel.",
  },
  {
    id: 'acc-10',
    summary: 'Where is my order?',
    details:
      'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
  },
  {
    id: 'acc-11',
    summary: 'What if an item is out of stock?',
    details:
      "If an item you're interested in is sold out, you can register to be notified when your size is back in stock.",
  },
];
</script>
