const path = require('path')

const dirSearchAlias = path.resolve(__dirname, 'template/js/lib/search-engine')
const pathDslAlias = path.resolve(dirSearchAlias, 'dsl')

module.exports = () => ({
  resolve: {
    alias: {
      './lib/dsl': pathDslAlias,
      './../lib/dsl': pathDslAlias,
      '../lib/dsl': pathDslAlias,
      './methods/set-search-term': path.resolve(dirSearchAlias, 'set-search-term'),
      './base-config': path.resolve(__dirname, 'template/js/netlify-cms/base-config'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/ProductCard.js'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/DiscountApplier.js'),
      './js/ProductVariations.js': path.resolve(__dirname, 'template/js/custom-js/ProductVariations.js'),
      './html/ProductVariations.html': path.resolve(__dirname, 'template/js/custom-js/ProductVariations.html'),
      './html/EcOrderInfo.html': path.resolve(__dirname, 'template/js/custom-js/EcOrderInfo.html'),
      './html/SearchEngine.html': path.resolve(__dirname, 'template/js/custom-js/SearchEngine.html'),
      './js/SearchEngine.js': path.resolve(__dirname, 'template/js/custom-js/SearchEngine.js'),
      './js/PaymentMethods.js': path.resolve(__dirname, 'template/js/custom-js/PaymentMethods.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/ProductCard.html'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/ProductGallery.html'),
      './js/ProductGallery.js': path.resolve(__dirname, 'template/js/custom-js/ProductGallery.js'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/TheProduct.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/TheProduct.html'),
      './js/CartQuickview.js': path.resolve(__dirname, 'template/js/custom-js/CartQuickview.js'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/CartQuickview.html'),
      './js/APrices.js': path.resolve(__dirname, 'template/js/custom-js/APrices.js'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/APrices.html'),
      './js/BuyTogether.js': path.resolve(__dirname, 'template/js/custom-js/BuyTogether.js'),
      './html/BuyTogether.html': path.resolve(__dirname, 'template/js/custom-js/BuyTogether.html')
    }
  }
})
