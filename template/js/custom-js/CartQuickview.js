import {
    i19checkout,
    i19close,
    i19continueShopping,
    i19emptyCart,
    i19myShoppingCart,
    i19seeCart,
    i19subtotal
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    formatMoney
  } from '@ecomplus/utils'
  
  import ecomCart from '@ecomplus/shopping-cart'
  import ALink from '@ecomplus/storefront-components/src/ALink.vue'
  import ABackdrop from '@ecomplus/storefront-components/src/ABackdrop.vue'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'
  import BuyTogether from '@ecomplus/storefront-components/src/BuyTogether.vue'
  import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'
  import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
  import DiscountApplier from '@ecomplus/storefront-components/src/DiscountApplier.vue'
  
  export default {
    name: 'CartQuickview',
  
    components: {
      ALink,
      ABackdrop,
      APrices,
      BuyTogether,
      CartItem,
      DiscountApplier,
      ShippingCalculator
    },
  
    props: {
      isVisible: {
        type: Boolean,
        default: true
      },
      hasShippingCalculator: Boolean,
      checkoutUrl: {
        type: String,
        default: '/app/#/checkout'
      },
      cartUrl: {
        type: String,
        default: '/app/#/cart'
      },
      canOpenOnNewItem: {
        type: Boolean,
        default: true
      },
      ecomCart: {
        type: Object,
        default () {
          return ecomCart
        }
      }
    },
  
    data () {
      return {
        selectedShippingPrice: 0,
        buyTogetherProducts: [],
        discountBuyTogether: 0
      }
    },
  
    computed: {
      i19checkout: () => i18n(i19checkout),
      i19close: () => i18n(i19close),
      i19continueShopping: () => i18n(i19continueShopping),
      i19emptyCart: () => i18n(i19emptyCart),
      i19myShoppingCart: () => i18n(i19myShoppingCart),
      i19seeCart: () => i18n(i19seeCart),
      i19subtotal: () => i18n(i19subtotal),
  
      cart () {
        return this.ecomCart.data
      },

      baseProduct () {
        const capa = this.cart && this.cart.items && this.cart.items.length && this.cart.items.filter(({name}) => name && name.length && name.toLowerCase().includes('capa'))
        return (capa && capa.length && capa[0]) || this.cart && this.cart.items && this.cart.items.length && this.cart.items[0] || undefined
      },

      selectedModel () {
        if (this.baseProduct && this.baseProduct.specifications && this.baseProduct.specifications['modelo']) {
            return {
                modelo: this.baseProduct && this.baseProduct.specifications && this.baseProduct.specifications['modelo'][0].text
            }
        }
      },
  
      total () {
        return this.cart.subtotal + this.selectedShippingPrice
      }
    },
  
    methods: {
      formatMoney,
  
      toggle (isVisible) {
        this.$emit(
          'update:is-visible',
          typeof isVisible === 'boolean' ? isVisible : !this.isVisible
        )
      },
  
      selectShippingService (service) {
        this.selectedShippingPrice = service.shipping_line
          ? service.shipping_line.total_price
          : 0
      },
    },
  
    created () {
      if (this.canOpenOnNewItem) {
        this.ecomCart.on('addItem', ({ data }) => {
          this.$set(this.ecomCart, 'data', data)
          this.$nextTick(() => {
            this.toggle(true)
          })
        })
      }
    }
  }
  