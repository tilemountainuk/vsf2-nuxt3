import dotenv from 'dotenv';
dotenv.config();

const cookieNames = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale',
  cartCookieName: 'vsf-cart',
  customerCookieName: 'vsf-customer',
  storeCookieName: 'vsf-store',
  messageCookieName: 'vsf-message'
};
const config = {
  integrations: {
    /* VSF integration config */
    magento: {
      location: '@vue-storefront/magento-api/server',
      customQueries: {
        'product-details-custom-query': ({ variables, metadata }: {variables:string, metadata: any}) => ({
          variables,
          query: `
          query productDetails(
            $search: String = "",
            $filter: ProductAttributeFilterInput,
            $pageSize: Int = 10,
            $currentPage: Int = 1,
            $sort: ProductAttributeSortInput
          ) {
            products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
              ${metadata.fields}
            }
          }`
        }),
        'add-products-to-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
              addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
                cart {
                  ${metadata.fields}
                }
                user_errors {
                  code
                  message
                }
              }
            }`
        }),
        'cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query:`
            query cart($cartId: String!) {
              cart(cart_id:$cartId) {
                ${metadata.fields}
              }
            }
          `
        }),
        'apply-coupon-to-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation applyCouponToCart($input: ApplyCouponToCartInput) {
              applyCouponToCart(input: $input) {
                ${metadata.fields}
              }
            }`
        }),
        'remove-coupon-from-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
          mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
            removeCouponFromCart(input: $input) {
              ${metadata.fields}
            }
          }`
        }),
        'set-billing-address-on-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
              setBillingAddressOnCart(input: $input) {
              cart {
                ${metadata.fields}
              }
            }
          }`
        }),
        'set-shipping-addresses-on-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
              setShippingAddressesOnCart(input: $input) {
              cart {
                ${metadata.fields}
              }
            }
          }`
        }),
        'set-shipping-methods-on-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
              setShippingMethodsOnCart(input: $input) {
                cart {
                  ${metadata.fields}
                }
              }
            }`
        }),
        'set-payment-method-on-cart-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
              setPaymentMethodOnCart(input: $input) {
                cart {
                  ${metadata.fields}
                }
              }
            }
          `
        }),
        'products-custom-query': ({ variables, metadata }: {variables:any, metadata: any}) => ({
          variables,
          query: `
            query productsList(
                $search: String = "",
                $filter: ProductAttributeFilterInput,
                $pageSize: Int = 10,
                $currentPage: Int = 1,
                $sort: ProductAttributeSortInput
            ) {
                products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
                ${metadata.fields}
                }
            }
          `
        }),
      },
      configuration: {
        api: process.env.VSF_MAGENTO_GRAPHQL_URL,
        cookies: {
          ...cookieNames,
        },
        cookiesDefaultOpts: {
          httpOnly: process.env.VSF_COOKIE_HTTP_ONLY || false,
          secure: process.env.VSF_COOKIE_SECURE || false,
          sameSite: process.env.VSF_COOKIE_SAME_SITE || 'lax',
          path: process.env.VSF_COOKIE_PATH || '/',
        },
        defaultStore: 'default',
        customApolloHttpLinkOptions: {
          useGETForQueries: true,
        },
        magentoBaseUrl: process.env.VSF_MAGENTO_BASE_URL,
        magentoApiEndpoint: process.env.VSF_MAGENTO_GRAPHQL_URL,
        imageProvider: process.env.NUXT_IMAGE_PROVIDER,
        recaptcha: {
          isEnabled: process.env.VSF_RECAPTCHA_ENABLED === 'true',
          sitekey: process.env.VSF_RECAPTCHA_SITE_KEY,
          secretkey: process.env.VSF_RECAPTCHA_SECRET_KEY,
          version: process.env.VSF_RECAPTCHA_VERSION,
          score: process.env.VSF_RECAPTCHA_MIN_SCORE,
        },
        customer: {
          customer_create_account_confirm: true,
        },
      },
    }
  },
};

export default config;
