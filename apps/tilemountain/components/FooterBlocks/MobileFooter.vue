<!-- eslint-disable max-lines -->
<template>
  <div class="bg-[#606060] md:hidden block">
    <SfAccordionItem
      :model-value="isOpen('acc-1')"
      @update:model-value="toggle('acc-1', $event)"
      class="bg-[#606060] border-t-[1px] border-t-white"
    >
      <template #summary>
        <div class="flex justify-between items-center px-4 py-[10px]">
          <p class="text-white text-15">Customer Info</p>
          <SfIconRemove size="xs" class="text-white" v-if="isOpen('acc-1')" />
          <SfIconAdd size="xs" class="text-white" v-else />
        </div>
      </template>
      <div>
        <div class="mt-[10px] px-5 pb-[1px]">
          <ul class="mb-[1rem]">
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Clearance & Offers</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Contact us</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Delivery</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">FAQ</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Discounts & vouchers</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Returns & Exchange Policy</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Tile Terms Glossary</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Samples</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </SfAccordionItem>
    <SfAccordionItem
      :model-value="isOpen('acc-2')"
      @update:model-value="toggle('acc-2', $event)"
      class="bg-[#606060] border-t-[1px] border-t-white"
    >
      <template #summary>
        <div class="flex justify-between items-center px-4 py-[10px]">
          <p class="text-white text-15">Popular Tiles</p>
          <SfIconRemove size="xs" class="text-white" v-if="isOpen('acc-2')" />
          <SfIconAdd size="xs" class="text-white" v-else />
        </div>
      </template>
      <div>
        <div class="mt-[10px] px-5 pb-[1px]">
          <ul class="mb-4">
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Bathroom Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Kitchen Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Floor Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Wall Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Mosaic Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Metro Subway Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Proclain Tiles</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Quartz Tiles</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </SfAccordionItem>
    <SfAccordionItem
      :model-value="isOpen('acc-3')"
      @update:model-value="toggle('acc-3', $event)"
      class="bg-[#606060] border-t-[1px] border-b-[1px] border-t-white"
    >
      <template #summary>
        <div class="flex justify-between items-center px-4 py-[10px]">
          <p class="text-white text-15">Company</p>
          <SfIconRemove size="xs" class="text-white" v-if="isOpen('acc-3')" />
          <SfIconAdd size="xs" class="text-white" v-else />
        </div>
      </template>
      <div>
        <div class="mt-[10px] px-5 pb-[1px]">
          <ul class="mb-4">
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">About</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Careers</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Press</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Terms Of Use</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Terms & Conditions</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Privacy Policy</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Sitemap</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Our Flag Showrooms</NuxtLink>
            </li>
            <li class="text-[white] text-[13px] text-[Arial] my-[10px] mx-[0px] text-start">
              <NuxtLink to="/">Bathroom Mountain</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </SfAccordionItem>
    <div>
      <div class="flex justify-between items-center px-4 py-[10px]">
        <p class="text-white text-15">Follow Us</p>
      </div>
      <div class="border-b-[1px] border-b-[solid] border-b-white">
        <ul class="flex justify-center gap-[8px] mb-4">
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#3b5999]"
          >
            <NuxtLink to="" class="m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                ></path>
              </svg>
            </NuxtLink>
          </li>
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#55acee]"
          >
            <NuxtLink to="" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 310 310"
                style="enable-background: new 0 0 310 310"
                xml:space="preserve"
              >
                <g id="XMLID_826_">
                  <path
                    id="XMLID_827_"
                    d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73   c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783   c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598   C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467   c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977   c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889   c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597   c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961   c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895   c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367   c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998   C307.394,57.037,305.009,56.486,302.973,57.388z"
                  ></path>
                </g>
              </svg>
            </NuxtLink>
          </li>
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#bd081c]"
          >
            <NuxtLink to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="97.672px"
                height="97.672px"
                viewBox="0 0 97.672 97.672"
                style="enable-background: new 0 0 97.672 97.672"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M51.125,0C24.469,0,11.029,19.11,11.029,35.047c0,9.649,3.653,18.232,11.487,21.432c1.286,0.525,2.438,0.019,2.812-1.403   c0.258-0.985,0.871-3.468,1.144-4.503c0.376-1.407,0.229-1.9-0.807-3.126c-2.259-2.665-3.703-6.115-3.703-11.002   c0-14.178,10.608-26.87,27.624-26.87c15.064,0,23.342,9.206,23.342,21.5c0,16.176-7.159,29.828-17.786,29.828   c-5.87,0-10.262-4.854-8.854-10.807c1.686-7.107,4.951-14.778,4.951-19.907c0-4.592-2.463-8.423-7.565-8.423   c-6,0-10.819,6.207-10.819,14.521c0,5.296,1.789,8.878,1.789,8.878s-6.141,26.015-7.215,30.571   c-2.145,9.072-0.322,20.195-0.168,21.318c0.089,0.666,0.944,0.824,1.332,0.322c0.555-0.723,7.7-9.544,10.129-18.359   c0.687-2.496,3.944-15.42,3.944-15.42c1.95,3.717,7.647,6.992,13.706,6.992c18.034,0,30.271-16.441,30.271-38.45   C86.644,15.498,72.547,0,51.125,0z"
                  ></path>
                </g>
              </svg>
            </NuxtLink>
          </li>
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#cd201f]"
          >
            <NuxtLink to="" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 472.615 472.615"
                style="enable-background: new 0 0 472.615 472.615"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <polygon points="50.273,0 50.273,472.615 422.342,236.308   "></polygon>
                  </g>
                </g>
              </svg>
            </NuxtLink>
          </li>
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#0077b5]"
          >
            <NuxtLink to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                ></path>
              </svg>
            </NuxtLink>
          </li>
          <li
            class="bg-[#9d9d9d] inline-flex w-[40px] h-[40px] flex-row justify-center items-center rounded-[50%] hover:bg-[#e1306c]"
          >
            <NuxtLink to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-[16px] h-[16px] fill-[#434243] hover:fill-[white]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                ></path>
              </svg>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink class="location-button flex no-underline justify-center mb-4" to="#">
          <span
            class="footer-button2 bg-[#9D9D9D] shadow-md rounded-md flex justify-center items-center gap-[4] p-[10px] mt-[5px] mb-[7px] max-w-[280px] w-[100%] text-[#434243]"
          >
            <span class="location1-icon pb-[4px]">
              <svg
                data-v-ffd609a0=""
                xmlns="http://www.w3.org/2000/svg"
                class="w-[18px] h-[18px] mr-[10px]"
                viewBox="0 0 28 28"
                fill="none"
              >
                <g data-v-ffd609a0="" clip-path="url(#clip0_3_14)">
                  <path
                    data-v-ffd609a0=""
                    d="M24.5 11.6667C24.5 19.8333 14 26.8333 14 26.8333C14 26.8333 3.5 19.8333 3.5 11.6667C3.5 8.88189 4.60625 6.21117 6.57538 4.24204C8.54451 2.27291 11.2152 1.16666 14 1.16666C16.7848 1.16666 19.4555 2.27291 21.4246 4.24204C23.3938 6.21117 24.5 8.88189 24.5 11.6667Z"
                    stroke="#434243"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    data-v-ffd609a0=""
                    d="M14 15.1667C15.933 15.1667 17.5 13.5997 17.5 11.6667C17.5 9.73367 15.933 8.16666 14 8.16666C12.067 8.16666 10.5 9.73367 10.5 11.6667C10.5 13.5997 12.067 15.1667 14 15.1667Z"
                    fill="#434243"
                  ></path>
                </g>
                <defs data-v-ffd609a0="">
                  <clipPath data-v-ffd609a0="" id="clip0_3_14">
                    <rect data-v-ffd609a0="" class="w-[28px] h-[28] fill-white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span class="button-text text-[17px] font-bold"> Find your local store </span>
          </span>
        </NuxtLink>
      </div>
    </div>
    <div>
      <div class="flex justify-between items-center px-4 py-[10px]">
        <p class="text-white text-15">Accepted Cards</p>
      </div>
      <div class="bg-[#606060] px-0 pb-2">
        <NuxtImg class="w-[85%] mx-auto" src="/images/payments.tilemountain.svg" alt="payments" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SfAccordionItem, SfIconAdd, SfIconRemove } from '@storefront-ui/vue';

const opened = ref<string | null>(null);

const isOpen = (id: string) => id === opened.value;

const toggle = (id: string, open: boolean) => {
  if (open) {
    opened.value = id;
  } else if (isOpen(id)) {
    opened.value = null;
  }
};
</script>
