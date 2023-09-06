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
