<template>
  <header class="h-14 md:h-20 flex z-50 md:sticky md:-top-5 md:pt-2.5 flex-col mb-[10rem]" data-testid="navbar-top">
    <div
      class="px15 box-border ml-auto mr-auto max-w-full md:w-[752px] xl:w-[1280px] 2md:w-[976px] mp:pr-0 mp:pl-0 pl-[15px] pr-[15px]"
    >
      <div
        class="between-xs middle-xs header-main box-border flex flex-initial flex-row flex-wrap -mr-2 -ml-2 justify-between items-center ml-2 tab:-ml-[6px] mp:m-0"
      >
        <div
          class="col-md-2 col-xs-4 md:box-border md:pr-2 md:pl-2 md:flex-[0_0_auto] md:basis-2/12 md:max-w-[16.66666667%] basis-2/6 max-w-[33.33333333%]"
        >
          <div class="logo-desktop pt-1 mp:pt-1 mp:pl-5 small:pt:0 4xs:pt-0">
            <a href="/" aria-current="page" title="Home Page" class="inline-flex">
              <HeaderLogo />
            </a>
          </div>
        </div>
        <div
          class="search-bar ph:order-2 pl-1 pr-1 pt-1 4xs:pt-0 || col-md-5 md:box-border md:pr-2 md:pl-2 md:flex-[0_0_auto] md:basis-5/12 md:max-w-[41.666667%] || col-xs-12 basis-full max-w-full|| middle-xs items-center"
        >
          <div>
            <div class="searchbar-show mp:w-full mp:bg-white mp:relative mp:m-0 tab:ml-px">
              <div data-testid="searchPanel" class="searchpanel visible relative mr-0 mt-2 mp:mt-1 1tab:mt-1">
                <div
                  class="container xl:w-[1280px] px15 box-border ml-auto mr-auto pr-2 pl-2 max-w-full md:w-[752px] 2md:w-[976px] mp:pr-0 mp:pl-0"
                >
                  <div class="row box-border flex flex-initial flex-row flex-wrap -mr-2 -ml-2">
                    <div
                      class="col-md-12 md:basis-full md:box-border md:pr-2 md:pl-2 md:flex-[0_0_auto] md:max-w-full mp:pl-1 mp:pr-1 || basis-full max-w-full justify-end text-end col-md-12 col-xs-12 end-xs"
                    >
                      <div
                        class="search-input-group relative border-0 justify-end flex border-[#bdbdbd] mp:m-0 mp:w-full"
                      >
                        <form class="new-searchformTag w-full relative mp:flex">
                          <input
                            id="search"
                            autocomplete="off"
                            placeholder="Search..."
                            value=""
                            class="search-panel-input leading-[44px] max-w-[406px] h-[46px] w-full border text-[15px] bg-[#f7f6f6] text-[#777] font-bold capitalize relative box-border transition-all duration-[0.2s] ease-[ease] leading-none pl-[0.6rem] border-solid border-[#b3b6b4] 1tab:max-w-[300px] 1tab:height-[42px] tab:max-w-full tab:h-[36px] tab:text-[12px] flex border-b-[#bdbdbd] border-b border-solid mp:text-[16px] mp:max-w-full mp:h-[40px] mp:capitalize mp:bg-[#f7f6f6] mp:text-[#8f8d8d] mp:leading-[17px] mp:text-sm mp:font-bold mp:m-0 mp:pl-14 mp:p-0 mp:rounded-none mp:border-2 mp:border-solid mp:border-[#c0bfc3]"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <!---->
                </div>
              </div>
              <!---->
            </div>
          </div>
        </div>
        <div
          class="md:box-border md:pr-2 md:pl-2 md:flex-[0_0_auto] md:basis-4/12 md:max-w-[33.333337%] 2md:box-border 2md:pr-0 2md:pl-0 2md:flex-[0_0_auto] 2md:basis-5/12 2md:max-w-[41.666667%] basis-8/12 max-w-[66.666667%] relative pr-[34px] pr-[34px] text-right 1tab:pr-[50px] mp:pr-[6px] 4xs:pr-0 mp:h-full mp:flex mp:max-h-[50px] mp:justify-end mp:items-center mp:pt-0"
        >
          <div class="inline-flex mp:flex mp:justify-end mp:pr-[36px] 4xs:pr-[32px]">
            <div class="flex pl-[55px] 1tab:pl-[10px] tab:pl-0">
              <div
                class="p-[15px] cursor-pointer pl-[8px] mp:relative mp:p-0 mp:m-0 mp:w-[14vw] 1tab:pr-[12px] tab:pr-[30px] mp:pr-0"
              >
                <NuxtLink
                  to="/i/contact-us"
                  class="flex pt-[8px] pt-[8px] whitespace-nowrap bg-[url('https://www.tilemountain.co.uk/assets/phone.svg')] bg-left bg-center bg-[60%] bg-no-repeat bg-[length:26px] 1tab:bg-[length:24px] tab:bg-[length:16px] mp:bg-[length:24px] 4xs:bg-[length:20px] 1tab:pt-[20px] 1tab:pr-0 1tab:pb-[13px] 1tab:pl-[13px] 1tab:bg-[length:24px] mp:flex mp:whitespace-nowrap mp:h-[72px] mp:w-full mp:max-w-[35px] mp:p-0"
                >
                  <p
                    class="mt-[18px] mr-0 mb-[18px] ml-[2px] text-[#29275b] font-bold ml-[2px] ml-[2px] text-[18px] pl-[29px] mp:hidden 1tab:text-[14px] 1tab:pl-[22px] tab:text-[12px] tab:pl-[12px]"
                  >
                    Need help?
                  </p>
                </NuxtLink>
              </div>
              <div class="flex pl-[55px] 1tab:pl-[10px] tab:pl-0">
                <div
                  class="bg-transparent border-0 cursor-pointer pt-[12px] pr-[34px] pb-[12px] pl-[12px] mp:p-0 1tab:pt-[8px] 1tab:pr-[16px] 1tab:pb-[12px] 1tab:pl-[12px] tab:p-[6px] mp:w-[14vw]"
                >
                  <NuxtLink to="/i/contact-us" class="p-0">
                    <HeaderShowroomIcon class="mt-[25px] mb-auto mx-auto" />
                    <p class="text-[13.33px] m-0 md:pt-[6px] hidden md:text-[#29275b] md:block">Showrooms</p>
                  </NuxtLink>
                </div>
                <div
                  class="cursor-pointer pt-[12px] pr-[36px] pb-[12px] pl-[12px] 1tab:pt-[8px] 1tab:pr-[16px] 1tab:pb-[12px] 1tab:pl-[12px] tab:pt-[8px] tab:pr-[12px] tab:pb-[12px] tab:pl-[12px] ph:text-right ph:mr-[2px] ph:p-0"
                >
                  <div class="inline-flex relative pr-[13px] outline-0 tab:pr-[6px] ph:p0">
                    <NuxtLink to="#" class="pt-[16px]">
                      <HeaderAccountIcon class="mt-[8px]" />
                    </NuxtLink>
                  </div>
                </div>
                <button
                  class="relative bg-transparent border-0 inline-flex cursor-pointer w-auto -mr-[6px] flex pl-0 items-center 1tab:h-full 1tab:w-full 1tab:mx-w-[53px] 1tab:p-0 1tab:m-0 1tab:min-w-full tab:h-full tab:w-full tab:mx-w-fit tab:p-0 tab:m-0 ph:mb-0 ph:ml-0 ph:mr-0 ph:-mt-[10px] ph:min-h-[83px] 4xs:max-w-fit"
                >
                  <HeaderCartIcon />
                  <span
                    class="text-white top-[32px] left-[15px] w-[18px] h-[18px] rounded-[50%] flex justify-center items-center bg-[#ed108c] 1tab:top-[28px] 1tab:left-[12px] 1tab:w-[16px] 1tab:h-[16px] 1tab:text-[10px] tab:top-[27px] tab:left-[9px] tab:w-[14px] tab:h-[14px] tab:text-[9px] mp:top-[20px] mp:left-[20px] mp:w-[22px] mp:h-[22px] mp:text-[14px] 4xs:top-[24px] 4xs:left-[12px] 4xs:w-[16px] 4xs:h-[16px] 4xs:text-[10px] absolute flex justify-center text-center items-center mp:mt-0 mp:mb-0 mp:-mr-[15px] mp:-ml-[15px] border-box py0 px2 h6 lh16 weight-700 cl-white"
                    >0</span
                  >
                  <span
                    class="text-lg font-bold text-[#29275b] ml-[15px] mt-[17px] ph:text-sm ph:ml-2.5 ph:mt-1 tab:hidden"
                    >£0.00</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UiHeader />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  filled?: boolean;
}>();
</script>
<style></style>
