export const addProductsToCartCustomQuery: {
  addProductsToCart: string;
  metadata?: { fields: string };
} = {
  addProductsToCart: 'add-products-to-cart-custom-query',
  metadata: {
    fields: `
    items {
        uid
        quantity
        product {
            name
            sku
            price_range {
                maximum_price {
                    regular_price {
                        currency
                        value
                    }
                }
                minimum_price {
                    regular_price {
                        currency
                        value
                    }
                }
            }
        }
    }
    total_quantity
    `,
  },
};

export const cartCustomQuery = {
  cart: 'cart-custom-query',
  metadata: {
    fields: `
        id
        total_quantity
        is_virtual
        applied_coupons { 
            code
        }
        prices {
            grand_total {
                currency
                value
            }
            subtotal_including_tax {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
        }
        items {
            uid
            quantity
            product {
                name
                sku
                url_key
                url_path
                thumbnail {
                url
                }
                price_range {
                maximum_price {
                    regular_price {
                    currency
                    value
                    }
                }
                minimum_price {
                    regular_price {
                    currency
                    value
                    }
                }
                }
            }
        }
    `,
  },
};

export const applyCouponToCartCustomQuery: {
  applyCouponToCart: string;
  metadata?: { fields: string };
} = {
  applyCouponToCart: 'apply-coupon-to-cart-custom-query',
  metadata: {
    fields: `
    cart {
        applied_coupons { 
            code
        }
        is_virtual
        id
        total_quantity
        prices {
        grand_total {
            currency
            value
        }
        subtotal_including_tax {
            currency
            value
        }
        discounts {
            amount {
            currency
            value
            }
            label
        }
        }
        items {
            uid
            quantity
            product {
                name
                sku
                thumbnail {
                    url
                }
                price_range {
                    maximum_price {
                        regular_price {
                        currency
                        value
                        }
                    }
                    minimum_price {
                        regular_price {
                        currency
                        value
                        }
                    }
                }
            }
        }
    }
    `,
  },
};
export const removeCouponFromCartCustomQuery: {
  removeCouponFromCart: string;
  metadata?: { fields: string };
} = {
  removeCouponFromCart: 'remove-coupon-from-cart-custom-query',
  metadata: {
    fields: `
    cart {
        applied_coupons { 
            code
        }
        id
        is_virtual
        total_quantity
        prices {
            grand_total {
                currency
                value
            }
            subtotal_including_tax {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
        }
        items {
            uid
            quantity
            product {
                name
                sku
                thumbnail {
                    url
                }
                price_range {
                    maximum_price {
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        regular_price {
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
    `,
  },
};
