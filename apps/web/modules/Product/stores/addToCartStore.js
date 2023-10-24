import { defineStore } from 'pinia';

export const useAddToCartStore = defineStore('addToCartStore', {
  state: () => ({
    productInCart: false,
    cartId: '',
  }),
  getters: {
    getProductInCart: (state) => state.productInCart,
    getCartId: (state) => state.cartId,
  },
  actions: {
    setCartId(Id) {
      this.cartId = Id;
    },
    setProductInCart(flag) {
      this.cartId = flag;
    },
  },
  persist: true,
});
