<template>
  <div class="w-full h-full">
    <header ref="referenceRef" class="relative">
      <div
        class="container flex justify-between items-center flex-wrap md:flex-nowrap px-4 md:px-10 py-2 md:py-5 w-full h-full border-0 bg-white border-neutral-200 md:h-20 md:z-10"
      >
        <div class="flex items-center">
          <UISFButton
            variant="tertiary"
            square
            aria-label="Close menu"
            class="block md:hidden mr-5 bg-white hover:primary-700 hover:text-white active:bg-white active:text-white"
            @click="openMenu([])"
          >
            <SfIconMenu class="text-primary-700" />
          </UISFButton>
          <NuxtLink
            :to="paths.home"
            aria-label="Sf Homepage"
            class="h-6 md:h-7 -mt-1.5 flex shrink-0 w-8 h-8 lg:w-[12.5rem] lg:h-[1.75rem] items-center mr-auto text-white md:mr-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
          >
            <TMLogo />
          </NuxtLink>
        </div>
        <TMSearch class="hidden md:flex flex-[100%] ml-10" />
        <nav class="flex flex-nowrap justify-end items-center md:ml-10 gap-x-1">
          <UISFButton
            v-for="actionItem in actionItems"
            :key="actionItem.ariaLabel"
            :aria-label="actionItem.ariaLabel"
            class="text-primary-700 bg-transparent hover:bg-primary-700 hover:text-white active:bg-primary-700 active:text-white"
            variant="tertiary"
            square
          >
            <template #prefix>
              <Component :is="actionItem.icon" />
            </template>
            <p v-if="actionItem.role === 'login'" class="hidden lg:inline-flex whitespace-nowrap mr-2">
              {{ actionItem.label }}
            </p>
          </UISFButton>
        </nav>
        <TMSearch class="flex md:hidden flex-[100%] my-2" />
      </div>
      <!-- Desktop dropdown -->
      <div class="bg-primary">
        <nav class="container" ref="floatingRef">
          <ul
            class="hidden md:flex justify-around"
            @blur="
            (event) => {
              if (!(event.currentTarget as Element).contains(event.relatedTarget as Element)) {
                close();
              }
            }
          "
          >
            <li class="py-3 hover:!bg-secondary px-1 flex-auto" v-for="(menuNode, index) in coontent.children" :key="menuNode.key">
              <UISFButton
                  ref="triggerRefs"
                  variant="tertiary"
                  class="group text-white hover:!bg-secondary active:!bg-secondary"
                  @mouseenter="openMenu([menuNode.key])"
                  @click="openMenu([menuNode.key])"
              >
                <span class="text-11 lg:text-15 font-bold">{{ menuNode.value.label }}</span>
              </UISFButton>

              <div
                :key="activeMenu.key"
                ref="megaMenuRef"
                :style="style"
                class="hidden container md:flex bg-secondary p-1 right-0 h-[370px]"
                tabindex="0"
                @mouseleave="close()"
                @keydown.esc="focusTrigger(index)"
              >
                <div class="w-full lg:w-5/6 flex flex-wrap relative pb-16">
                  <template v-for="node in activeMenu.children" :key="node.key">
                    <template v-if="node.isLeaf">
                      <UISFListItem tag="a" size="sm" :href="node.value.link" class="typography-text-sm mb-2">
                        {{ node.value.label }}
                      </UISFListItem>
                    </template>
                    <div class="bg-white pt-9 pb-6 pl-2.5 border-r-[3px] border-border flex-auto" v-else>
                      <p class="text-default text-17 py0 font-bold whitespace-nowrap">
                        {{ node.value.label }}
                      </p>
                      <ul class="mt-5">
                        <li v-for="child in node.children" :key="child.key">
                          <UISFListItem tag="a" size="sm" :href="child.value.link" class="text-13 py-0 px-0 text-black">
                            {{ child.value.label }}
                          </UISFListItem>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <div class="absolute bottom-0 right-0">
                    <NuxtImg src="/images/menu-logo.png" width="121" height="49" />
                  </div>
                </div>
                <div class="flex items-center justify-center w-1/6">
                  <NuxtImg src="/images/menu-img.jpg" class="w-full h-full object-cover" />

