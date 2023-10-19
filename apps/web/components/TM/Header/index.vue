<template>
  <header ref="referenceRef" class="relative bg-menuBackground">
    <div class="container md:h-20 flex justify-between items-center gap-2 md:gap-10 flex-wrap md:flex-nowrap py-2 px-4 md:py-2 md:px-4 md:z-10">
      <div class="flex gap-4 md:gap-0 items-center">

        <NuxtLink
            :to="paths.home"
            aria-label="Sf Homepage"
            class="flex items-center"
        >
          <TMIconsLogo class="w-20 h-9 md:w-auto md:h-auto"/>
        </NuxtLink>
      </div>
      <TMHeaderSearch class="hidden md:flex flex-[100%] ml-10" />
      <TMHeaderTopHeaderNav />
      <div class="flex items-center justify-between w-full flex-[100%] md:hidden">
        <TMUISFButton
            variant="tertiary"
            square
            aria-label="Close menu"
            class="block md:hidden bg-menuBackground hover:primary-700 hover:text-white active:bg-white active:text-white"
            @click="openMenu([])"
        >
          <SfIconMenu />
        </TMUISFButton>
        <TMHeaderSearch class="flex flex-[100%] my-2" />
      </div>
    </div>
    <!-- Desktop dropdown -->
    <div class="bg-primary w-full" :class="{'md:fixed z-50 md:top-0': scrollPosition > 95,'relative': scrollPosition < 95}">
      <nav class="container relative" ref="floatingRef">
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
          <li class="py-2.5 hover:!bg-secondary px-1 flex-auto rounded-md text-center" v-for="(menuNode, index) in coontent.children" :key="menuNode.key">
            <TMUISFButton
                ref="triggerRefs"
                variant="tertiary"
                class="group text-white hover:!bg-secondary active:!bg-secondary"
                @mouseenter="openMenu([menuNode.key])"
                @click="openMenu([menuNode.key])"
            >
              <span class="text-[10px] 2md:text-xs lg:!text-sm xl:!text-base font-medium" v-html="menuNode.value.label"></span>
            </TMUISFButton>
            <div
                v-if="isOpen && activeNode.length === 1 && activeNode[0] === menuNode.key && activeMenuChildrenLength > 0"
                :key="activeMenu.key"
                ref="megaMenuRef"
                class="hidden container md:flex gap-4 bg-white mt-[1px] px-8 py-4 left-0 right-0 outline-none absolute top-[99%] z-50"
                tabindex="0"
                @mouseleave="close()"
                @keydown.esc="focusTrigger(index)"
            >
              <template v-for="node in activeMenu.children" :key="node.key">
                <template v-if="node.isLeaf">
                  <SfListItem tag="a" size="sm" :href="node.value.link" class="typography-text-sm mb-2">
                    {{ node.value.label }}
                  </SfListItem>
                  <div class="col-start-2 col-end-5" />
                </template>
                <div class="flex items-start flex-col flex-auto" v-else>
                  <div class=" border-b border-b-[#E4E4E7] border-b-solid w-full px-4 py-1.5">
                    <p class="text-xs 2md:text-sm font-medium text-menu text-left" v-html="node.value.label"></p>
                  </div>
                  <ul class="mt-2">
                    <li v-for="child in node.children" :key="child.key">
                      <TMUISFListItem tag="a" size="sm" :href="child.value.link" class="text-xs 2md:text-sm py-1.5 text-left pl-4 pr-1">
                        {{ child.value.label }}
                      </TMUISFListItem>
                    </li>
                  </ul>
                </div>
              </template>
              <div class="hidden 2md:flex flex-col items-center justify-center overflow-hidden rounded-md border-neutral-300 max-w-[245px] w-full">
                <img :src="bannerNode.value.banner" :alt="bannerNode.value.bannerTitle" class="object-contain" />
                <p class="px-4 mt-4 mb-4 font-medium text-center typography-text-base">
                  {{ bannerNode.value.bannerTitle }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- Mobile drawer -->
    <div v-if="isOpen" class="md:hidden fixed inset-0 bg-neutral-500 bg-opacity-50" />
    <transition
        enter-active-class="transition duration-500 ease-in-out"
        leave-active-class="transition duration-500 ease-in-out"
        :enter-from-class="placement === 'left' ? '-translate-x-full' : 'translate-x-full'"
        :enter-to-class="placement === 'left' ? 'translate-x-0' : 'translate-x-0'"
        :leave-from-class="placement === 'left' ? 'translate-x-0' : 'translate-x-0'"
        :leave-to-class="placement === 'left' ? '-translate-x-full' : 'translate-x-full'"
    >
      <SfDrawer
          ref="drawerRef"
          v-model="isOpen"
          :placement="placement"
          class="md:hidden right-[50px] max-w-[304px] bg-mobile-menu overflow-y-auto z-50"
      >
        <nav>
          <div class="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid" :class="{ 'bg-mobileMenuBackground': activeMenu.key !== 'root' }">
            <div class="flex items-center gap-4">
              <div class="flex items-center" v-if="activeMenu.key !== 'root'" @click="goBack()">
                <SfIconArrowBack class="text-white" />
              </div>
              <NuxtLink v-if="activeMenu.key !== 'root'" :to="activeMenu.value.link" @click="close()">
                <span class="text-lg font-bold text-white">{{menuTitle}}</span>
              </NuxtLink>
              <p class="text-lg font-bold text-white" v-else>{{ menuTitle }}</p>
            </div>
            <TMUISFButton variant="tertiary" square aria-label="Close menu" class="pr-0" @click="close()">
              <TMIconsMenuClose />
            </TMUISFButton>
          </div>
          <ul class="mt-2 mb-6 px-4">
            <template v-for="node in activeMenu.children" :key="node.value.label">
              <li class="py-4" v-if="node.isLeaf">
                <TMUISFListItem size="lg" :tag="resolvedComponents" :to="node.value.link" @click="close()" class="first-of-type:mt-2">
                  <div class="flex items-center">
                    <p class="text-left text-white">{{ node.value.label }}</p>
                    <SfCounter class="ml-2">{{ node.value.counter }}</SfCounter>
                  </div>
                </TMUISFListItem>
              </li>
              <li class="py-4" v-else>
                <TMUISFListItem size="lg">
                  <div class="flex items-center">
                    <div class="flex items-center flex-auto">
                      <NuxtLink :to="node.value.link" @click="close()">
                        <span class="text-left text-white text-sm font-medium">{{ node.value.label }}</span>
                        <SfCounter class="ml-2">{{ node.value.counter }}</SfCounter>
                      </NuxtLink>
                    </div>
                    <TMIconsChevronRight @click="goNext(node.key)" />
                  </div>
                </TMUISFListItem>
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
    </transition>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  SfIconShoppingCart,
  SfIconPerson,
  SfDrawer,
  SfListItem,
  SfIconMenu,
  SfCounter,
  SfIconArrowBack,
  SfDrawerPlacement,
  useDisclosure,
  useTrapFocus,
  useDropdown,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import { parse } from 'node-html-parser';

interface ParseDataContent {
  content: string;
}

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
const placement = ref<`${SfDrawerPlacement}`>('left');

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
const coontent: Node = {
  "key": "root",
  "value": {
    "label": "",
    "link": "",
    "counter": 0,
    "banner": "",
    "bannerTitle": ""
  },
  "children": [
    {
      "key": "All Tiles",
      "value": {
        "label": "All Tiles",
        "link": "/all-tiles-collection.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "By Room",
          "value": {
            "label": "By Room",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Bathroom",
              "value": {
                "label": "Bathroom",
                "link": "/bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Kitchen",
              "value": {
                "label": "Kitchen",
                "link": "/kitchen-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Hallway",
              "value": {
                "label": "Hallway",
                "link": "/hallway-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Living Room",
              "value": {
                "label": "Living Room",
                "link": "/living-room-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Outdoor",
              "value": {
                "label": "Outdoor",
                "link": "/outdoor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "By Suitability",
              "value": {
                "label": "By Suitability",
                "link": "/wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Wall",
              "value": {
                "label": "Wall",
                "link": "/wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Floor",
              "value": {
                "label": "Floor",
                "link": "/floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Suitability",
          "value": {
            "label": "By Suitability",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Wall",
              "value": {
                "label": "Wall",
                "link": "/wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Floor",
              "value": {
                "label": "Floor",
                "link": "/floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Style",
          "value": {
            "label": "By Style",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Patterned",
              "value": {
                "label": "Patterned",
                "link": "/patterned-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Marble Effect",
              "value": {
                "label": "Marble Effect",
                "link": "/marble-tiles/marble-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Terrazzo",
              "value": {
                "label": "Terrazzo",
                "link": "/terrazzo-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Stone Effect",
              "value": {
                "label": "Stone Effect",
                "link": "/stone-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Wood Effect",
              "value": {
                "label": "Wood Effect",
                "link": "/wood-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Metro",
              "value": {
                "label": "Metro",
                "link": "/metro-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Concrete Effect",
              "value": {
                "label": "Concrete Effect",
                "link": "/concrete-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Victorian",
              "value": {
                "label": "Victorian",
                "link": "/victorian-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/tile-colours/grey-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/tile-colours/white-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Black",
              "value": {
                "label": "Black",
                "link": "/tile-colours/black-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Green",
              "value": {
                "label": "Green",
                "link": "/tile-colours/green-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Blue",
              "value": {
                "label": "Blue",
                "link": "/tile-colours/blue-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cream",
              "value": {
                "label": "Cream",
                "link": "/tile-colours/cream-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Red",
              "value": {
                "label": "Red",
                "link": "/tile-colours/red-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Shape",
          "value": {
            "label": "By Shape",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Mosaic",
              "value": {
                "label": "Mosaic",
                "link": "/mosaic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Hexagon",
              "value": {
                "label": "Hexagon",
                "link": "/hexagon-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Square",
              "value": {
                "label": "Square",
                "link": "/square-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "By Finish",
              "value": {
                "label": "By Finish",
                "link": "",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Matt",
              "value": {
                "label": "Matt",
                "link": "/matt-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Gloss",
              "value": {
                "label": "Gloss",
                "link": "/gloss-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Finish",
          "value": {
            "label": "By Finish",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Matt",
              "value": {
                "label": "Matt",
                "link": "/matt-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Gloss",
              "value": {
                "label": "Gloss",
                "link": "/gloss-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Material",
          "value": {
            "label": "By Material",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Ceramic",
              "value": {
                "label": "Ceramic",
                "link": "/ceramic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Porcelain",
              "value": {
                "label": "Porcelain",
                "link": "/porcelain-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "By Size",
              "value": {
                "label": "By Size",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Large",
              "value": {
                "label": "Large",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Size",
          "value": {
            "label": "By Size",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Large",
              "value": {
                "label": "Large",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": "Bathroom",
      "value": {
        "label": "Bathroom",
        "link": "/bathroom-tiles.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "Tile Type",
          "value": {
            "label": "Tile Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Wall",
              "value": {
                "label": "Wall",
                "link": "/bathroom-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Floor",
              "value": {
                "label": "Floor",
                "link": "/bathroom-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Bathroom",
              "value": {
                "label": "Bathroom",
                "link": "/large-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Non Slip",
              "value": {
                "label": "Non Slip",
                "link": "/non-slip-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Encaustic",
              "value": {
                "label": "Encaustic",
                "link": "/encaustic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Large Format",
              "value": {
                "label": "Large Format",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Material",
          "value": {
            "label": "By Material",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Ceramic",
              "value": {
                "label": "Ceramic",
                "link": "/ceramic-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Glass",
              "value": {
                "label": "Glass",
                "link": "/glass-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Porcelain",
              "value": {
                "label": "Porcelain",
                "link": "/porcelain-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mosaic",
              "value": {
                "label": "Mosaic",
                "link": "/mosaic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Quartz",
              "value": {
                "label": "Quartz",
                "link": "/quartz-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Natural Stone",
              "value": {
                "label": "Natural Stone",
                "link": "/natural-stone-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Beige",
              "value": {
                "label": "Beige",
                "link": "/beige-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Black",
              "value": {
                "label": "Black",
                "link": "/black-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cream",
              "value": {
                "label": "Cream",
                "link": "/cream-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/white-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/grey-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Budget",
          "value": {
            "label": "By Budget",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Luxury",
              "value": {
                "label": "Luxury",
                "link": "/luxury-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mid Range",
              "value": {
                "label": "Mid Range",
                "link": "/mid-range-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Value",
              "value": {
                "label": "Value",
                "link": "/value-bathroom-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "More Flooring",
          "value": {
            "label": "More Flooring",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "LVT",
              "value": {
                "label": "LVT",
                "link": "/flooring/lvt-bathroom-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Laminate",
              "value": {
                "label": "Laminate",
                "link": "/flooring/laminate-bathroom-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": "Kitchen",
      "value": {
        "label": "Kitchen",
        "link": "/kitchen-tiles.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "Tile Type",
          "value": {
            "label": "Tile Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Wall",
              "value": {
                "label": "Wall",
                "link": "/kitchen-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Floor",
              "value": {
                "label": "Floor",
                "link": "/kitchen-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Encaustic",
              "value": {
                "label": "Encaustic",
                "link": "/encaustic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Large Format",
              "value": {
                "label": "Large Format",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Material",
          "value": {
            "label": "By Material",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Ceramic",
              "value": {
                "label": "Ceramic",
                "link": "/ceramic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Glass",
              "value": {
                "label": "Glass",
                "link": "/glass-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mosaic",
              "value": {
                "label": "Mosaic",
                "link": "/mosaic-kitchen-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Porcelain",
              "value": {
                "label": "Porcelain",
                "link": "/porcelain-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Quartz",
              "value": {
                "label": "Quartz",
                "link": "/quartz-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Natural Stone",
              "value": {
                "label": "Natural Stone",
                "link": "/natural-stone-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Slate",
              "value": {
                "label": "Slate",
                "link": "/slate-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Beige",
              "value": {
                "label": "Beige",
                "link": "/tile-colours/beige-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Black",
              "value": {
                "label": "Black",
                "link": "/tile-colours/black-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cream",
              "value": {
                "label": "Cream",
                "link": "/tile-colours/cream-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/tile-colours/grey-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/tile-colours/white-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Budget",
          "value": {
            "label": "By Budget",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Luxury",
              "value": {
                "label": "Luxury",
                "link": "/luxury-kitchen-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mid Range",
              "value": {
                "label": "Mid Range",
                "link": "/mid-range-kitchen-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Value",
              "value": {
                "label": "Value",
                "link": "/value-kitchen-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "More Flooring",
          "value": {
            "label": "More Flooring",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "LVT",
              "value": {
                "label": "LVT",
                "link": "/flooring/lvt-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Laminate",
              "value": {
                "label": "Laminate",
                "link": "/flooring/laminate-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Engineered Wood",
              "value": {
                "label": "Engineered Wood",
                "link": "/flooring/engineered-real-wood-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": "Floor",
      "value": {
        "label": "Floor",
        "link": "/floor-tiles.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "Tile Type",
          "value": {
            "label": "Tile Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Cheap",
              "value": {
                "label": "Cheap",
                "link": "/value-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Patterned",
              "value": {
                "label": "Patterned",
                "link": "/patterned-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Encaustic",
              "value": {
                "label": "Encaustic",
                "link": "/encaustic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Large Format",
              "value": {
                "label": "Large Format",
                "link": "/large-format-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Luxury Vinyl",
              "value": {
                "label": "Luxury Vinyl",
                "link": "/luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Material",
          "value": {
            "label": "By Material",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Porcelain",
              "value": {
                "label": "Porcelain",
                "link": "/porcelain-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Outdoor",
              "value": {
                "label": "Outdoor",
                "link": "/outdoor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Ceramic",
              "value": {
                "label": "Ceramic",
                "link": "/ceramic-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Glass",
              "value": {
                "label": "Glass",
                "link": "/glass-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Quartz",
              "value": {
                "label": "Quartz",
                "link": "/quartz-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Quarry",
              "value": {
                "label": "Quarry",
                "link": "/quarry-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Luxury Vinyl",
              "value": {
                "label": "Luxury Vinyl",
                "link": "/luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Beige",
              "value": {
                "label": "Beige",
                "link": "/tile-colours/beige-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Black",
              "value": {
                "label": "Black",
                "link": "/tile-colours/black-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cream",
              "value": {
                "label": "Cream",
                "link": "/tile-colours/cream-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/tile-colours/grey-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/tile-colours/white-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "Special Features",
          "value": {
            "label": "Special Features",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Concrete Effect",
              "value": {
                "label": "Concrete Effect",
                "link": "/concrete-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Marble Effect",
              "value": {
                "label": "Marble Effect",
                "link": "/marble-tiles/marble-effect-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Natural Stone",
              "value": {
                "label": "Natural Stone",
                "link": "/natural-stone-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Outdoor",
              "value": {
                "label": "Outdoor",
                "link": "/outdoor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Paving Slabs",
              "value": {
                "label": "Paving Slabs",
                "link": "/paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Stone Effect",
              "value": {
                "label": "Stone Effect",
                "link": "/tile-colours/stone-effect-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Wood Effect",
              "value": {
                "label": "Wood Effect",
                "link": "/wood-effect-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Non Slip",
              "value": {
                "label": "Non Slip",
                "link": "/non-slip-floor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "More Flooring",
          "value": {
            "label": "More Flooring",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "LVT",
              "value": {
                "label": "LVT",
                "link": "/flooring/luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Laminate",
              "value": {
                "label": "Laminate",
                "link": "/flooring/laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Real Wood",
              "value": {
                "label": "Real Wood",
                "link": "/flooring/real-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " Wall",
      "value": {
        "label": " Wall",
        "link": "/wall-tiles.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "Tile Type",
          "value": {
            "label": "Tile Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Brick",
              "value": {
                "label": "Brick",
                "link": "/brick-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Patterned",
              "value": {
                "label": "Patterned",
                "link": "/patterned-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Encaustic",
              "value": {
                "label": "Encaustic",
                "link": "/encaustic-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Material",
          "value": {
            "label": "By Material",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Porcelain",
              "value": {
                "label": "Porcelain",
                "link": "/porcelain-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Ceramic",
              "value": {
                "label": "Ceramic",
                "link": "/ceramic-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mosaic",
              "value": {
                "label": "Mosaic",
                "link": "/mosaic-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Quartz",
              "value": {
                "label": "Quartz",
                "link": "/quartz-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Natural Stone",
              "value": {
                "label": "Natural Stone",
                "link": "/natural-stone-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Beige",
              "value": {
                "label": "Beige",
                "link": "/beige-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Black",
              "value": {
                "label": "Black",
                "link": "/black-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cream",
              "value": {
                "label": "Cream",
                "link": "/wall-tiles-by-colour/cream-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/wall-tiles-by-colour/grey-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/wall-tiles-by-colour/white-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Budget",
          "value": {
            "label": "By Budget",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Luxury",
              "value": {
                "label": "Luxury",
                "link": "/luxury-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Mid Range",
              "value": {
                "label": "Mid Range",
                "link": "/mid-range-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cheap",
              "value": {
                "label": "Cheap",
                "link": "/value-wall-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "Tile Accessories",
          "value": {
            "label": "Tile Accessories",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Adhesive &amp; Grout",
              "value": {
                "label": "Adhesive &amp; Grout",
                "link": "/adhesive-grout.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Sealing &amp; Cleaning",
              "value": {
                "label": "Sealing &amp; Cleaning",
                "link": "/sealing-and-cleaning.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Tiling Tools",
              "value": {
                "label": "Tiling Tools",
                "link": "/tiling-tools.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Underfloor Heating",
              "value": {
                "label": "Underfloor Heating",
                "link": "/underfloor-heating.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " Luxury Vinyl",
      "value": {
        "label": " Luxury Vinyl",
        "link": "/flooring/luxury-vinyl-flooring.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "By Type",
          "value": {
            "label": "By Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "All Luxury Vinyl",
              "value": {
                "label": "All Luxury Vinyl",
                "link": "/flooring/luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Fully Recyclable",
              "value": {
                "label": "Fully Recyclable",
                "link": "/flooring/eco-friendly-flooring/fully-recyclable-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Click",
              "value": {
                "label": "Click",
                "link": "/flooring/click-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Glue Down",
              "value": {
                "label": "Glue Down",
                "link": "/flooring/glue-down-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Rigid SPC",
              "value": {
                "label": "Rigid SPC",
                "link": "/flooring/rigid-spc-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "In-Built Underlay",
              "value": {
                "label": "In-Built Underlay",
                "link": "/flooring/in-built-underlay-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/flooring/grey-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Light",
              "value": {
                "label": "Light",
                "link": "/flooring/light-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Natural",
              "value": {
                "label": "Natural",
                "link": "/flooring/natural-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/flooring/white-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Dark",
              "value": {
                "label": "Dark",
                "link": "/flooring/dark-luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Style",
          "value": {
            "label": "By Style",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Oak Effect",
              "value": {
                "label": "Oak Effect",
                "link": "/flooring/oak-effect-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Stone Effect",
              "value": {
                "label": "Stone Effect",
                "link": "/flooring/stone-effect-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Herringbone",
              "value": {
                "label": "Herringbone",
                "link": "/flooring/herringbone-luxury-vinyl-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Room",
          "value": {
            "label": "By Room",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Kitchen",
              "value": {
                "label": "Kitchen",
                "link": "/flooring/lvt-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Bedroom",
              "value": {
                "label": "Bedroom",
                "link": "/flooring/bedroom-lvt-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Bathroom",
              "value": {
                "label": "Bathroom",
                "link": "/flooring/lvt-bathroom-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Format",
          "value": {
            "label": "By Format",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Tiles",
              "value": {
                "label": "Tiles",
                "link": "/flooring/vinyl-flooring-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Planks",
              "value": {
                "label": "Planks",
                "link": "/flooring/vinyl-flooring-planks.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " Laminate ",
      "value": {
        "label": " Laminate ",
        "link": "/flooring/laminate-flooring.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "By Type",
          "value": {
            "label": "By Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "All Laminate",
              "value": {
                "label": "All Laminate",
                "link": "/flooring/laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Planks",
              "value": {
                "label": "Planks",
                "link": "/flooring/laminate-flooring-planks.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Luxury",
              "value": {
                "label": "Luxury",
                "link": "/flooring/luxury-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Tiles",
              "value": {
                "label": "Tiles",
                "link": "/flooring/laminate-flooring-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Extra Durable",
              "value": {
                "label": "Extra Durable",
                "link": "/flooring/extra-durable-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Natural",
              "value": {
                "label": "Natural",
                "link": "/flooring/natural-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Dark",
              "value": {
                "label": "Dark",
                "link": "/flooring/dark-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Light",
              "value": {
                "label": "Light",
                "link": "/flooring/light-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/flooring/white-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/flooring/grey-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Style",
          "value": {
            "label": "By Style",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Gloss",
              "value": {
                "label": "Gloss",
                "link": "/flooring/gloss-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Herringbone",
              "value": {
                "label": "Herringbone",
                "link": "/flooring/herringbone-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Stone Effect",
              "value": {
                "label": "Stone Effect",
                "link": "/flooring/stone-effect-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Patterned",
              "value": {
                "label": "Patterned",
                "link": "/flooring/patterned-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Oak Effect",
              "value": {
                "label": "Oak Effect",
                "link": "/flooring/oak-effect-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Room",
          "value": {
            "label": "By Room",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Bathroom",
              "value": {
                "label": "Bathroom",
                "link": "/flooring/laminate-bathroom-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Hallway",
              "value": {
                "label": "Hallway",
                "link": "/flooring/hallway-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Bedroom",
              "value": {
                "label": "Bedroom",
                "link": "/flooring/bedroom-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Kitchen",
              "value": {
                "label": "Kitchen",
                "link": "/flooring/laminate-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Thickness",
          "value": {
            "label": "By Thickness",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "7mm",
              "value": {
                "label": "7mm",
                "link": "/flooring/7mm-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "8mm",
              "value": {
                "label": "8mm",
                "link": "/flooring/8mm-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "10mm",
              "value": {
                "label": "10mm",
                "link": "/flooring/10mm-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "12mm",
              "value": {
                "label": "12mm",
                "link": "/flooring/12mm-laminate-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " Real Wood ",
      "value": {
        "label": " Real Wood ",
        "link": "/flooring/real-wood-flooring.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "By Type",
          "value": {
            "label": "By Type",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "All Real Wood",
              "value": {
                "label": "All Real Wood",
                "link": "/flooring/real-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Herringbone",
              "value": {
                "label": "Herringbone",
                "link": "/flooring/herringbone-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Engineered",
              "value": {
                "label": "Engineered",
                "link": "/flooring/engineered-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Parquet",
              "value": {
                "label": "Parquet",
                "link": "/flooring/parquet-real-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Planks",
              "value": {
                "label": "Planks",
                "link": "/flooring/wood-flooring-planks.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "3 Strip",
              "value": {
                "label": "3 Strip",
                "link": "/flooring/3-strip-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Natural",
              "value": {
                "label": "Natural",
                "link": "/flooring/natural-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Dark",
              "value": {
                "label": "Dark",
                "link": "/flooring/dark-real-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Light",
              "value": {
                "label": "Light",
                "link": "/flooring/light-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Finish",
          "value": {
            "label": "By Finish",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Lacquered",
              "value": {
                "label": "Lacquered",
                "link": "/flooring/lacquered-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Oiled",
              "value": {
                "label": "Oiled",
                "link": "/flooring/oiled-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Room",
          "value": {
            "label": "By Room",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Engineered",
              "value": {
                "label": "Engineered",
                "link": "/flooring/engineered-real-wood-kitchen-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Thickness",
          "value": {
            "label": "By Thickness",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "14mm",
              "value": {
                "label": "14mm",
                "link": "/flooring/14mm-wood-flooring.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " Outdoor ",
      "value": {
        "label": " Outdoor ",
        "link": "/outdoor-tiles.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [
        {
          "key": "Porcelain Paving",
          "value": {
            "label": "Porcelain Paving",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Slabs",
              "value": {
                "label": "Slabs",
                "link": "/paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/grey-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Rectangle",
              "value": {
                "label": "Rectangle",
                "link": "/rectangle-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Square",
              "value": {
                "label": "Square",
                "link": "/square-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "Outdoor Tiles",
          "value": {
            "label": "Outdoor Tiles",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Outdoor",
              "value": {
                "label": "Outdoor",
                "link": "/outdoor-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Garden Path",
              "value": {
                "label": "Garden Path",
                "link": "/garden-path-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Wall Cladding",
              "value": {
                "label": "Wall Cladding",
                "link": "/outdoor-wall-cladding-tiles.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Colour",
          "value": {
            "label": "By Colour",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Grey",
              "value": {
                "label": "Grey",
                "link": "/grey-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "White",
              "value": {
                "label": "White",
                "link": "/white-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Beige",
              "value": {
                "label": "Beige",
                "link": "/beige-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Graphite",
              "value": {
                "label": "Graphite",
                "link": "/graphite-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "By Sizes",
          "value": {
            "label": "By Sizes",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "600x600",
              "value": {
                "label": "600x600",
                "link": "/600x600-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "600x900",
              "value": {
                "label": "600x900",
                "link": "/600x900-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "600x1200",
              "value": {
                "label": "600x1200",
                "link": "/600x1200-paving-slabs.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        },
        {
          "key": "Accessories",
          "value": {
            "label": "Accessories",
            "link": "",
            "counter": 0,
            "banner": "",
            "bannerTitle": ""
          },
          "children": [
            {
              "key": "Installation",
              "value": {
                "label": "Installation",
                "link": "/outdoor-installation.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Cleaning",
              "value": {
                "label": "Cleaning",
                "link": "/outdoor-clean-seal-care.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            },
            {
              "key": "Trims",
              "value": {
                "label": "Trims",
                "link": "/outdoor-trims.html",
                "counter": 0,
                "banner": "",
                "bannerTitle": ""
              },
              "children": [],
              "isLeaf": true
            }
          ],
          "isLeaf": false
        }
      ],
      "isLeaf": false
    },
    {
      "key": " New ",
      "value": {
        "label": " New ",
        "link": "/new-arrivals.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    },
    {
      "key": " Adhesive ",
      "value": {
        "label": " Adhesive ",
        "link": "/adhesive-grout.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    },
    {
      "key": " Accessories ",
      "value": {
        "label": " Accessories ",
        "link": "/accessories.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    },
    {
      "key": "Sale",
      "value": {
        "label": "Sale",
        "link": "/sale.html",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    },
    {
      "key": " Style &amp; Advice ",
      "value": {
        "label": " Style &amp; Advice ",
        "link": "/i/style-inspiration",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    },
    {
      "key": " Blog ",
      "value": {
        "label": " Blog ",
        "link": "/blog/",
        "counter": 0,
        "banner": "",
        "bannerTitle": ""
      },
      "children": [],
      "isLeaf": false
    }
  ],
  "isLeaf": false
};
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
const activeMenuChildrenLength = computed(() => {
  return activeMenu.value?.children?.length || 0;
});
const menuTitle = computed(() => {
  if(activeMenu.value.key === 'root') {
    return 'Categories'
  }else {
    return activeMenu.value.value.label
  }
});
const bannerNode = computed(() => findNode(activeNode.value.slice(0, 1), coontent));
const resolvedComponents = computed(() => resolveComponent('NuxtLink'));

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


onMounted( () => {
  window.addEventListener('scroll', updateScroll)
})
const scrollPosition = ref(0)
const updateScroll = () => {
  scrollPosition.value = window.scrollY
};
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>
