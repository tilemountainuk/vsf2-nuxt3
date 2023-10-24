import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartId: '',
  }),
  getters: {
    getCartId: (state) => state.cartId,
  },
  actions: {
    setCartId(Id) {
      this.cartId = Id;
    },
  },
  persist: true,
});
