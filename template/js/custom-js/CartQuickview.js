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
  import baseModulesRequestData from '@ecomplus/storefront-app/src/lib/base-modules-request-data'
  
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
        discountBuyTogether: 0,
        isCouponApplied: false,
        amount: {
          subtotal: this.ecomCart && this.ecomCart.data && this.ecomCart.data.subtotal,
          freight: 0,
          discount: 0,
          total: this.ecomCart && this.ecomCart.data && this.ecomCart.data.subtotal
        },
        discountCoupon: window.sessionStorage.getItem('couponCode') || ''
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

      isValidCart () {
        return this.cart.items.find(({ quantity }) => quantity)
      },

      modulesPayload: () => baseModulesRequestData,

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

      localDiscountCoupon: {
        get () {
          return this.discountCoupon
        },
        set (couponCode) {
          this.discountCoupon = couponCode
          window.localStorage.setItem('couponCode', couponCode)
          this.$emit('update:discount-coupon', couponCode)
        }
      },
  
      total () {
        this.amount.total = this.cart.subtotal + this.amount.freight - this.amount.discount
        this.amount.subtotal = this.cart.subtotal
        let total = this.amount.total
        if (this.modulesPayload && this.modulesPayload.utm && this.modulesPayload.utm.campaign && this.modulesPayload.utm.campaign.length) {
          total = this.cart.subtotal + this.amount.freight
        }
        return total
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
        this.amount.freight = this.selectedShippingPrice
      },

      setDiscountRule (discountRule) {
        console.log(discountRule)
        this.amount.discount = discountRule && discountRule.extra_discount && discountRule.extra_discount.value || 0
        if (this.amount.discount > 0) {
          const sessionUtm = JSON.parse(window.sessionStorage.getItem('ecomUtm') || '{}') 
          sessionUtm.campaign = this.discountCoupon
          window.sessionStorage.setItem('ecomUtm', JSON.stringify(sessionUtm))
          window.sessionStorage.setItem('couponCode', this.discountCoupon)
        }

        this.$nextTick(() => {
          this.isCouponApplied = Boolean(this.discountCoupon && this.amount.discount)
        })
      },

      callChildMethod() {
        this.$refs.child.updateDiscount();
      },
    },

    watch: {
  
      total (total, oldTotal) {
        console.log(total, oldTotal)
        if (oldTotal !== null && Math.abs(total - oldTotal) > 0.01) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.callChildMethod()
            }, 600)
          })
        }
      },

    },
  
    created () {
      const couponCode = window.sessionStorage.getItem('couponCode')
      if (couponCode) {
        this.discountCoupon = couponCode
      }
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
  