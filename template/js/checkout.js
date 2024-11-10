import { price as getPrice } from '@ecomplus/utils'
import '#template/js/checkout'
import './custom-js/checkout'

const isTEF = Boolean(window.SKM && window.SKM.Schalter)
const tefCompanyId = '42'

const appendInlineCSS = css => {
  const $style = document.createElement('style')
  $style.type = 'text/css'
  if ($style.styleSheet) {
    $style.styleSheet.cssText = css
  } else {
    $style.appendChild(document.createTextNode(css))
  }
  document.head.appendChild($style)
}

if (!isTEF) {
  appendInlineCSS('.payment__gateway[data-label=TEF] { display: none }')
} else {
  window.alert('TEF')
  window.SKMReady = function () {
    window.alert('SKM ready')
    try {
      window.SKM.Schalter.Tef.CliSitef.InicializarTef(document.title, 'holder', 0, 'pt-BR',
        function () {
          appendInlineCSS('#skmloading { display: none } #inittef { display: block !important }')
        }, function (error) {
          var err = JSON.parse(error)
          window.alert(err.Message)
        })
    } catch (e) {
      window.alert(e.message)
    }
  }

  const $link = document.createElement('link')
  $link.rel = 'stylesheet'
  $link.type = 'text/css'
  $link.href = '/tef.css'
  document.head.appendChild($link)

  const $script = document.createElement('script')
  $script.setAttribute('src', 'asset://Schalter.Tef.CliSitef/jquery-1.10.2.min.js')
  document.head.appendChild($script)

  window._waitingTEF = new Promise(function (resolve, reject) {
    window._initTEF = function () {
      window.alert('TEF init')
      if (window.storefrontApp) {
        const { amount, items } = window.storefrontApp
        if (amount && amount.total) {
          const roundPrice = price => {
            return Math.round(price * 100) / 100
          }

          try {
            const produtos = Array.isArray(items)
              ? items.map(item => ({
                description: item.name,
                qty: item.quantity,
                code: item.sku,
                value: roundPrice(getPrice(item))
              }))
              : [{
                description: 'PEDIDO NA LOJA CUSTOMIC',
                code: '1',
                qty: 1,
                value: roundPrice(amount.total)
              }]
            const payload = JSON.stringify(produtos)

            window.SKM.Schalter.Tef.CliSitef.PagamentoProdutos('', null, payload, tefCompanyId, null, null,
              function (tef) {
                const details = JSON.parse(tef)
                const authorizationId = (details.Tef && details.Tef[0] && details.Tef[0].NsuSitef) || '-'
                resolve({
                  open_payment_id: details.CodigoPdv + '/' + authorizationId
                })
                console.log(details)
                window.SKM.Operation.GoHome(true)
              },
              function (err) {
                window.alert('Erro TEF')
                reject(err)
                console.error(err)
              })
          } catch (e) {
            window.alert(e.message)
          }
        }
      }
    }
  })

  window.ecomPaymentGateways = [{
    app_id: 108091,
    label: 'TEF',
    payment_method: {
      code: 'credit_card',
      name: 'TEF'
    },
    js_client: {
      script_uri: 'asset://Schalter.Tef.CliSitef/tefjs.js',
      container_html: '<div id="skmloading" class="p-2">' +
        '<div class="spinner-border" role="status">' +
        '<span class="sr-only">Loading...</span></div></div>' +
        '<button id="inittef" onclick="_initTEF()" class="btn btn-lg btn-block btn-success" style="display: none">' +
        'Iniciar pagamento</button>',
      transaction_promise: '_waitingTEF'
    }
  }]
}


const routerToLink = window.storefrontApp && window.storefrontApp.router
routerToLink.afterEach(({ name }) => {
  if (name === 'confirmation') {
    const orderId = routerToLink.currentRoute &&  routerToLink.currentRoute.params && routerToLink.currentRoute.params.id
    const orderJson = JSON.parse(decodeURIComponent(routerToLink.currentRoute.params.json)) 
    const zeroAmount = orderJson.amount && orderJson.amount.total
    let sentMetafield = window.sessionStorage.getItem('sent_metafield')
    console.log('enviado metafield', sentMetafield)
    if (orderId && !sentMetafield && zeroAmount === 0 && orderJson.payment_method_label === 'Pagamento Promocional') {
      console.log('cookie', zeroAmount, orderId)
      window.ecomPassport.requestApi(`/orders/${orderId}.json`, 'PATCH', {
        financial_status: {
          current: 'paid'
        }
      }).then(() => {
        window.sessionStorage.setItem('sent_metafield', 1)
      })
    }
  }
})