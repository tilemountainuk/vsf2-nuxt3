<template>
  <div class="px-4 md:px-0" data-testid="category-layout">
    <div class="hidden mp:flex justify-center my-10 ">
      <h1 class="font-bold  text-mobile-menu text-2xl">Floor Tiles</h1>
    </div>
  <div class="flex my-10 justify-between items-center gap-4"> 
    <div> 
      <span class="  flex justify-start items-center gap-2">
        <SfButton @click="open" variant="tertiary" class=" mp:px-0 whitespace-nowrap">
          <template #prefix>
          <SfIconTune class="fill-mobile-menu"/>
          </template>
          <p class="font-bold mp:font-medium text-mobile-menu text-lg tab:text-sm mp:text-sm  ">FIlters</p>
        </SfButton>
      </span>
    </div>
    <div class="flex mp:hidden"> 
      <h1 class="font-bold text-mobile-menu text-4xl tab:text-2xl leading-6 ">Floor Tiles</h1>
    </div>
    <div class="flex justify-end items-center gap-2 ">
      <div ref="referenceRef" class="relative flex justify-start items-center gap-1                   ">
        <div class=" hidden mp:flex whitespace-nowrap  text-mobile-menu text-sm font-medium">
          Sort by:
        </div>
        <div
          :id="id"
          ref="selectTriggerRef"
          role="combobox"
          :aria-controls="listboxId"
          :aria-expanded="IsDropdownOpen"
          aria-label="Select one option"
          :aria-activedescendant="selectedOption ? `${listboxId}-${selectedOption.value}` : undefined"
          class="flex items-center justify-between gap-8 tab:gap-6 mp:gap-1 relative whitespace-nowrap font-normal mp:font-medium typography-text-base tab:text-sm mp:text-xs text-[#18181B80] mp:text-[#71717A] ring-1 ring-neutral-300 ring-inset rounded-md md:w-[215px] mp:w-[128px] mp:min-w-[128px] mp:h-[26px] py-2 px-4 tab:py-1.5 tab:px-3 mp:py-1.5 mp:px-1.5 hover:ring-primary-700 active:ring-primary-700 active:ring-2 focus:ring-primary-700 focus:ring-2 focus-visible:outline focus-visible:outline-offset cursor-pointer"
          tabindex="0"
          @keydown.space="RecomendedDropdownToggle()"
          @click="RecomendedDropdownToggle()"
        >
          <template v-if="selectedOption">
            <span>
              {{ selectedOption.label }}
            </span>
          </template>
          <div>
            <SfIconExpandMore
            class="ml-auto text-mobile-menu mp:text-[#71717A] transition-transform ease-in-out duration-300"
            :class="{ 'rotate-180': IsDropdownOpen }"
          />
          </div>
        
        </div>
        <ul
          v-show=IsDropdownOpen
          :id="listboxId"
          ref="floatingRef"
          role="listbox"
          class=" md:w-[215px] mp:w-[128px] mp:min-w-[128px] mp:left-[54.6485px] py-2 rounded-md shadow-md border border-neutral-100 bg-white z-10"
          :style="dropdownStyle"
        >
          <SfListItem
            v-for="option in options"
            :id="`${listboxId}-${option.value}`"
            :key="option.value"
            role="option"
            tabindex="0"
            :aria-selected="option.value === selectedOption?.value"
            class="block whitespace-nowrap font-normal mp:font-medium typography-text-base tab:text-sm mp:text-xs text-[#18181B80] mp:text-[#71717A]"
            :class="{ 'font-medium': option.value === selectedOption?.value }"
            @click="selectOption(option)"
            @keydown.enter="selectOption(option)"
            @keydown.space="selectOption(option)"
          >
            {{ option.label }}
          </SfListItem>
        </ul>
      </div>
    <div>
    <span>
      <p class=" whitespace-nowrap font-bold mp:font-medium  text-lg tab:text-sm mp:text-xs text-mobile-menu"> 80 Result</p>
    </span>
  </div>
  </div>
  </div>
  <div class="md:flex gap-6" data-testid="category-page-content">
        <CategorySidebar :is-open="IsRefinebyfilteropen" @close="IsRefinebyfilterclose">
          <NuxtLazyHydrate when-visible>
            <slot name="sidebar" />
          </NuxtLazyHydrate>
        </CategorySidebar>
        <div class="flex-1">
          <section
            v-if="products"
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
            data-testid="category-grid"
          >
            <NuxtLazyHydrate
              when-visible
              v-for="({ id, name, rating, price, primaryImage, slug }, index) in products"
              :key="id"
            >
              <UiProductCard
                :name="name ?? ''"
                :rating-count="rating?.count"
                :rating="rating?.average"
                :price="price?.value.amount"
                :image-url="primaryImage?.url ?? ''"
                :image-alt="primaryImage?.alt ?? ''"
                :slug="slug"
                :priority="index === 0"
              />
            </NuxtLazyHydrate>
          </section>
          <LazyCategoryEmptyState v-else />
          <UiPagination
            v-if="totalProducts > itemsPerPage"
            :current-page="1"
            :total-items="totalProducts"
            :page-size="itemsPerPage"
            :max-visible-pages="maxVisiblePages"
          />
        </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfIconTune, useDisclosure } from '@storefront-ui/vue';
import { whenever } from '@vueuse/core';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';
import { ref, type Ref } from 'vue';
import { unrefElement } from '@vueuse/core';
import {
  useDropdown,
  SfIconExpandMore,
  SfListItem,
  SfIconCheck,
  useId,
  useTrapFocus,
} from '@storefront-ui/vue';


withDefaults(defineProps<CategoryPageContentProps>(), {
  itemsPerPage: 24,
});

const { isOpen: IsRefinebyfilteropen, open, close: IsRefinebyfilterclose } = useDisclosure();
const { isTablet, isDesktop} = useBreakpoints();

const maxVisiblePages = computed(() => (isDesktop.value ? 5 : 1));

whenever(isTablet, IsRefinebyfilterclose);

type SelectOption = {
  label: string;
  value: string;
};

const options: SelectOption[] = [
{
    label: 'Recommended',
    value: 'Recommended',
  },
  {
    label: 'Price: Low to high',
    value: 'Price: Low to high',
  },
  {
    label: 'Price: High to low',
    value: 'Price: High to low',
  },
  {
    label: 'Latest',
    value: 'Latest',
  },
];

const { close: DropdownClose, toggle: RecomendedDropdownToggle, isOpen: IsDropdownOpen } = useDisclosure({ initialValue: false });
const selectedOption = ref<SelectOption>(options[0]);
const id = useId();
const listboxId = `select-dropdown-${id}`;
const selectTriggerRef = ref<HTMLDivElement>();

const {
  referenceRef,
  floatingRef,
  style: dropdownStyle,
} = useDropdown({
  isOpen:IsDropdownOpen,
  onClose:DropdownClose,
});

useTrapFocus(floatingRef as Ref<HTMLUListElement>, {
  arrowKeysUpDown: true,
  activeState: IsDropdownOpen,
  initialFocusContainerFallback: true,
});

const selectOption = (option: SelectOption) => {
  selectedOption.value = option;
  DropdownClose();
  unrefElement(selectTriggerRef as Ref<HTMLDivElement>)?.focus();
};
</script>