<!--                  <img :src="bannerNode.value.banner" :alt="bannerNode.value.bannerTitle" class="object-contain" />-->
<!--                  <p class="px-4 mt-4 mb-4 font-medium text-center typography-text-base">-->
<!--                    {{ bannerNode.value.bannerTitle }}-->
<!--                  </p>-->
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Mobile drawer -->
      <div v-if="isOpen" class="md:hidden fixed inset-0 bg-neutral-500 bg-opacity-50" />
      <SfDrawer
        ref="drawerRef"
        v-model="isOpen"
        placement="left"
        class="md:hidden right-[50px] max-w-[376px] bg-white overflow-y-auto"
      >
        <nav>
          <div class="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid">
            <p class="typography-text-base font-medium">Browse products</p>
            <UISFButton variant="tertiary" square aria-label="Close menu" class="ml-2" @click="close()">
              <SfIconClose class="text-neutral-500" />
            </UISFButton>
          </div>
          <ul class="mt-2 mb-6">
            <li v-if="activeMenu.key !== 'root'">
              <UISFListItem
                size="lg"
                tag="button"
                type="button"
                class="border-b border-b-neutral-200 border-b-solid"
                @click="goBack()"
              >
                <div class="flex items-center">
                  <SfIconArrowBack class="text-neutral-500" />
                  <p class="ml-5 font-medium">{{ activeMenu.value.label }}</p>
                </div>
              </UISFListItem>
            </li>
            <template v-for="node in activeMenu.children" :key="node.value.label">
              <li v-if="node.isLeaf">
                <UISFListItem size="lg" tag="a" :href="node.value.link" class="first-of-type:mt-2">
                  <div class="flex items-center">
                    <p class="text-left">{{ node.value.label }}</p>
                    <SfCounter class="ml-2">{{ node.value.counter }}</SfCounter>
                  </div>
                </UISFListItem>
              </li>
              <li v-else>
                <UISFListItem size="lg" tag="button" type="button" @click="goNext(node.key)">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center">
                      <p class="text-left">{{ node.value.label }}</p>
                      <SfCounter class="ml-2">{{ node.value.counter }}</SfCounter>
                    </div>
                    <SfIconChevronRight class="text-neutral-500" />
                  </div>
                </UISFListItem>
              </li>
            </template>
          </ul>
          <div
            v-if="bannerNode.value.banner"
            class="flex items-center overflow-hidden bg-neutral-100 border-neutral-300 grow"
          >
            <img
              :src="bannerNode.value.banner"
              :alt="bannerNode.value.bannerTitle"
              class="object-contain w-[50%] basis-6/12"
            />
            <p class="basis-6/12 p-6 font-medium typography-text-base">{{ bannerNode.value.bannerTitle }}</p>
          </div>
        </nav>
      </SfDrawer>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconClose,
  SfButton,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfIconMenu,
  SfCounter,
  SfIconArrowBack,
  useDisclosure,
  useTrapFocus,
  useDropdown,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import { parse } from 'node-html-parser';

interface ParseDataContent {
  content: string;
}
const props = defineProps<{
  data: ParseDataContent;
}>();
type Node = {
  key: string;
  value: {
    label: string;
    counter: number;
    link?: string;
    banner?: string;
    bannerTitle?: string;
  };
  children?: Node[];
  isLeaf: boolean;
};
const createTreeNode = (key: string, label: string, link: string, Leaf: boolean): Node => {
  return {
    key,
    value: { label, link, counter: 0, banner: '', bannerTitle: '' },
    children: [],
    isLeaf: Leaf,
  };
};
const parseData = (data: string): Node => {
  const root = parse(data);
  const menuItemListArray: Node = createTreeNode('root', '', '', false);
  if (!root) {
    return menuItemListArray;
  }
  const menuContentHtml = root.querySelectorAll('.sb-menu');
  menuContentHtml.forEach((menuItem: any) => {
    const topLevelLink = menuItem.querySelector('a.sb-forward');
    if (topLevelLink) {
      const topLevelKey = topLevelLink.rawText || '';
      const topLevelLabel = topLevelLink.rawText || '';
      const topLevelLinkValue = topLevelLink.attributes['href'] || '';
      const menuItemNode: Node = createTreeNode(topLevelKey, topLevelLabel, topLevelLinkValue, false);
      if (menuItem.querySelector('.nav-panel-dropdown')) {
        const subMenuBlocks = menuItem.querySelectorAll('.sb-height-dropdown-menu');
        subMenuBlocks.forEach((subMenuBlock: any) => {
          const subMenuLink = subMenuBlock?.querySelector('.subcag-title')?.rawText || '';
          const innerMenuItemNode: Node = createTreeNode(subMenuLink, subMenuLink, '', false);
          const bulletUl = subMenuBlock.querySelector('ul.bullet');
          const bulletLiElements = bulletUl?.querySelectorAll('li');
          bulletLiElements?.forEach((bulletLi: any) => {
            const bulletLink = bulletLi.querySelector('a');
            if (bulletLink) {
              const bulletLinkKey = bulletLink.rawText || '';
              const bulletLinkLabel = bulletLink.rawText || '';
              const bulletLinkValue = bulletLink.attributes['href'] || '';
              innerMenuItemNode.children?.push(createTreeNode(bulletLinkKey, bulletLinkLabel, bulletLinkValue, true));
            }
          });
          menuItemNode.children?.push(innerMenuItemNode);
        });
      }
      menuItemListArray.children?.push(menuItemNode);
    }
  });
  return menuItemListArray;
};
const coontent: Node = parseData(props.data.content);
const findNode = (keys: string[], node: Node): Node => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(restKeys, node.children?.find((child) => child.key === currentKey) || node);
  } else {
    return node.children?.find((child) => child.key === keys[0]) || node;
  }
};
const { close, open, isOpen } = useDisclosure();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [],
});
const drawerRef = ref();
const megaMenuRef = ref();
const triggerRefs = ref();
const activeNode = ref<string[]>([]);

const activeMenu = computed(() => findNode(activeNode.value, coontent));
const bannerNode = computed(() => findNode(activeNode.value.slice(0, 1), coontent));

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
  activeNode.value = activeNode.value.slice(0, -1);
};

const goNext = (key: string) => {
  activeNode.value = [...activeNode.value, key];
};

const focusTrigger = (index: number) => {
  unrefElement(triggerRefs.value[index]).focus();
};

const actionItems = [
  {
    icon: SfIconShoppingCart,
    label: '',
    ariaLabel: 'Cart',
    role: 'button',
  },
  {
    icon: SfIconFavorite,
    label: '',
    ariaLabel: 'Wishlist',
    role: 'button',
  },
  {
    icon: SfIconPerson,
    label: 'Log in',
    ariaLabel: 'Log in',
    role: 'login',
  },
];
</script>
