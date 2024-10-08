import {
    i19add,
    i19addDiscountCoupon,
    // i19add$1ToGetDiscountMsg,
    i19campaignAppliedMsg,
    i19code,
    i19couponAppliedMsg,
    i19discountCoupon,
    i19errorMsg,
    i19hasCouponOrVoucherQn,
    i19invalidCouponMsg
  } from '@ecomplus/i18n'
  
  import { i18n, formatMoney, price } from '@ecomplus/utils'
  import { store, modules } from '@ecomplus/client'
  import ecomCart from '@ecomplus/shopping-cart'
  import ecomPassport from '@ecomplus/passport-client'
  import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
  
  const addFreebieItems = (ecomCart, productIds) => {
    console.log(ecomCart, productIds)
    const hasSpecialGift = productIds && productIds.length ? productIds.includes('6544ed9e2cd6b6595995bb00') : false
    if (Array.isArray(productIds)) {
      let capaIndex, model, variationBrinde
      let isblackOffer = false
      ecomCart.data.items.forEach(({ _id, product_id: productId, flags, name, categories }) => {
        capaIndex = name.toLowerCase().indexOf('popsocket')
        /* if (capaIndex >= 0) {
          const splitName = name.split('/')
          model = splitName[1].trim()
          if (categories && categories.length) {
            isblackOffer = categories.some(({ _id }) => _id === '6541418d2cd6b65959922d5c')
          }
        } */
        if (flags && flags.includes('freebie') && !productIds.includes(productId)) {
          ecomCart.removeItem(_id)
        }
      })
      productIds.forEach(productId => {
        const canAddFreebie = !ecomCart.data.items.find(item => {
          return item.product_id === productId && item.flags && item.flags.includes('freebie')
        })
        if (canAddFreebie && (!hasSpecialGift || isblackOffer)) {
          store({ url: `/products/${productId}.json` })
            .then(({ data }) => {
              if (data.variations && model) {
                if (model === 'iPhone 13 Pro' || model === 'iPhone 13') {
                  model = 'iPhone 13/13 Pro'
                } else if (model === 'iPhone 11' || model === 'iPhone XR') {
                  model = 'iPhone 11/XR'
                } else if (model === 'iPhone X' || model === 'iPhone XS') {
                  model = 'iPhone X/XS'
                } else if (model === 'iPhone 12' || model === 'iPhone 12 Pro') {
                  model = 'iPhone 12/12 Pro'
                } else if (model === 'Galaxy S22' || model === 'Galaxy S23') {
                  model = 'Galaxy S22 5G/S23'
                } else if (model === 'Galaxy S22 Plus' || model === 'Galaxy S23 Plus') {
                  model = 'Galaxy S22 Plus/S23 Plus'
                }
                variationBrinde = data.variations.find(variation => variation.specifications['modelo'][0].text === model.trim())
              }
              if (data.quantity > 0 && (capaIndex >= 0 || (!data.variations || !data.variations.length || variationBrinde))) {
                ecomCart.addProduct(
                  {
                    ...data,
                    flags: ['freebie', '__tmp']
                  },
                  variationBrinde && variationBrinde._id,
                  productIds.reduce((qnt, _id) => {
                    return _id === productId ? qnt + 1 : qnt
                  }, 0)
                )
              }
            })
            .catch(console.error)
        }
      })
    }
  }
  
  export default {
    name: 'DiscountApplier',
  
    components: {
      AAlert
    },
  
    props: {
      amount: Object,
      couponCode: String,
      hasCouponInput: {
        type: Boolean,
        default: true
      },
      isFormAlwaysVisible: Boolean,
      isCouponApplied: Boolean,
      isQuickview: Boolean,
      isAttentionWanted: Boolean,
      canAddFreebieItems: {
        type: Boolean,
        default: true
      },
      modulesPayload: Object,
      paymentGateway: Object,
      ecomCart: {
        type: Object,
        default () {
          return ecomCart
        }
      },
      customer: Object,
      ecomPassport: {
        type: Object,
        default () {
          return ecomPassport
        }
      }
    },
  
    data () {
      return {
        alertText: null,
        alertVariant: null,
        isFormVisible: this.isFormAlwaysVisible || this.couponCode,
        isLoading: false,
        localCouponCode: this.couponCode,
        localAmountTotal: null,
        isUpdateSheduled: false
      }
    },
  
    computed: {
      i19add$1ToGetDiscountMsg: () => i18n({
        en_us: 'Add more $1 to cart to get the discount.',
        pt_br: 'Adicione mais $1 ao carrinho para ganhar o desconto.'
      }),
      i19add: () => i18n(i19add),
      i19addDiscountCoupon: () => i18n(i19addDiscountCoupon),
      i19code: () => i18n(i19code),
      i19couponAppliedMsg: () => i18n(i19couponAppliedMsg),
      i19discountCoupon: () => i18n(i19discountCoupon),
      i19hasCouponOrVoucherQn: () => i18n(i19hasCouponOrVoucherQn),
      i19invalidCouponMsg: () => i18n(i19invalidCouponMsg),
      i19campaignAppliedMsg: () => i18n(i19campaignAppliedMsg),

      canAddDiscountUtm () {
        if (this.modulesPayload && this.modulesPayload.utm && this.modulesPayload.utm.campaign && this.modulesPayload.utm.campaign.includes('modelo_')) {
          const modelArray = this.modulesPayload.utm.campaign.match(/modelo_([^@]+)/)
          const model = modelArray[1].replace('_', ' ')
          const searchedModel = window.modelList.find(option => option.toLowerCase() === model)
          if (this.ecomCart.data && this.ecomCart.data.items && this.ecomCart.data.items.length >= 2) {
            let hasCase = false
            let hasPelicula = false
            hasCase = ecomCart.data.items.some(item => item.name.toLowerCase().includes('capa') && item.name.includes(searchedModel))
            hasPelicula = ecomCart.data.items.some(item => item.name.replaceAll('í', 'i').toLowerCase().includes('pelicula') && item.name.includes(searchedModel))
            return Boolean(hasCase && hasPelicula)
          }
          return false
        }
        return true
      },
  
      canAddCoupon () {
        return !this.couponCode || !this.isCouponApplied ||
          this.couponCode !== this.localCouponCode
      },

      modulesDiscount () {
        let discount = this.modulesPayload
        if (!this.canAddDiscountUtm) {
          delete discount.utm
        }
        return discount
      },

      paymentGatewayDiscount () {
        if (!this.paymentGateway) return 0
        const { discount } = this.paymentGateway
        if (!discount || !discount.value) return 0
        const applyAt = discount.apply_at || 'total'
        const maxDiscount = applyAt === 'total' ? this.localAmountTotal : this.amount[applyAt]
        if (maxDiscount > 0) {
          const { type, value } = discount
          if (type === 'percentage') {
            return maxDiscount * value / 100
          }
          return value <= maxDiscount ? value : maxDiscount
        }
        return 0
      }
    },
  
    methods: {
      fixAmount () {
        const amount = this.amount || {
          subtotal: this.ecomCart.data.subtotal
        }
        this.localAmountTotal = (amount.subtotal || 0) +
          (amount.freight || 0) - this.paymentGatewayDiscount
      },
  
      parseDiscountOptions (listResult = []) {
        let extraDiscountValue = 0
        if (listResult.length) {
          let discountRule, invalidCouponMsg, invalidAlertVariant
          let appId = null
          listResult.forEach(appResult => {
            console.log(appResult.validated, appResult.app_id)
            const { validated, error, response } = appResult
            if (validated && !error) {
              const appDiscountRule = response.discount_rule
              console.log(appDiscountRule)
              if (appDiscountRule) {
                if (extraDiscountValue) {
                  appDiscountRule.extra_discount.value += extraDiscountValue
                  discountRule = appDiscountRule
                } else {
                  discountRule = {
                    app_id: appResult.app_id,
                    ...appDiscountRule
                  }
                }
                extraDiscountValue = appDiscountRule.extra_discount.value
              } else if (response.available_extra_discount && response.available_extra_discount.min_amount) {
                invalidCouponMsg = this.i19add$1ToGetDiscountMsg
                  .replace('$1', formatMoney(response.available_extra_discount.min_amount - this.amount.subtotal))
                invalidAlertVariant = 'info'
              }
              if (response.invalid_coupon_message) {
                invalidCouponMsg = response.invalid_coupon_message
              }
              if (this.canAddFreebieItems) {
                if (this.isQuickview && appResult.app_id == '122197') {
                  addFreebieItems(this.ecomCart, response.freebie_product_ids || [])
                } else {
                  addFreebieItems(this.ecomCart, response.freebie_product_ids)
                } 
              }
            }
          })
          if (extraDiscountValue) {
            if (this.localCouponCode) {
              if (invalidCouponMsg) {
                this.alertText = invalidCouponMsg
                this.alertVariant = invalidAlertVariant || 'warning'
              } else {
                this.$emit('update:coupon-code', this.localCouponCode)
                this.alertText = this.i19couponAppliedMsg
                this.alertVariant = 'info'
              }
            } else {
              this.alertText = this.i19campaignAppliedMsg
              this.alertVariant = 'info'
            }
            this.$emit('set-discount-rule', discountRule)
          } else {
            if (this.localCouponCode) {
              this.alertText = invalidCouponMsg || this.i19invalidCouponMsg
              this.alertVariant = invalidAlertVariant || 'warning'
            } else {
              this.alertText = null
            }
            this.$emit('set-discount-rule', {})
          }
        }
      },
  
      fetchDiscountOptions (data = {}) {
        this.isLoading = true
        const customer = this.customer || this.ecomPassport.getCustomer()
        if (customer && (customer._id || customer.doc_number)) {
          data.customer = {}
          if (customer._id) {
            data.customer._id = customer._id
          }
          if (customer.display_name) {
            data.customer.display_name = customer.display_name
          }
          if (customer.doc_number) {
            data.customer.doc_number = customer.doc_number
          }
        }
        modules({
          url: '/apply_discount.json',
          method: 'POST',
          data: {
            ...this.modulesDiscount,
            amount: {
              subtotal: this.localAmountTotal,
              ...this.amount,
              total: this.localAmountTotal,
              discount: this.paymentGatewayDiscount
            },
            items: this.isQuickview ? this.ecomCart.data.items.filter(({flags}) => !flags || (flags && !flags.includes('freebie'))) : this.ecomCart.data.items,
            ...data
          }
        })
          .then(({ data }) => this.parseDiscountOptions(data.result))
          .catch(err => {
            console.error(err)
            this.alertVariant = 'danger'
            this.alertText = i18n(i19errorMsg)
          })
          .finally(() => {
            this.isLoading = false
          })
      },
  
      submitCoupon (isForceUpdate) {
        if (isForceUpdate || this.canAddCoupon) {
          const { localCouponCode } = this
          const data = {
            discount_coupon: localCouponCode
          }
          this.fetchDiscountOptions(data)
        }
      },
  
      updateDiscount (isForceUpdate = true) {
        if (this.couponCode) {
          if (isForceUpdate || !this.isCouponApplied) {
            this.submitCoupon(isForceUpdate)
          }
        } else if (
          isForceUpdate ||
          (!this.isUpdateSheduled && this.amount && this.localAmountTotal)
        ) {
          this.fetchDiscountOptions()
        }
      },

      scheduleUpdateDiscount () {
        if (this.isUpdateSheduled) return
        this.isUpdateSheduled = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.updateDiscount()
            this.isUpdateSheduled = false
          }, 600)
        })
      }
    },
  
    watch: {
      couponCode (couponCode) {
        if (couponCode !== this.couponCode) {
          this.localCouponCode = couponCode
          if (couponCode && !this.isFormVisible) {
            this.isFormVisible = true
          }
        }
      },
  
      isFormAlwaysVisible (isFormVisible) {
        if (isFormVisible) {
          this.isFormVisible = true
        }
      },
  
      isFormVisible (isFormVisible) {
        if (isFormVisible) {
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }
      },
  
      localAmountTotal (total, oldTotal) {
        if (oldTotal !== null && Math.abs(total - oldTotal) > 0.01) {
          this.scheduleUpdateDiscount()
        }
      },
  
      amount: {
        handler () {
          this.fixAmount()
        },
        deep: true
      },

      paymentGatewayDiscount () {
        this.scheduleUpdateDiscount()
      }
    },
  
    mounted () {
      this.fixAmount()
      this.updateDiscount(false)
    }
  }
  
  