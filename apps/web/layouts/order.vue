<template>
  <UiNavbarTop :data="{ content: '' }" />
  <main>
    <NarrowContainer>
      <slot />
    </NarrowContainer>
  </main>
  <UiFooter />
</template>
