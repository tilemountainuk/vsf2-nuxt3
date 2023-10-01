export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      isMenuOverlay: false,
      isLoading: false,
      cart: [] as string[],
      checkout: [] as any[]
    }
  },
  actions: {
    addValueToFilterList (value: string) {
      this.cart.push(value)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
