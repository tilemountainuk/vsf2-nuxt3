<template>
  <form ref="referenceRef" role="search" class="relative" @submit.prevent="submit">
    <SfInput
      ref="inputRef"
      v-model="inputModel"
      aria-label="Search"
      placeholder="Search..."
      @focus="open"
      @keydown="handleInputKeyDown"
    >
      <template #prefix><SfIconSearch /></template>
      <template #suffix>
        <button
          v-if="inputModel"
          type="button"
          aria-label="Reset search"
          class="flex rounded-md focus-visible:outline focus-visible:outline-offset"
          @click="reset"
        >
          <SfIconCancel /></button
      ></template>
    </SfInput>
    <div v-if="isOpen" ref="floatingRef" :style="style" class="left-0 right-0">
      <div
        v-if="isLoadingSnippets"
        class="flex items-center justify-center w-full h-20 py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
      >
        <SfLoaderCircular />
      </div>
      <ul
        v-else-if="snippets && snippets.length > 0"
        ref="dropdownListRef"
        class="py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
      >
        <li v-for="{ highlight, rest, product } in snippets" :key="product?.sku">
          <SfListItem
            tag="button"
            type="button"
            class="flex justify-start"
            @click="() => selectValue(product?.name)"
            @keydown.enter.space.prevent="selectValue(product?.name)"
          >
            <nuxt-link :to="getProductUrl(product?.url_key)">
              <p class="text-left text-black">
                <span>{{ highlight }}</span>
                <span class="font-medium">{{ rest }}</span>
              </p>
            </nuxt-link>
          </SfListItem>
        </li>
      </ul>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { type Ref, ref, watch } from 'vue';
import { offset } from '@floating-ui/vue';
import {
  SfIconCancel,
  SfIconSearch,
  SfInput,
  SfListItem,
  SfLoaderCircular,
  useDisclosure,
  useDropdown,
  useTrapFocus,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import { watchDebounced } from '@vueuse/shared';
import { useSearch } from '~/composables/useSearch/useSearch';

const inputModel = ref('');
const inputRef = ref();
const dropdownListRef = ref();
const isLoadingSnippets = ref(false);
const snippets: any = ref([]);
const { isOpen, close, open } = useDisclosure();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [offset(4)],
});
const { focusables: focusableElements } = useTrapFocus(dropdownListRef as Ref<HTMLElement>, {
  trapTabs: false,
  arrowKeysUpDown: true,
  activeState: isOpen,
  initialFocus: false,
});

const submit = () => {
  close();
  alert(`Search for phrase: ${inputModel.value}`);
};

const focusInput = () => {
  const inputElement = unrefElement(inputRef)?.querySelector('input');
  inputElement?.focus();
};

const reset = () => {
  inputModel.value = '';
  snippets.value = [];
  close();
  focusInput();
};

const selectValue = (phrase: string) => {
  inputModel.value = phrase;
  close();
  focusInput();
};

const handleInputKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') reset();
  if (event.key === 'ArrowUp') {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[focusableElements.value.length - 1].focus();
    }
  }
  if (event.key === 'ArrowDown') {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[0].focus();
    }
  }
};
const { searchedProducts } = useSearch();
watch(inputModel, () => {
  if (inputModel.value === '') {
    reset();
  }
});

const delay = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
watchDebounced(
  inputModel,
  () => {
    if (inputModel.value) {
      const getSnippets = async () => {
        open();
        isLoadingSnippets.value = true;
        try {
          const dataNew = await searchedProducts(inputModel.value);
          await delay();
          if (dataNew.products && dataNew.products.items) {
            snippets.value = dataNew.products.items
              .filter((product) =>
                product && product.name ? product.name.toLowerCase().startsWith(inputModel.value.toLowerCase()) : '',
              )
              .map((product) => {
                const highlight =
                  product && product.name ? product.name.slice(0, Math.max(0, inputModel.value.length)) : '';
                const rest = product && product.name ? product?.name.slice(inputModel.value.length) : '';
                const url = product?.url_key;
                return { highlight, rest, url, product };
              });
          }
          // const data = await mockAutocompleteRequest(inputModel.value);
        } catch (error) {
          close();
          console.error(error);
        }
        isLoadingSnippets.value = false;
      };

      getSnippets();
    }
  },
  { debounce: 500 },
);
const getProductUrl = (url: string) => {
  if (url) {
    return '/product/' + url;
  }
};
</script>
