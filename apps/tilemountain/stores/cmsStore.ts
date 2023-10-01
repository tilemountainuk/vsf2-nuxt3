export const useCmsStore = defineStore('cmsStore', {
  state: () => {
    return {
      cmsBlocks: [],
      cmsPages: []
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCmsStore, import.meta.hot));
}
