<template>
  <div>
    <div class="pt-12 mp:p-0">
      <span class="text-4xl font-bold text-primary mp:hidden"> Frequently Asked Questions </span>
    </div>
    <div class="mt-8 mb-[93px] mp:ml-4 mp:mr-4">
      <div class="flex flex-col gap-y-6 divide-y text-neutral-900">
        <SfAccordionItem
          v-for="{ id, summary, details } in accordionItems"
          :key="id"
          :model-value="isOpen(id)"
          @update:model-value="toggle(id, $event)"
        >
          <template #summary>
            <div class="flex justify-between p-4 font-medium bg-neutral-100">
              <p class="mp:w-64">{{ summary }}</p>
              <SfIconChevronLeft
                :class="['text-neutral-500', { 'rotate-90': isOpen(id), '-rotate-90': !isOpen(id) }]"
              />
            </div>
          </template>
          <div class="p-4 bg-neutral-100">
            <p class="mp:w-64">{{ details }}</p>
          </div>
        </SfAccordionItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/vue';

const opened = ref<string | null>(null);

const isOpen = (id: string) => id === opened.value;

const toggle = (id: string, open: boolean) => {
  if (open) {
    opened.value = id;
  } else if (isOpen(id)) {
    opened.value = null;
  }
};

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
